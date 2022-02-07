import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Apollo } from 'apollo-angular';
import { value } from 'src/app/model/gp-tools';
import { RecCatComponent } from '../rec-cat/rec-cat.component';

@Component({
  selector: 'app-receta',
  templateUrl: './receta.component.html',
  styleUrls: ['./receta.component.css']
})
export class RecetaComponent implements OnInit {

  recetas:any
  private querySubscription!:Subscription
  //Se hace para conectar dos componentes
  

  constructor(private apollo:Apollo) { }

  ngOnInit(): void {
    this.cargarRecetas();
  }

  private cargarRecetas(){
    this.querySubscription=this.apollo.watchQuery<any>({
      query:value.getRecetas
    }).valueChanges.subscribe(({data})=>{
      this.recetas=data.recetas
      console.log(this.recetas)
    })
    
  }
  
}
