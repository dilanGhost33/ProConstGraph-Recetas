const {
    db
} = require("./cnn")

const recetasResolver = {
    Query: {
        async usuarios(root, {
            nickname
        }) {
            if (nickname == undefined) {
                return await db.any(`select * from usuario where usu_estado=true order by usu_id asc`)
            } else {
                return await db.any(`select * from usuario where usu_estado=true and usu_nickname=$1`, [nickname])
            }
        },
        async categorias(root, {
            name
        }) {
            if (name == undefined) {
                return await db.any(`select * from categoria where cat_estado=true order by cat_id asc`)
            } else {
                return await db.any(`select * from categoria where cat_estado=true and cat_nombre=$1`, [name])
            }
        },
        async dificultades(root, {
            name
        }) {
            if (name == undefined) {
                return await db.any(`select * from dificultad order by dif_id asc`)
            } else {
                return await db.any(`select * from dificultad where and dif_nombre=$1`, [name])
            }
        },
        async ing_tipos(root, {
            name
        }) {
            if (name == undefined) {
                return await db.any(`select * from ing_tipo where tip_estado=true order by tip_id asc`)
            } else {
                return await db.any(`select * from ing_tipo where and tip_nombre=$1`, [name])
            }
        },
        async ingredientes(root, {
            name
        }) {
            if (name == undefined) {
                return await db.any(`select * from ingrediente where ing_estado=true order by ing_id asc`)
            } else {
                return await db.any(`select * from ingrediente where ing_estado=true and ing_nombre=$1`, [name])
            }
        },
        async recetas(root, {
            name
        }) {
            if (name == undefined) {
                return await db.any(`select * from receta where rec_estado=true order by rec_id asc`)
            } else {
                return await db.any(`select * from receta where rec_estado=true and rec_nombre=$1`, [name])
            }
        }
    },
    ingrediente: {
        async tipo(ingrediente) {
            return db.one(`select * from ing_tipo where tip_id=$1`, [ingrediente.tip_id])
        }
    },
    receta: {
        async autor(receta) {
            return db.one(`select * from usuario where usu_id=$1`, [receta.usu_id])
        },
        async dificultad(receta) {
            return db.one(`select * from dificultad where dif_id=$1`, [receta.dif_id])
        },
        async categorias(receta) {
            return db.any(`select * from categoria ca inner join rec_cat rc on rc.cat_id = ca.cat_id
            where rc.rec_id=$1 and rc.rec_cat_estado=true`, [receta.rec_id])
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
    },
    comentario: {
        async autor(comentario) {
            return db.one(`select * from usuario where usu_id=$1`, [comentario.usu_id])
        },
        async reacciones(comentario) {
            return db.any(`select * from reacion where com_id=$1 and rea_estado=true`, [comentario.com_id])
        }
    },
    reaccion: {
        async autor(reaccion) {
            return db.one(`select * from usuario where usu_id=$1`, [reaccion.usu_id])
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
    }, detalle_receta: {
        async ingrediente(detalle_receta) {
            return db.one(`select * from ingrediente where ing_id=$1`, [detalle_receta.ing_id])
        }
    },   
     Mutation: {
        async createReceta(root, { receta }) {

            if (receta == undefined)
            return null
        else {
            const sql = `INSERT INTO public.receta(usu_id, dif_id, rec_imagen, rec_nombre, rec_tiempo, rec_estado)
                         VALUES ($1, $2, $3, $4, $5, true) returning*;`
            const resut = await db.one(sql, [receta.usu_id, receta.dif_id, receta.rec_imagen, receta.rec_nombre, receta.rec_tiempo])
                //Insertar categorias a Recetas
                if (receta.categorias && receta.categorias.length > 0) {
                    receta.categorias.forEach(cat_id => {
                        const sql = `INSERT INTO rec_cat(rec_id,cat_id,rec_cat_estado) VALUES($1,$2,true)`
                        db.one(sql, [resut.rec_id, cat_id])
                    });
                }
                //Insertar ingredientes a Recetas
                if (receta.ingredientes && receta.ingredientes.length > 0) {
                    receta.ingredientes.forEach(det_receta => {
                        const sql = `INSERT INTO det_receta(rec_id,ing_id,det_rec_cantidad,det_rec_unidad,det_rec_estado) 
                        VALUES($1,$2,$3,$4,true) RETURNING*;`
                        db.any(sql, [resut.rec_id, det_receta.ing_id, det_receta.det_rec_cantidad, det_receta.det_rec_unidad])
                    });
                }
                return resut
            }

        },

        async createIngrediente(root, {
            ingrediente
        }) {
            if (ingrediente == undefined)
                return null
            else {
                const sql = `INSERT INTO 
                            public.ingrediente(tip_id, ing_nombre, ing_imagen, ing_estado)
                            VALUES ( $1, $2 , $3, true) returning*;`
                const resut = await db.one(sql, [ingrediente.tip_id, ingrediente.nombre, ingrediente.imagen])
                return resut
            }
        },
        async createTipo(root, {
            tipo
        }) {
            if (tipo == undefined)
                return null
            else {
                const sql = `INSERT INTO public.ing_tipo(tip_nombre, tip_estado)
                                VALUES ($1, true) returning*;`
                const resut = await db.one(sql, [tipo.nombre])
                return resut
            }
        },
        async createInstruccion(root, {
            instruccion
        }) {
            if (instruccion == undefined)
                return null
            else {
                const sql = `INSERT INTO 
                            public.instruccion(rec_id, ins_numpaso, ins_descripcion, ins_estado)
                            VALUES ($1, $2, $3, true) returning*;`
                const resut = await db.one(sql, [instruccion.rec_id, instruccion.ins_numpaso, instruccion.ins_descripcion])
                return resut
            }
        },

        async createUsuario(root, {
            usuario
        }) {
            if (usuario == undefined)
                return null
            else {
                const sql = `INSERT INTO usuario (usu_nickname, usu_nombre, usu_apellido, usu_clave, usu_estado, usu_imagen, usu_correo ) 
                             VALUES ($1, $2, $3, $4, true, $5, $6) returning*;`
                const resut = await db.one(sql, [usuario.usu_nickname, usuario.usu_nombre, usuario.usu_apellido,
                usuario.usu_clave, usuario.usu_imagen, usuario.usu_correo
                ])
                return resut
            }
        },
        async createReaccion(root, {
            reaccion
        }) {
            if (reaccion == undefined)
                return null
            else {
                const sql = `INSERT INTO reaccion (usu_id, com_id, rea_like, rea_estado) 
                             VALUES ($1, $2, $3, true) returning*;`
                const resut = await db.one(sql, [reaccion.usu_id, reaccion.com_id, reaccion.rea_like])
                return resut
            }
        },
        async createComentario(root, {
            comentario
        }) {
            if (comentario == undefined)
                return null
            else {
                const sql = `INSERT INTO comentario (usu_id, rec_id, com_descripcion, com_estado) VALUES ($1, $2, $3, true) returning*;`
                const resut = await db.one(sql, [comentario.usu_id, comentario.rec_id, comentario.com_descripcion])
                return resut
            }
        },
        async createCategoria(root, {
            categoria
        }) {
            if (categoria == undefined)
                return null
            else {
                const sql = `INSERT INTO categoria (cat_nombre, cat_estado) VALUES ($1,true) returning*;`
                const resut = await db.one(sql, [categoria.cat_nombre])
                return resut
            }
        },
        async ActualizarComentario(root, { comentario }) {
            if (comentario == undefined)
                return null
            else {
                const sql = `update public.comentario set usu_id=$2, com_descripcion=$3, com_estado=$4 
                where com_id=$1 returning*;`
                const resut = await db.one(sql, [comentario.com_id, comentario.usu_id, comentario.com_descripcion, comentario.com_estado])
                return resut
            }
        },
        async ActualizarCategoria(root, { categoria }) {
            if (categoria == undefined)
                return null
            else {
                const sql = `update public.categoria set cat_nombre=$2, cat_estado=$3
                where cat_id=$1 returning*;`
                const resut = await db.one(sql, [categoria.cat_id, categoria.cat_nombre, categoria.cat_estado])
                return resut
            }
        },
        async ActualizarReceta_Comentario(root, { com_rec }) {
            if (com_rec == undefined)
                return null
            else {
                const sql = `update public.com_rec set rec_id=$2, com_id=$3, com_rec_estado=$4
                where com_rec_id=$1 returning*;`
                const resut = await db.one(sql, [com_rec.com_rec_id, com_rec.rec_id, com_rec.com_id, com_rec.com_rec_estado])
                return resut
            }
        },
        async ActualizarDetalle_Receta(root, { det_receta }) {
            if (det_receta == undefined)
                return null
            else {
                const sql = `update public.det_receta set rec_id=$2, ing_id=$3, det_rec_cantidad=$4, det_rec_unidad=$5, det_rec_estado=$6
                where det_rec_id=$1 returning*;`
                const resut = await db.one(sql, [det_receta.det_rec_id, det_receta.rec_id, det_receta.ing_id, det_receta.det_rec_cantidad, det_receta.det_rec_unidad, det_receta.det_rec_estado])
                return resut
            }
        },
        async ActualizarDificultad(root, { dificultad }) {
            if (dificultad == undefined)
                return null
            else {
                const sql = `update public.dificultad set dif_nombre=$2
                where dif_id=$1 returning*;`
                const resut = await db.one(sql, [dificultad.dif_id, dificultad.dif_nombre])
                return resut
            }
        },
        async ActualizarIngrediente(root, { ingrediente }) {
            if (ingrediente == undefined)
                return null
            else {
                const sql = `update public.ingrediente set tip_id=$2,ing_nombre=$3,ing_imagen=$4,ing_estado=$5
                where ing_id=$1 returning*;`
                const resut = await db.one(sql, [ingrediente.ing_id, ingrediente.tip_id, ingrediente.ing_nombre, ingrediente.ing_imagen, ingrediente.ing_estado])
                return resut
            }
        },
        async eliminarUsuario(root, { usu_id }) {
            try {
                const sql = `UPDATE usuario SET usu_estado=false WHERE usu_id=$1 returning*;`
                await db.one(sql, [usu_id])
                return "Usuario eliminado"
            } catch (error) {

            }
        },
        async eliminarCategoria(root, { cat_id }) {
            try {
                const sql = `UPDATE categoria SET cat_estado=false WHERE cat_id=$1 returning*;`
                await db.one(sql, [cat_id])
                return "Categoria eliminada"
            } catch (error) {
                return error.message
            }
        },
        async eliminarIngTipo(root, { tip_id }) {
            try {
                const sql = `UPDATE ing_tipo SET tip_estado=false WHERE tip_id=$1 returning*;`
                await db.one(sql, [tip_id])
                return "Tipo eliminado"
            } catch (error) {
                return error.message
            }
        },
        async eliminarIngrediente(root, { ing_id }) {
            try {
                const sql = `UPDATE ingrediente SET ing_estado=false WHERE ing_id=$1 returning*;`
                await db.one(sql, [ing_id])
                return "Ingrediente eliminado"
            } catch (error) {
                return error.message
            }
        },
        async eliminarReceta(root, { rec_id }) {
            try {
                const sql = `UPDATE receta SET rec_estado=false WHERE rec_id=$1 returning*;`
                await db.one(sql, [rec_id])
                return "Receta eliminada"

            } catch (error) {
                return error.message
            }
        },
        async eliminarComentario(root, { rec_id, usu_id }) {
            try {
                const sql = `UPDATE comentario SET com_estado=false WHERE rec_id=$1 AND usu_id=$2 returning*;`
                await db.one(sql, [rec_id, usu_id])
                return "Comentario eliminado"
            } catch (error) {
                return error.message
            }


        },
        async eliminarDetalleReceta(root, { rec_id, ing_id }) {
            try {
                const sql = `UPDATE det_receta SET det_rec_estado=false WHERE rec_id=$1 AND ing_id=$2 returning*;`
                await db.one(sql, [rec_id, ing_id])
                return "Ingrediente eliminado de la receta"
            } catch (error) {
                return error.message

            }
        },
        async eliminarRecetaCategoria(root, { rec_id, cat_id }) {
            try {
                const sql = `UPDATE rec_cat SET rec_cat_estado=false WHERE rec_id=$1 AND cat_id=$2 returning*;`
                await db.one(sql, [rec_id, cat_id])
                return "Categoria eliminada de la receta"
            } catch (error) {
                return error.message

            }
        },
        async eliminarReaccion(root, { usu_id, com_id }) {
            try {
                const sql = `UPDATE reaccion SET rea_estado=false WHERE usu_id=$1 AND com_id=$2 returning*;`
                await db.one(sql, [usu_id, com_id])
                return "Reaccion eliminada"
            } catch (error) {
                return error.message

            }
        },
        async eliminarInstruccion(root, { rec_id, ins_numpaso }) {
            try {
                const sql = `UPDATE instruccion SET ins_estado=false WHERE rec_id=$1 AND ins_numpaso=$2 returning*;`
                await db.one(sql, [rec_id, ins_numpaso])
                return "Instruccion eliminada"
            } catch (error) {
                return error.message

            }
        }
    }
}


module.exports = recetasResolver