import { Component } from '@angular/core';
import { getAuth, createUserWithEmailAndPassword } from '@angular/fire/auth';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css'
})
export class CadastroComponent {
  auth = getAuth();

  registerWithEmail(email: string, password: string){
    createUserWithEmailAndPassword(this.auth,email, password)
    .then((userCredential)=>{
      const user = userCredential.user;
      console.log('Usuárop cadastrado:', user);
    })
    .catch((error)=>{
      console.error('Erro ao cadastrar usuário:',error);
    });
  }

  saveUserToDatabase(user:any){
    console.log('Salvar no BD:',{
      uid:user.uid,
      email: user.email,
    });
  }

}
