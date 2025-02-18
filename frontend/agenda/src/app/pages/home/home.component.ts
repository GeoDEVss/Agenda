import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Firestore, collection, collectionData, query, where, getDocs, addDoc, doc, getDoc } from '@angular/fire/firestore';import { Observable } from 'rxjs';
import { CadastroComponent } from '../cadastro/cadastro.component';
import { CadastroMedicoComponent } from '../cadastro-medico/cadastro-medico.component';
import { OnInit } from '@angular/core';

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
export class HomeComponent implements OnInit {
  mostrarCadastroPaciente: boolean = false;
  mostrarCadastroMedico: boolean = false;
  termoPesquisa: string = '';
  pacienteEncontrado: any = null;
  consultas: any[] = [];
  medicos$: Observable<any[]>;
  pacientes$: Observable<any[]>;
  medicosDisponiveis: any[] = [];
  medicoSelecionado: string = "";
  especialidadeMedico: string = '';  // Adicionando a variável para a especialidade
  horarioSelecionado: string = '';
  dataConsultaSelecionada: string = '';

  constructor(private firestore: Firestore) {
    const pacientesCollection = collection(this.firestore, 'pacientes');
    this.pacientes$ = collectionData(pacientesCollection, { idField: 'id' });

    const medicosCollection = collection(this.firestore, 'medicos');
    this.medicos$ = collectionData(medicosCollection);
  }

  ngOnInit(): void {
    this.loadMedicos(); // Chama a função para buscar médicos
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

  // Carregar médicos da coleção "medicos"
  async loadMedicos() {
    const medicosRef = collection(this.firestore, 'medicos');
    const medicoSnapshot = await getDocs(medicosRef);

    if (medicoSnapshot.empty) {
      console.warn('⚠️ Nenhum médico encontrado na coleção "medicos".');
    }

    this.medicosDisponiveis = medicoSnapshot.docs.map(doc => ({
      id: doc.id, // 🔹 Pega o ID do documento
      ...doc.data() as any // 🔹 Pega os outros dados do médico
    }));

    console.log("📌 Médicos carregados:", this.medicosDisponiveis);
  }

  // Método para capturar a especialidade ao selecionar o médico
  onMedicoChange() {
    console.log('📌 Médico selecionado ID:', this.medicoSelecionado);
    console.log("🔄 Alteração detectada no select.");
    console.log("✅ Novo médico selecionado ID:", this.medicoSelecionado);
    const medicoSelecionadoObj = this.medicosDisponiveis.find(medico => medico.id === this.medicoSelecionado);
    console.log("✅ Novo médico selecionado ID:", this.medicoSelecionado);

    if (!medicoSelecionadoObj) {
    } else {
        console.log('✅ Médico correspondente:', medicoSelecionadoObj);
    }

    this.especialidadeMedico = medicoSelecionadoObj ? medicoSelecionadoObj.especialidade : '';
}


  async agendarConsulta() {
    const pacientesRef = collection(this.firestore, 'pacientes');
    const q = query(pacientesRef, where('cpf', '==', this.termoPesquisa));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
        querySnapshot.forEach((doc) => {
            this.pacienteEncontrado = { id: doc.id, ...doc.data() };
        });
        console.log('Paciente encontrado:', this.pacienteEncontrado);
    } else {
        this.pacienteEncontrado = null;
        console.warn('Nenhum paciente encontrado com esse CPF.');
    }
}

async confirmarAgendamento() {
  if (!this.pacienteEncontrado || !this.medicoSelecionado || !this.horarioSelecionado) {
      alert('Por favor, selecione um médico e um horário.');
      return;
  }

  try {
      // Buscar dados do médico para incluir a especialidade
      const medicoRef = doc(this.firestore, 'medicos', this.medicoSelecionado);
      console.log('Buscando médico com ID:', this.medicoSelecionado);
      const medicoSnap = await getDoc(medicoRef);

      if (!medicoSnap.exists()) {
        console.warn('Médico não encontrado no Firestore. ID:', this.medicoSelecionado);
          alert('Médico não encontrado. Tente novamente.');
          return;
      }

      const medicoData = medicoSnap.data();
      const especialidade = medicoData['especialidade']; // Acesso com notação de colchetes
      console.log('Médico encontrado:', medicoData);

      const agendamentosRef = collection(this.firestore, 'agendamentos');

      const agendamento = {
          pacienteId: this.pacienteEncontrado.id,
          medicoId: this.medicoSelecionado,
          especialidade: especialidade, // Usando a variável especialidade
          horario: this.horarioSelecionado,
          criadoEm: new Date()
      };

      const docRef = await addDoc(agendamentosRef, agendamento);
      console.log('Agendamento registrado com sucesso! ID:', docRef.id);

      alert(`Consulta agendada com sucesso! Especialidade: ${especialidade}`);
    } catch (error) {
      console.error('Erro ao registrar agendamento:', error);
      alert('Erro ao agendar consulta. Tente novamente.');
  }
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
