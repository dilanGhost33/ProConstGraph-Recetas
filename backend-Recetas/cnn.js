const pgPromise= require('pg-promise')
const config={
    host:'localhost',
    port:'5432',
    database:'recetas',
    user:'postgres',
    password:'Scorpion246'
}

const pgp=pgPromise({})
const db=pgp(config)
exports.db=db