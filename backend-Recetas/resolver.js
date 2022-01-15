const { db } = require("./cnn")

const blogResolver={
    Query:{
         async ingrediente(root,{id_pub}){
            if(id_pub==undefined){
                const reslt= await db.any('select * from publicacion where pub_estado=true')
                return reslt
            }else{
                return await db.any(`select * from publicacion where pub_id=$1 and pub_estado=true`,[id_pub])
            }
        },
        async autor(root,{id_aut}){
            if(id_aut==undefined){
                const reslt= await db.any('select * from autor where aut_estado=true')
                return reslt
            }else{
                return await db.any(`select * from autor where aut_id=$1 and aut_estado=true`,[aut_id])
            }
        },
        async categoria(root,{id_cat}){
            if(id_cat==undefined){
                const reslt= await db.any('select * from categoria where cat_estado=true')
                return reslt
            }else{
                return await db.any(`select * from categoria where cat_id=$1 and cat_estado=true`,[id_cat])
            }
        }
    },Mutation:{
        async ActualizarComentario(root,{comentario}){
            if(comentario==undefined)
                return null
            else{
                const sql=`INSERT INTO public.comentario(com_descripcion, aut_id, pub_id, com_estado)
                VALUES ($1, $2, $3, $4) returning*;`
                const resut=await db.one(sql,[comentario.com_descripcion, comentario.aut_id, comentario.pub_id, comentario.com_estado])
                return resut
            }
        },
        async ActualizarCategoria(root,{comentario}){
            if(comentario==undefined)
                return null
            else{
                const sql=`UPDATE comentario SET com_estado=$3, com_descripcion=$2 WHERE com_id=$1 returning *;`
                const result=await db.one(sql,[comentario.com_id,comentario.com_descripcion, comentario.com_estado])
                return result
            }
        },
        async ActualizarReceta_Comentario(root,{comentario}){
            if(comentario==undefined)
                return null
            else{
                const sql=`UPDATE comentario SET com_estado=false WHERE com_id=$1 returning *;`
                const result=await db.one(sql,[comentario.com_id,comentario.com_descripcion, comentario.com_estado])
                return result
            }
        },
        async ActualizarDetalle_Receta(root,{comentario}){
            if(comentario==undefined)
                return null
            else{
                const sql=`UPDATE comentario SET com_estado=false WHERE com_id=$1 returning *;`
                const result=await db.one(sql,[comentario.com_id,comentario.com_descripcion, comentario.com_estado])
                return result
            }
        },
        async ActualizarDificultad(root,{comentario}){
            if(comentario==undefined)
                return null
            else{
                const sql=`UPDATE comentario SET com_estado=false WHERE com_id=$1 returning *;`
                const result=await db.one(sql,[comentario.com_id,comentario.com_descripcion, comentario.com_estado])
                return result
            }
        },
        async ActualizarIngrediente_Tipo(root,{comentario}){
            if(comentario==undefined)
                return null
            else{
                const sql=`UPDATE comentario SET com_estado=false WHERE com_id=$1 returning *;`
                const result=await db.one(sql,[comentario.com_id,comentario.com_descripcion, comentario.com_estado])
                return result
            }
        },
        async ActualizarIngrediente(root,{comentario}){
            if(comentario==undefined)
                return null
            else{
                const sql=`UPDATE comentario SET com_estado=false WHERE com_id=$1 returning *;`
                const result=await db.one(sql,[comentario.com_id,comentario.com_descripcion, comentario.com_estado])
                return result
            }
        },
        async ActualizarInstruccion(root,{comentario}){
            if(comentario==undefined)
                return null
            else{
                const sql=`UPDATE comentario SET com_estado=false WHERE com_id=$1 returning *;`
                const result=await db.one(sql,[comentario.com_id,comentario.com_descripcion, comentario.com_estado])
                return result
            }
        },
        async ActualizarReaccion(root,{comentario}){
            if(comentario==undefined)
                return null
            else{
                const sql=`UPDATE comentario SET com_estado=false WHERE com_id=$1 returning *;`
                const result=await db.one(sql,[comentario.com_id,comentario.com_descripcion, comentario.com_estado])
                return result
            }
        },
        async ActualizarReceta(root,{comentario}){
            if(comentario==undefined)
                return null
            else{
                const sql=`UPDATE comentario SET com_estado=false WHERE com_id=$1 returning *;`
                const result=await db.one(sql,[comentario.com_id,comentario.com_descripcion, comentario.com_estado])
                return result
            }
        },
        async ActualizarUsuario(root,{comentario}){
            if(comentario==undefined)
                return null
            else{
                const sql=`UPDATE comentario SET com_estado=false WHERE com_id=$1 returning *;`
                const result=await db.one(sql,[comentario.com_id,comentario.com_descripcion, comentario.com_estado])
                return result
            }
        }
    }
}

module.exports=blogResolver


