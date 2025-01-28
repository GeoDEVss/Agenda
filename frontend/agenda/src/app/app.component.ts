import { initializeApp } from 'firebase/app';
import { Component } from '@angular/core';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import { RouterOutlet } from '@angular/router';
import { firebaseConfig } from './firebase-config';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'AgendaMed';

  constructor(){
    initializeApp(firebaseConfig)
  }
}
