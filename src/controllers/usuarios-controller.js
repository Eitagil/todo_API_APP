const UsuariosDao = require('../dao/usuarios-dao')

module.exports = (app, bd)=>{
    const daoUsuarios = new UsuariosDao(bd)
    
    app.get('/usuarios', async(req, resp)=>{
        try{
            const retornoListaUsuarios = await daoUsuarios.listaUsuarios()
            resp.send(retornoListaUsuarios)
        }catch(error){
            resp.send(error)
        }
    })

    app.get('/usuarios/:email', async(req, resp)=>{
        try{
            const retornoBuscaUsuario = await daoUsuarios.buscaUsuario(req.params.email)
            resp.send(retornoBuscaUsuario)
        }catch(error){
            resp.send(error)
        }
    })

    app.post('/usuarios', async(req, resp)=>{
        try{
            const parametros = [req.body.NOME, req.body.EMAIL, req.body.SENHA]
            const retornoAdicionaUsuario = await daoUsuarios.adicionaUsuario(parametros)
            resp.send(retornoAdicionaUsuario)

        }
        catch(error){
            resp.send(error)
        }
    })

    app.delete('/usuarios/:email', async(req, resp)=>{
        try{
            const retornoDeletaUsuario = await daoUsuarios.deletaUsuario(req.params.email)
            resp.send(retornoDeleteUsuario)
        }catch(error){
            resp.send(error)
        }
    })

    app.put('/usuarios/:email', async (req, res)=>{
      
        try{
  
           const parametro = [req.body.NOME, req.body.EMAIL, req.body.SENHA, req.params.email]
           const retornoAtualizaUsuario = await daoUsuarios.AtualizaUsuario(parametro)
           res.send(retornoAtualizaUsuario)
  
        }catch(error){
  
           res.send(error)
  
        }
        
     })

}