// API REST dos veículos
import express, { response } from 'express'
import sql from 'mssql'
import { sqlConfig } from '../sql/config.js'

const router = express.Router()
/***************************************
 * GET /veiculos
 * Lista todos os veículos
 ***************************************/
router.get('/', (req, res) => {
    try {
        sql.connect(sqlConfig).then(pool => {
            return pool.request()
                .execute('SP_VER_FILMES')
        }).then(dados => {
            res.status(200).json(dados.recordset)
        }).catch(err => {
            res.status(400).json(err)
        })
    } catch (err) {
        console.error(`Erro ao conectar: ${err.message}`)
    }
})

/***************************************
 * POST /livro
 * Insere um novo livro
 ***************************************/
router.post('/', (req, res) => {
    sql.connect(sqlConfig).then(pool => {
        const { titulo, genero, alugado } = req.body
        return pool
            .request()
            .input('TITULO', sql.VarChar(50), titulo)
            .input('GENERO', sql.VarChar(50), genero)
            .input('ALUGADO', sql.Char(3), alugado)
            .execute('SP_IN_FILME')
    }).then(dados => {
        res.status(200).json(dados.output)
    }).catch(err => {
        res.status(400).json(err.message)
    })
})

/**********************************************
 * PUT /livro
 * Altera um livro existente
 **********************************************/
router.put("/", (req, res) => {
    sql.connect(sqlConfig).then(pool => {
      const {id, titulo, genero, alugado} = req.body
          return pool
          .request()
          .input('ID', sql.Int, id)
          .input('TITULO', sql.VarChar(50), titulo)
          .input('GENERO', sql.VarChar(50), genero)
          .input('ALUGADO', sql.VarChar(3), alugado)
          .execute('SP_IN_FILME')
        }).then(dados => {
          res.status(200).json('Filme alterado com sucesso!')
      }).catch(err => {
          res.status(400).json(err.message) //bad request
      })
  })

export default router
