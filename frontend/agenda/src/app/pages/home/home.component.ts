import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Firestore, collection, collectionData, query, where, getDocs } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { CadastroComponent } from '../cadastro/cadastro.component'; // Caminho correto para o CadastroComponent

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, CadastroComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  exibirCadastro = false;
  termoPesquisa: string = '';
  pacientes$: Observable<any[]>;
  pacienteEncontrado: any = null;
  consultas: any[] = [];

  constructor(private firestore: Firestore) {
    const pacientesRef = collection(this.firestore, 'pacientes');
    this.pacientes$ = collectionData(pacientesRef, { idField: 'id' }); // Ajustado idField corretamente
  }

  buscarPacientes() {
    this.pacientes$.subscribe((pacientes) => {
      const resultados = pacientes.filter(paciente =>
        paciente.nome.toLowerCase().includes(this.termoPesquisa.toLowerCase()) ||
        paciente.cpf.includes(this.termoPesquisa)
      );

      if (resultados.length > 0) {
        this.pacienteEncontrado = resultados[0]; // Considera o primeiro resultado encontrado
        this.buscarConsultas(this.pacienteEncontrado.id);
      } else {
        this.pacienteEncontrado = null;
        this.consultas = [];
      }

      console.log('Pacientes encontrados:', resultados);
    });
  }

  async buscarConsultas(pacienteId: string) {
    this.consultas = []; // Limpa as consultas anteriores
    const consultasRef = collection(this.firestore, 'consultas');
    const q = query(consultasRef, where('pacienteId', '==', pacienteId));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach(doc => {
      this.consultas.push({ id: doc.id, ...doc.data() });
    });

    console.log('Consultas encontradas:', this.consultas);
  }

  mostrarFormulario() {
    this.exibirCadastro = true;
  }

  fecharFormulario() {
    this.exibirCadastro = false;
  }

  fecharPesquisa() {
    this.pacienteEncontrado = null;
    this.consultas = [];
    this.termoPesquisa = '';
  }

  logout() {
    console.log("Usuário deslogado");
    // Aqui você pode adicionar a lógica para remover o token e redirecionar para a tela de login
  }
}
