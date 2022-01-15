const { db } = require("./cnn")

const recetasResolver = {
    Query: {
        async usuarios(root, { nickname }) {
            if (nickname == undefined) {
                return await db.any(`select * from usuario where usu_estado=true order by usu_id asc`)
            } else {
                return await db.any(`select * from usuario where usu_estado=true and usu_nickname=$1`, [nickname])
            }
        },
        async categorias(root, { name }) {
            if (name == undefined) {
                return await db.any(`select * from categoria where cat_estado='true' order by cat_id asc`)
            } else {
                return await db.any(`select * from categoria where cat_estado='true' and cat_nombre=$1`, [name])
            }
        },
        async dificultades(root, { name }) {
            if (name == undefined) {
                return await db.any(`select * from dificultad order by dif_id asc`)
            } else {
                return await db.any(`select * from dificultad where and dif_nombre=$1`, [name])
            }
        },
        async ing_tipos(root, { name }) {
            if (name == undefined) {
                return await db.any(`select * from ing_tipo where tip_estado=true order by tip_id asc`)
            } else {
                return await db.any(`select * from ing_tipo where and tip_nombre=$1`, [name])
            }
        },
        async ingredientes(root, { name }) {
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
    }, Mutation: {
        async createUsuario(root, { usuario }) {
            if (usuario == undefined)
                return null
            else {
                const sql = `INSERT INTO usuario (usu_nickname, usu_nombre, usu_apellido, usu_clave, usu_estado, usu_imagen, usu_correo ) 
                             VALUES ($1, $2, $3, $4, true, $5, $6) returning*;`
                const resut = await db.one(sql, [usuario.usu_nickname, usuario.usu_nombre, usuario.usu_apellido, 
                                                usuario.usu_clave, usuario.usu_imagen, usuario.usu_correo ])
                return resut
            }
        },
        async eliminarUsuario(root, { usuario }) {
            if (usuario == undefined)
                return null
            else {
                const sql = `UPDATE usuario SET usu_estado=false WHERE usu_id=$1 returning*;`
                const result = await db.one(sql, [usuario.usu_id])
                return result
            }
        },
        async eliminarCategoria(root, { categoria }) {
            if (categoria == undefined)
                return null
            else {
                const sql = `UPDATE categoria SET cat_estado=false WHERE cat_id=$1 returning*;`
                const result = await db.one(sql, [categoria.cat_id])
                return result
            }
        },
        async eliminarIngTipo(root, { ing_tipo }) {
            if (ing_tipo == undefined)
                return null
            else {
                const sql = `UPDATE ing_tipo SET tip_estado=false WHERE tip_id=$1 returning*;`
                const result = await db.one(sql, [ing_tipo.tip_id])
                return result
            }
        },
        async eliminarIngrediente(root, { ingrediente }) {
            if (ingrediente == undefined)
                return null
            else {
                const sql = `UPDATE ingrediente SET ing_estado=false WHERE ing_id=$1 returning*;`
                const result = await db.one(sql, [ingrediente.ing_id])
                return result
            }
        },
        async eliminarReceta(root, { receta }) {
            if (receta == undefined)
                return null
            else {
                const sql = `UPDATE receta SET rec_estado=false WHERE rec_id=$1 returning*;`
                const result = await db.one(sql, [receta.rec_id])
                return result
            }
        },
        async eliminarComentario(root, { comentario }) {
            if (comentario == undefined)
                return null
            else {
                const sql = `UPDATE comentario SET com_estado=false WHERE com_id=$1 returning*;`
                const result = await db.one(sql, [comentario.com_id])
                return result
            }
        }
    }
}

module.exports = recetasResolver