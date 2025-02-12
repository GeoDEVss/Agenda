import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent {
  @Output() fechar = new EventEmitter<void>(); // Evento para fechar o formulário
  paciente = { nome: '', nascimento: '', email: '', cpf:'', endereco:'', emergencia: ''};

  constructor(private firestore: Firestore) {}

  async cadastrarPaciente() {
    if (!this.paciente.nome || !this.paciente.nascimento || !this.paciente.email
      || !this.paciente.cpf ||!this.paciente.endereco || !this.paciente.emergencia) {
      alert('Preencha todos os campos!');
      return;
    }

    try {
      const pacientesRef = collection(this.firestore, 'pacientes');
      await addDoc(pacientesRef, this.paciente);
      alert('Paciente cadastrado com sucesso!');
      this.fechar.emit(); // Emitindo o evento para fechar o formulário
    } catch (error) {
      console.error('Erro ao cadastrar paciente:', error);
      alert('Erro ao cadastrar paciente.');
    }
  }

  fecharFormulario() {
    this.fechar.emit(); // Corrigido: ponto e vírgula adicionado
  }
}
