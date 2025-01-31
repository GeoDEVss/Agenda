import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { getAuth, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword } from 'firebase/auth';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  email = '';
  password = '';
  isLoggingIn = false;

  constructor(private router: Router) {}

  async loginWithEmailAndPassword(email: string, password: string) {
    try {
      const auth = getAuth();
      await signInWithEmailAndPassword(auth, email, password);

      alert('Login realizado com sucesso!');
      this.router.navigate(['/home']);
    } catch (error) {
      console.error('Erro no login:', error);
      alert('Erro ao fazer login. Verifique suas credenciais.');
    }
  }

  async loginWithGoogle() {
    try {
      if (this.isLoggingIn) return;
      this.isLoggingIn = true;

      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);

      alert('Login com Google realizado com sucesso!');
      this.router.navigate(['/home']);
    } catch (error) {
      console.error('Erro no login com Google:', error);
      alert('Erro ao fazer login com Google.');
    } finally {
      this.isLoggingIn = false;
    }
  }
}
