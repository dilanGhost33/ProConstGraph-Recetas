import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Apollo } from 'apollo-angular';
import { value } from 'src/app/model/gp-tools';

@Component({
  selector: 'app-receta',
  templateUrl: './receta.component.html',
  styleUrls: ['./receta.component.css']
})
export class RecetaComponent implements OnInit {

  private querySubscription!:Subscription

  categoria:any
  dificultad:any
  ingrediente:any

  constructor(private apollo:Apollo) { }

  ngOnInit(): void {
    this.cargarCategorias()
    this.cargarDificultades()
    this.cargarIngredientes()
  }

  private cargarCategorias(){
    this.querySubscription=this.apollo.watchQuery<any>({
      query:value.getCategorias
    }).valueChanges.subscribe(({data})=>{
      this.categoria=data.categorias
      console.log(this.categoria);
    })
  }

  private cargarDificultades(){
    this.querySubscription=this.apollo.watchQuery<any>({
      query:value.getDificultades
    }).valueChanges.subscribe(({data})=>{
      this.dificultad=data.dificultades
      console.log(this.dificultad);
    })
  }

  private cargarIngredientes(){
    this.querySubscription=this.apollo.watchQuery<any>({
      query:value.getIngredientes
    }).valueChanges.subscribe(({data})=>{
      this.ingrediente=data.ingredientes
      console.log(this.ingrediente);
    })
  }

}
