import gql from 'graphql-tag';


export const value ={
    getRecetas:gql`
    query{
        recetas{
          rec_id,
          rec_imagen,
          rec_nombre,
          rec_tiempo,
          instrucciones{
            ins_numpaso,
            ins_descripcion
          },
          categorias{
            cat_nombre
          },
          dificultad{
            dif_nombre
          },
          autor{
            usu_nickname
          },
          comentarios{
            com_descripcion
          },
          detalles{
            det_rec_unidad,
            det_rec_cantidad,
            ingrediente{
              ing_nombre,
              ing_imagen,
              tipo{
                tip_nombre
              }
            }
          }
        }
      }
    `,getRecetasByName:gql`
    query recetas($name:String!){
      recetas(name: $name){
        rec_id,
        rec_imagen,
        rec_nombre,
        rec_tiempo,
        instrucciones{
          ins_numpaso,
          ins_descripcion
        },
        categorias{
          cat_nombre
        },
        dificultad{
          dif_nombre
        },
        autor{
          usu_nickname
        },
        comentarios{
          autor{
            usu_nickname,
            usu_id
          },
          com_descripcion
        },
        detalles{
          det_rec_unidad,
          det_rec_cantidad,
          ingrediente{
            ing_nombre,
            ing_imagen,
            tipo{
              tip_nombre
            }
          }
        }
      }
    }
    `,InsertComentario: gql`
    mutation createComentario($comentario:comentarioInput!){
      createComentario(comentario:$comentario){
        com_descripcion
      }
    }`,InsertarComentarioByID: gql `
    mutation createComentarioByText ($rec_id:Int, $usu_id:Int, $com_descripcion:String){
      createComentarioByText(rec_id:$rec_id,usu_id:$usu_id,com_descripcion:$com_descripcion){
        com_id,
        com_estado,
        com_descripcion
      }
    }
    `

}