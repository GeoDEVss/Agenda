import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Firestore, collection, collectionData, query, where, getDocs } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { debounceTime, switchMap } from 'rxjs/operators';
import { CadastroComponent } from '../cadastro/cadastro.component';
import { CadastroMedicoComponent } from '../cadastro-medico/cadastro-medico.component';

interface Paciente {
  nome: string;
  cpf: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, CadastroComponent, CadastroMedicoComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  mostrarCadastroPaciente: boolean = false;
  mostrarCadastroMedico: boolean = false;
  termoPesquisa: string = '';
  pacienteEncontrado: any = null;
  consultas: any[] = [];
  pacientes$: Observable<any[]>;

  constructor(private firestore: Firestore) {
    const pacientesRef = collection(this.firestore, 'pacientes');
    this.pacientes$ = collectionData(pacientesRef, { idField: 'id' });
  }

  buscarPacientes() {
    this.pacientes$.subscribe((pacientes) => {
      const resultados = pacientes.filter(paciente =>
        paciente.nome.toLowerCase().includes(this.termoPesquisa.toLowerCase()) ||
        paciente.cpf.includes(this.termoPesquisa)
      );

      if (resultados.length > 0) {
        this.pacienteEncontrado = resultados[0];
        this.buscarConsultas(this.pacienteEncontrado.id);
      } else {
        this.pacienteEncontrado = null;
        this.consultas = [];
      }

      console.log('Pacientes encontrados:', resultados);
    });
  }

  async buscarConsultas(pacienteId: string) {
    this.consultas = [];
    const consultasRef = collection(this.firestore, 'consultas');
    const q = query(consultasRef, where('pacienteId', '==', pacienteId));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach(doc => {
      this.consultas.push({ id: doc.id, ...doc.data() });
    });

    console.log('Consultas encontradas:', this.consultas);
  }

  abrirCadastroPaciente() {
    this.mostrarCadastroPaciente = true;
    this.mostrarCadastroMedico = false;
  }

  abrirCadastroMedico() {
    this.mostrarCadastroMedico = true;
    this.mostrarCadastroPaciente = false;
  }

  fecharFormulario(tipo: string) {
    if (tipo === 'paciente') {
      this.mostrarCadastroPaciente = false;
    } else if (tipo === 'medico') {
      this.mostrarCadastroMedico = false;
    }
  }

  fecharPesquisa() {
    this.pacienteEncontrado = null;
    this.consultas = [];
    this.termoPesquisa = '';
  }

  limparDados() {
    this.pacienteEncontrado = null;
    this.consultas = [];
    this.termoPesquisa = ''; // Opcional: se quiser limpar o termo de pesquisa também
  }

  logout() {
    console.log("Usuário deslogado");
    // Adicione aqui a lógica de logout, como limpar tokens e redirecionar para a tela de login
  }

  scrollToPesquisa() {
    const element = document.getElementById("pesquisa");
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
