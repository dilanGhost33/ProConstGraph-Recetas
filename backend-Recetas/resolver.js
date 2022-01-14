const { db } = require("./cnn")

const recetasResolver = {
    Query: {
        async recetas(root, { name }) {
            if (name == undefined) {
                return await db.any(`select * from receta where rec_estado=true order by rec_id asc`)
            } else {
                return await db.any(`select * from receta where rec_estado=true and rec_nombre=$1`, [name])
            }
        }
    }, receta: {
        async autor(receta) {
            return db.one(`select * from usuario where usu_id=$1`, [receta.usu_id])
        },
        async dificultad(receta) {
            return db.one(`select * from dificultad where dif_id=$1`, [receta.dif_id])
        }
    }
}

module.exports = recetasResolver