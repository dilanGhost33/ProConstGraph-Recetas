const express = require('express')
const {graphqlExpress, graphiqlExpress} = require('graphql-server-express')
const {importSchema}=require('graphql-import')
const {makeExecutableSchema}=require('graphql-tools')

const app=express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))

const typeDefs=importSchema('./type-system.graphql')
const resolvers=require('./resolver')
const schema=makeExecutableSchema({
    typeDefs,
    resolvers
})

app.use("/recetas", graphqlExpress({schema}))
app.use("/graphiql",graphiqlExpress({endpointURL:"/recetas"}))

app.listen(3000,()=>{
    console.log("GraphQL-API Recetas listen http://localhost:3000/recetas")
    console.log("GraphiQL listen http://localhost:3000/graphiql")
})