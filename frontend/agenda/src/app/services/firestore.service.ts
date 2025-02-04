import { Injectable } from '@angular/core';
import { deleteUser } from '@angular/fire/auth';
import { Firestore, collection, addDoc, collectionData, doc, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  constructor(private firestore: Firestore) {}

  //criando um doc em uma coleção
  addData(collectionName: string, data: any){
    const colRef = collection(this.firestore,collectionName);
    return addDoc(colRef, data);
  }

  //ler todos os docs de uma coleção
  getData(collectionName: string): Observable<any[]> {
    const colRef = collection(this.firestore, collectionName);
    return collectionData(colRef,{idField: 'id'});
  }

  //atualizar um doc em específico
  async deleteData(collectionName: string, docId: string) {
    const docRef = doc(this.firestore,`${collectionName}/${docId}`);
    return deleteDoc(docRef);
  }
}
