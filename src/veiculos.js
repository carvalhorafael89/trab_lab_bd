//API REST dos veiculos
import express from 'express'
import sql from 'mssql'
import { sqlConfig } from '../sql/config'

const router = express.Router()

export default router

/**
 * Listando os veículos
 */

router.get('/', (req, res) => {
    try{
        sql.connect(sqlConfig).then(pool =>{
            return pool.request()
            .execute('SP_IN_FILME')
            .execute('SP_VER_FILME')
        }).then(dados => {
            res.status(200).json(dados.recordset)
        }).catch(err => {
            res.status(400).json(err)
        })
    }
    catch (err){
        console.error(`Erro ao conectar ${err.message}`)
    }
})