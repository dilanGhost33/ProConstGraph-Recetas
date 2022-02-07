import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CategoriaComponent } from './components/categoria/categoria.component';
import { RecCatComponent } from './components/rec-cat/rec-cat.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { DetRecetaComponent } from './components/det-receta/det-receta.component';
import { RecetaComponent } from './components/receta/receta.component';
import { ReaccionComponent } from './components/reaccion/reaccion.component';
import { IngredienteComponent } from './components/ingrediente/ingrediente.component';
import { IngTipoComponent } from './components/ing-tipo/ing-tipo.component';
import { InstruccionComponent } from './components/instruccion/instruccion.component';
import { ComentarioComponent } from './components/comentario/comentario.component';

@NgModule({
  declarations: [
    AppComponent,
    CategoriaComponent,
    RecCatComponent,
    UsuarioComponent,
    DetRecetaComponent,
    RecetaComponent,
    ReaccionComponent,
    IngredienteComponent,
    IngTipoComponent,
    InstruccionComponent,
    ComentarioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GraphQLModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
