import gql from 'graphql-tag'

export const value = {
    getCategorias:gql
    `query{
        categorias {
          cat_id
          cat_nombre
          cat_estado
        }
      }`,
      getDificultades:gql
      `query{
        dificultades {
          dif_id
          dif_nombre
        }
      }`,
      getIngredientes:gql
      `query{
        ingredientes {
          ing_id
          ing_nombre
          ing_imagen
          ing_estado
        }
      }`
}