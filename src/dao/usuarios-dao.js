module.exports = class UsuariosDao{
    constructor(bd){
        this.bd = bd
    }

    listaUsuarios(){
        return new Promise((resolve, reject)=>{
           this.bd.all('SELECT * FROM USUARIOS', (error, linhas)=>{
               if(error) reject (`Èrro ao executar banco de dados ${error}`)
               else resolve (linhas)
           } ) 
        })
    }

    buscaUsuario(parametro){
        return new Promise((resolve, reject)=>{
            this.bd.all('SELECT * FROM USUARIOS WHERE EMAIL=(?)', [parametro], (error, usuario)=>{
                if(error) reject  (`Èrro ao encontrar usuario` )
                else resolve (usuario)
            })
        })
    }

    adicionaUsuario(parametros){
        return new Promise((resolve, reject)=>{
            this.bd.run('INSERT INTO USUARIOS (NOME, EMAIL, SENHA) VALUES(?,?,?)', [parametros[0], parametros[1], parametros[2]],
            (error, feito)=>{
                if(error) reject ('Erro ao adicionar usuario')
                else resolve ('Usuario adicionado com sucesso')
            }
            )
        })
    }

   
    AtualizaUsuario(parametro){
        return new Promise((resolve, reject)=>{
            const query = 'UPDATE USUARIOS  SET  NOME =COALESCE(?,NOME), EMAIL =COALESCE(?,EMAIL), SENHA =COALESCE(?,SENHA )  WHERE EMAIL= ?'
            this.bd.all( query, parametro, (erro, usuario)=>{
                if(erro){
                    reject(`Usuario ${parametro} não encontrado erro: ${erro}`)
                }else{
                    resolve(`Os dados do usuario <strong>${parametro[3]}</strong> foram atualizados com sucesso`)
                }
            })
        })
    }

}