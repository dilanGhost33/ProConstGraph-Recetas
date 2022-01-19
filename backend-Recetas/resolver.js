const { db } = require("./cnn")

const recetasResolver = {
    Query: {
        async usuarios(root, { nickname }){
            if (nickname == undefined) {
                return await db.any(`select * from usuario where usu_estado=true order by usu_id asc`)
            } else {
                return await db.any(`select * from usuario where usu_estado=true and usu_nickname=$1`, [nickname])
            }
        },
        async categorias(root, { name }){
            if (name == undefined) {
                return await db.any(`select * from categoria where cat_estado='true' order by cat_id asc`)
            } else {
                return await db.any(`select * from categoria where cat_estado='true' and cat_nombre=$1`, [name])
            }
        },
        async dificultades(root, { name }){
            if (name == undefined) {
                return await db.any(`select * from dificultad order by dif_id asc`)
            } else {
                return await db.any(`select * from dificultad where and dif_nombre=$1`, [name])
            }
        },
        async ing_tipos(root, { name }){
            if (name == undefined) {
                return await db.any(`select * from ing_tipo where tip_estado=true order by tip_id asc`)
            } else {
                return await db.any(`select * from ing_tipo where and tip_nombre=$1`, [name])
            }
        },
        async ingredientes(root, { name }){
            if (name == undefined) {
                return await db.any(`select * from ingrediente where ing_estado=true order by ing_id asc`)
            } else {
                return await db.any(`select * from ingrediente where ing_estado=true and ing_nombre=$1`, [name])
            }
        },
        async recetas(root, { name }) {
            if (name == undefined) {
                return await db.any(`select * from receta where rec_estado=true order by rec_id asc`)
            } else {
                return await db.any(`select * from receta where rec_estado=true and rec_nombre=$1`, [name])
            }
        }
    }, ingrediente: {
        async tipo(ingrediente) {
            return db.one(`select * from ing_tipo where tip_id=$1`, [ingrediente.tip_id])
        }
    }, receta: {
        async ActualizarComentario(root,{comentario}){
            if(comentario==undefined)
                return null
            else{
                const sql=`update public.comentario set usu_id=$2, com_descripcion=$3, com_estado=$4 
                where com_id=$1 returning*;`
                const resut=await db.one(sql,[comentario.com_id, comentario.usu_id, comentario.com_descripcion, comentario.com_estado])
                return resut
            }
        },
        async ActualizarCategoria(root,{categoria}){
            if(categoria==undefined)
                return null
            else{
                const sql=`update public.categoria set cat_nombre=$2, cat_estado=$3
                where cat_id=$1 returning*;`
                const resut=await db.one(sql,[categoria.cat_id, categoria.cat_nombre, categoria.cat_estado])
                return resut
            }
        },
        async ActualizarReceta_Comentario(root,{com_rec}){
            if(com_rec==undefined)
                return null
            else{
                const sql=`update public.com_rec set rec_id=$2, com_id=$3, com_rec_estado=$4
                where com_rec_id=$1 returning*;`
                const resut=await db.one(sql,[com_rec.com_rec_id, com_rec.rec_id,com_rec.com_id,com_rec.com_rec_estado])
                return resut
            }
        },
        async ActualizarDetalle_Receta(root,{det_receta}){
            if(det_receta==undefined)
                return null
            else{
                const sql=`update public.det_receta set rec_id=$2, ing_id=$3, det_rec_cantidad=$4, det_rec_unidad=$5, det_rec_estado=$6
                where det_rec_id=$1 returning*;`
                const resut=await db.one(sql,[det_receta.det_rec_id, det_receta.rec_id, det_receta.ing_id,det_receta.det_rec_cantidad,det_receta.det_rec_unidad,det_receta.det_rec_estado])
                return resut
            }
        },
        async  ActualizarDificultad(root,{dificultad}){
            if(dificultad==undefined)
                return null
            else{
                const sql=`update public.dificultad set dif_nombre=$2
                where dif_id=$1 returning*;`
                const resut=await db.one(sql,[dificultad.dif_id,dificultad.dif_nombre])
                return resut
            }
        },
        async  ActualizarIngrediente(root,{ingrediente}){
            if(ingrediente==undefined)
                return null
            else{
                const sql=`update public.ingrediente set tip_id=$2,ing_nombre=$3,ing_imagen=$4,ing_estado=$5
                where ing_id=$1 returning*;`
                const resut=await db.one(sql,[ingrediente.ing_id,ingrediente.tip_id,ingrediente.ing_nombre,ingrediente.ing_imagen,ingrediente.ing_estado])
                return resut
            }
        },
        async autor(receta) {
            return db.one(`select * from usuario where usu_id=$1`, [receta.usu_id])
        },
        async dificultad(receta) {
            return db.one(`select * from dificultad where dif_id=$1`, [receta.dif_id])
        },
        async categorias(receta) {
            return db.any(`select * from categoria ca inner join rec_cat rc on rc.cat_id = ca.cat_id
            where rc.rec_id=$1 and rc.rec_cat_estado='true'`, [receta.rec_id])
        },
        async detalles(receta) {
            return db.any(`select * from det_receta where rec_id=$1`, [receta.rec_id])
        },
        async instrucciones(receta) {
            return db.any(`select * from instruccion where rec_id=$1`, [receta.rec_id])
        },
        async comentarios(receta) {
            return db.any(`select * from comentario co inner join com_rec cr on cr.com_id = co.com_id
            where cr.rec_id=$1 and cr.com_rec_estado=true`, [receta.rec_id])
        }
    }, comentario: {
        async autor(comentario) {
            return db.one(`select * from usuario where usu_id=$1`, [comentario.usu_id])
        },
        async reacciones(comentario) {
            return db.any(`select * from reacion where com_id=$1 and rea_estado=true`, [comentario.com_id])
        }
    }, reaccion: {
        async autor(reaccion) {
            return db.one(`select * from usuario where usu_id=$1`, [reaccion.usu_id])
        }
    }
}

module.exports = recetasResolver
