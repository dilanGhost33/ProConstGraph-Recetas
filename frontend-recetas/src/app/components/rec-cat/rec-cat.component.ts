import { Component, OnInit, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { Apollo } from 'apollo-angular';
import { value } from 'src/app/model/gp-tools';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-rec-cat',
  templateUrl: './rec-cat.component.html',
  styleUrls: ['./rec-cat.component.css']
})
export class RecCatComponent implements OnInit {

  constructor(private apollo:Apollo, private route:ActivatedRoute) { }
  recetaSelected:any
  recetaSelectedName!: String
  comDescripcion!:String
  comUsuarioID!:string
  comRecetaID!:string
  private querySubscription!:Subscription
  public comentarios:any
  

  ngOnInit(): void {
    this.route.params.subscribe(
      params=>{
        this.recetaSelectedName=(params['recName'])+""
      }
    )
    this.cargarReceta();
  }

  cargarReceta(){
    this.querySubscription=this.apollo.watchQuery<any>({
      query:value.getRecetasByName,
      variables:{
        name:this.recetaSelectedName
      }
    }).valueChanges.subscribe(({data})=>{
      const RecetaFound=((Object)(data).recetas)[0]
      this.recetaSelected=RecetaFound
      this.comRecetaID=this.recetaSelected.rec_id+""
      this.comUsuarioID=2+""
      console.log(this.recetaSelected)
      
    })
  }

  createComentarios(form:any){
    this.apollo.mutate({
      mutation:value.InsertComentario,
      variables:{
        comentario:{
          usu_id:parseInt(this.comUsuarioID),
          rec_id:parseInt(this.comRecetaID),
          com_descripcion:this.comDescripcion
        }
      }
    }).subscribe(({data})=>{
      this.comentarios=(Object)(data).InsertComentario
      form.reset()
      this.cargarReceta()
      window.location.href="/VisualizarReceta/"+this.recetaSelected.rec_nombre
      console.log(data)
    },(error)=>{
      console.log(error)
    })
  }
}
