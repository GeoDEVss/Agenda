import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';

interface Medico {
  nome: string;
  crm: string;
  especialidade: string;
}

@Component({
  selector: 'app-cadastro-medico',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cadastro-medico.component.html',
  styleUrls: ['./cadastro-medico.component.css']
})
export class CadastroMedicoComponent {
  medico: Medico = {
    nome: '',
    crm: '',
    especialidade: ''
  };

  @Output() fechar = new EventEmitter<void>();

  constructor(private firestore: Firestore) {}

  async cadastrarMedico() {
    if (!this.medico.nome || !this.medico.crm || !this.medico.especialidade) {
      alert('Preencha todos os campos!');
      return;
    }

    try {
      const medicosRef = collection(this.firestore, 'medicos');
      await addDoc(medicosRef, this.medico);
      alert('Médico cadastrado com sucesso!');
      this.fecharFormulario(); // Fechar após o cadastro
    } catch (error) {
      console.error('Erro ao cadastrar médico:', error);
      alert('Erro ao cadastrar médico.');
    }
  }

  fecharFormulario() {
    this.fechar.emit();
  }
}
