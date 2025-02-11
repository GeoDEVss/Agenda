import { initializeApp } from 'firebase/app';
import { Component } from '@angular/core';
import { environment } from '../environments/environment';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'AgendaMed';
  email: string = '';
  password: string = '';

  onLogin(){
    console.log('Email:', this.email);
    console.log('Senha:', this.password);
  }

  constructor() {
    initializeApp(environment.firebase); // Certifique-se de acessar a chave correta do Firebase
  }
}
