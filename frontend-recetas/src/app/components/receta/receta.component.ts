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

  categorias:any
  dificultades:any
  ingrediente:any

  public categoriaSelected:Number []=[]
  public dificultadSelected!:any
  public nombreReceta!:String 
  public duracion!:any
  public linkImagen!:String 
  public ingredienteSelected:any []=[]

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
      this.categorias=data.categorias
      console.log(this.categorias);
    })
  }

  private cargarDificultades(){
    this.querySubscription=this.apollo.watchQuery<any>({
      query:value.getDificultades
    }).valueChanges.subscribe(({data})=>{
      this.dificultades=data.dificultades
      console.log(this.dificultades);
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


  createReceta(form:any){
    this.apollo.mutate({
      mutation:value.createReceta,
      variables:{
        receta:{
          usu_id:1,
          dif_id:parseInt(this.dificultadSelected),
          rec_nombre:this.nombreReceta,
          rec_tiempo:parseFloat(this.duracion),
          rec_imagen:this.linkImagen,
          categorias:this.categoriaSelected
          //ingredientes:this.ingredienteSelected
        }
      }
    }).subscribe(({data})=>{
      form.reset()
      console.log(data);
      //window.location.href="/pizza"
    },(error)=>{
      console.log(error);
    })
  }


  active(id: any){
    if(this.categoriaSelected.includes(id)){
      let index = this.categoriaSelected.indexOf(id)
      this.categoriaSelected.splice(index, 1)
    }else{
      this.categoriaSelected.push(id)
    }
    console.log(this.categoriaSelected)
  }

}
