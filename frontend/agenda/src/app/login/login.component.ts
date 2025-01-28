import { Component } from '@angular/core';
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';


@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  auth = getAuth();

  loginWithGoogle(){
    const provider = new GoogleAuthProvider();
    signInWithPopup(this.auth,provider)
    .then((result)=>{
      console.log('Usuário logado com Google:',result.user);
    })
    .catch((error)=>{
      console.error('Erro no login com Google:', error);
    })
  }

  loginWithEmailAndPassword(email: string, password: string){
    createUserWithEmailAndPassword(this.auth, email,password)
    .then((userCredential)=>{
      const user = userCredential.user;
      console.log('Usuário registrado com email:', user);
    })
    .catch((error)=>{
      console.error('Erro no cadastro:', error);
    });
  }

}
