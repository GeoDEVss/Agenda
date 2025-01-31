import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  saveUser(user: any){
    const userData = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName || 'Usuário sem nome',
      lastLogin: new Date().toISOString(),
    };

    this.http.post('http://backend.com/api/users', userData).subscribe(
      (response) => console.log('Usuário salvo com sucesso:', response),
      (error) => console.error('Erro ao salvar usuário:', error)
    );


  }

}
