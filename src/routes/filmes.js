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

export default router
