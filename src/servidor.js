const express = require ("express")
const bodyparser = require ("body-parser")
const app = express();
app.use(bodyparser.json())
const porta = 3030

const bd = require ('./infra/sqlite-db')
const usuariosController = require('./controllers/usuarios-controller')
const tarefasController = require ('./controllers/tarefas-controller')

usuariosController(app, bd)
tarefasController(app, bd)

app.listen(porta,() => console.log(`[INFO]servidor rodando na porta: ${porta}`))