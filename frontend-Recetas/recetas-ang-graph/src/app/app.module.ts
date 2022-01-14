import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RecetaComponent } from './component/receta/receta.component';
import { IngredienteComponent } from './components/ingrediente/ingrediente.component';

@NgModule({
  declarations: [
    AppComponent,
    RecetaComponent,
    IngredienteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
