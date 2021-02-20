const TarefasDao = require('../dao/tarefas-dao')

module.exports = (app, bd)=> {
    const daoTarefas = new TarefasDao(bd)

    app.get('/tarefas', async(req, resp)=>{
        try{
            const retornoListaTarefas = await daoTarefas.listaTarefas()
            resp.send(retornoListaTarefas)
        }catch(error){
            resp.send(error)

        }
    })

    app.get('/tarefas/:titulo', async(req, resp)=>{
        try{
            const retornoBuscaTarefas = await daoTarefas.buscaTarefa(req.params.titulo)
            resp.send(retornoBuscaTarefas)
        }catch(error){
            resp.send(error)
        }
    })

    app.post('/tarefas', async(req, resp)=>{
        try{
            const parametros = [req.body.TITULO, req.body.DESCRICAO, req.body.STATUS, req.body.DATACRIACAO]
            const retornoAdicionaTarefa = await daoTarefas.adicionaTarefa(parametros)
            resp.send(retornoAdicionaTarefa)
        }
        catch(error){
            resp.send(error)
        }
    })

    app.delete('/tarefas/:titulo', async(req, resp)=>{
        try{
            const retornoDeletaTarefa = await daoTarefas.deletaTarefa(req.params.titulo)
            resp.send(retornoDeletaTarefa)
        }catch(error){
            resp.send(error)
        }
    })

    app.put('/tarefas/:titulo', async (req, res)=>{
  
        try{
    
          const tarefa = [req.body.TITULO, req.body.DESCRICAO, req.body.STATUS, req.body.DATACRIACAO, req.params.titulo]
          const retornoAtualizaTarefa = await daoTarefas.atualizaTarefa(tarefa)
          res.send(retornoAtualizaTarefa)
    
        }catch(error){
    
          res.send(error)
    
        }
      
      })
    
}