# AgendaMed!

AgendaMed é uma aplicação de gestão de agenda médica voltada para recepções de clínicas e hospitais. Através desta aplicação, é possível:

    Pesquisar se o paciente já possui cadastro.
    Visualizar qual foi a última consulta realizada.
    Cadastrar médicos e pacientes.
    Realizar o agendamento de consultas com médicos cadastrados.

Tecnologias Utilizadas

    Node.js (versão v20.18.3)
    NPM (versão 10.8.2)
    Firebase (versão 11.2.0)
    Angular (versão 18.2.3)
    Bootstrap (versão 5.3.3)

Pré-requisitos

Antes de rodar a aplicação, certifique-se de ter as seguintes dependências instaladas em sua máquina:

    Node.js (versão 20.18.3 ou superior)
    NPM (versão 10.8.2 ou superior)
    Firebase SDK (versão 11.2.0 ou superior)
    Angular (versão 18.2.3 ou superior)
    Bootstrap (versão 5.3.3 ou superior)

Instalação

Siga os passos abaixo para instalar e rodar a aplicação localmente.

Clone o repositório, abra o terminal e execute o seguinte comando para clonar o repositório:

    git clone git@github.com:GeoDEVss/Agenda.git

Navegue até o diretório da aplicação, Entre na pasta do frontend:

    cd Agenda
    cd frontend
    cd agenda

Instale as dependências: No diretório do projeto, execute os seguintes comandos para instalar as dependências:

    npm install
    npm install firebase

Configuração do Firebase:

Criar um projeto no Firebase:
Vá até o Console do Firebase, clique em Adicionar Projeto e siga as instruções para criar um novo projeto.

- Não é necessário habilitar o Google Analytics para o Firebase (a menos que você deseje).

Adicionar Firebase ao seu projeto:
        
Após criar o projeto, você verá a página do seu projeto no console do Firebase.
Clique em Adicionar Firebase ao seu App.
Escolha a opção "Configurar Firebase em seu Web App".

Obter as configurações do Firebase:

Após escolher a plataforma (Web), o Firebase fornecerá um trecho de código com suas credenciais. Ele se parecerá com isso:

        const firebaseConfig = {
          apiKey: "SUA_API_KEY",
          authDomain: "seu-projeto-id.firebaseapp.com",
          projectId: "seu-projeto-id",
          storageBucket: "seu-projeto-id.appspot.com",
          messagingSenderId: "seu-messaging-sender-id",
          appId: "seu-app-id",
          measurementId: "seu-measurement-id"
        };

Configuração do Firestore no Firebase:

Habilitar o Firestore:

  No console do Firebase, vá para Firestore Database.
  Clique em Criar banco de dados e escolha o modo de segurança (você pode optar pelo modo de teste ou o modo de produção).
  Após criar o banco de dados, o Firestore estará pronto para ser usado.

Adicionar o código de configuração no seu projeto:

No diretório do seu projeto, navegue até a pasta src/environments/ e edite o arquivo environment.ts para adicionar a configuração do Firebase, como mostrado abaixo:

    export const environment = {
      production: false,
      firebase: {
        apiKey: "SUA_API_KEY",
        authDomain: "seu-projeto-id.firebaseapp.com",
        projectId: "seu-projeto-id",
        storageBucket: "seu-projeto-id.appspot.com",
        messagingSenderId: "seu-messaging-sender-id",
        appId: "seu-app-id",
        measurementId: "seu-measurement-id"
      }
    };

Observação:

A partir do Angular 14, foi introduzido o suporte a standalone components, permitindo que componentes sejam usados sem a necessidade de módulos. Isso torna a estrutura mais simples e modular.

    Angular 14 e posterior: Suporta standalone components (componentes independentes).
    Angular 13 e anterior: Depende de módulos para organizar componentes.

Se estiver usando o Angular 14 ou superior, você pode usar componentes independentes; versões anteriores exigem módulos.


Configuração do Firestore no Angular com Módulos:

Agora, você precisa importar o Firebase Firestore em seu projeto Angular para começar a fazer interações com o banco de dados.

    Importar e inicializar o Firestore:

    No arquivo app.module.ts, adicione as importações do Firestore:

    import { NgModule } from '@angular/core';
    import { BrowserModule } from '@angular/platform-browser';
    import { initializeApp } from 'firebase/app';
    import { getFirestore } from 'firebase/firestore';
    import { environment } from '../environments/environment';

    @NgModule({
      declarations: [AppComponent],
      imports: [BrowserModule],
      providers: [],
      bootstrap: [AppComponent]
    })
    export class AppModule {
      constructor() {
        // Inicializar Firebase
        initializeApp(environment.firebase);
        
        // Inicializar Firestore
        const firestore = getFirestore();
      }
    }

Configuração do Firestore com Standalone:

Agora, em vez de usar o padrão de módulos no Angular, vamos usar o recurso standalone para inicializar o Firebase e o Firestore diretamente no componente.

    Criar e configurar o componente principal com standalone:

    Abra o arquivo app.component.ts e configure o Firebase e Firestore diretamente nele:

    import { Component } from '@angular/core';
    import { initializeApp } from 'firebase/app';
    import { getFirestore, collection, getDocs } from 'firebase/firestore';
    import { environment } from '../environments/environment';

    @Component({
      selector: 'app-root',
      standalone: true,
      templateUrl: './app.component.html',
      styleUrls: ['./app.component.css'],
    })
    export class AppComponent {
      title = 'AgendaMed';
      email: string = '';
      password: string = '';

      constructor() {
        // Inicializar Firebase
        const app = initializeApp(environment.firebase);

        // Inicializar Firestore
        const db = getFirestore(app);

        // Exemplo de como acessar dados no Firestore
        const querySnapshot = getDocs(collection(db, "medicos"));
        querySnapshot.then((snapshot) => {![Uploading patrick-tomasso-fMntI8HAAB8-unsplash_1_-removebg-preview.png…]()

          snapshot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data());
          });
        });
      }

      onLogin() {
        console.log('Email:', this.email);
        console.log('Senha:', this.password);
      }
    }

Iniciar a aplicação:

Após concluir as configurações, inicie a aplicação localmente com o comando:

    ng serve

A aplicação será executada em http://localhost:4200/ (ou o endereço especificado). Abra o navegador e acesse essa URL para visualizar a aplicação.

