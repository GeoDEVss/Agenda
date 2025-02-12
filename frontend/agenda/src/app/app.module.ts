import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    // Não é necessário declarar o AppComponent aqui se ele for standalone
  ],
  imports: [
    BrowserModule,
  ],
  providers: [],
  // Remover o bootstrap aqui
})
export class AppModule { }
