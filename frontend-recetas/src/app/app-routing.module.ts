import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecetaComponent } from './components/receta/receta.component';
import { RecCatComponent } from './components/rec-cat/rec-cat.component';

const routes: Routes = [
  {path:'',component:RecetaComponent},
  {path:'Recetas',component:RecetaComponent},
  {path:'VisualizarReceta/:recName',component:RecCatComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
