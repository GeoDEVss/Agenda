import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirestoreService } from '../../services/firestore.service';
import { FirestoreModule } from '@angular/fire/firestore';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FirestoreModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  patients: any[] = [];

  constructor(private firestoreService: FirestoreService) {}

  ngOnInit() {
    this.firestoreService.addData('patients', {
      name: 'Teste Automático',
      cpf: '000.000.000-00',
      phone: '(00) 00000-0000'
    }).then(() => {
      console.log('Paciente criado com sucesso!');
    }).catch(error => {
      console.error('Erro ao criar paciente:', error);
    });
  }
}
