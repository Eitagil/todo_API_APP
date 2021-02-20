module.exports = class TarefasDao {
    constructor(bd){
        this.bd = bd
    }

    listaTarefas(){
        return new Promise((resolve, reject)=>{
            this.bd.all('SELECT * FROM TAREFAS', (error,linhas)=>{
                if(error) reject (`Erro ao executar banco de daos ${error}`)
                else resolve (linhas)
            })
        })
    }

    buscaTarefa(parametro){
        return new Promise((resolve, reject)=>{
            this.bd.all('SELECT * FROM TAREFAS WHERE TITULO=(?)', [parametro], (error, tarefa)=>{
                if(error) reject ('Error ao encontrar tarefa')
                else resolve (tarefa)
            })
        })
    }

    adicionaTarefa(parametros){
        return new Promise((resolve, reject)=>{
            this.bd.run('INSERT INTO TAREFAS (TITULO, DESCRICAO, STATUS, DATACRIACAO) VALUES(?,?,?,?)', [parametros[0], parametros[1], parametros[2], parametros[3]],
            (error, feito)=>{
                if(error) reject ('Erro ao adicionar tarefa')
                else resolve ('Tarefa adicionada com sucesso')
            }  )
        })
    }

    deletaTarefa(parametro){
        return new Promise((resolve, reject)=>{
            this.bd.all('DELETE  FROM TAREFAS WHERE TITULO=(?)', [parametro], (error, tarefa)=>{
                if(error) reject  (`Èrro ao deletar tarefa` )
                else resolve ('Tarefa deletado com sucesso')
            })
        })
    }

    atualizaTarefa(parametro){
        return new Promise((resolve, reject)=>{
            const query = 'UPDATE TAREFAS  SET  TITULO =COALESCE(?,TITULO), DESCRICAO =COALESCE(?,DESCRICAO), STATUS =COALESCE(?,STATUS ), DATACRIACAO =COALESCE(?,DATACRIACAO ) WHERE TITULO= ?'
            this.bd.all(query, parametro, (error, feito)=>{
                if(error) reject ('Erro ao atualizar tarefa' )
                else resolve ('Tarefa atualizada')
            })
        })
    }
}
