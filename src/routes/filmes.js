// API REST dos veículos
import express from 'express'
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
            pool.request().execute('SP_IN_FILME')
            return pool.request().execute('SP_VER_FILME');
        })
        .then(dados => {res.status(200).json(dados.recordset)}).catch(err => {res.status(400).json(err)})
    } catch (err) {
        console.error(`Erro ao conectar: ${err.message}`)
    }
})
/***************************************
 * POST /veiculos
 * Insere um novo veículo
 ***************************************/
router.post('/', (req, res) => {
    sql.connect(sqlConfig).then(pool => {
        const { titulo, genero, alugado } = req.body
        return pool
            .request()
            .input('TITULO', sql.varchar(50), titulo)
            .input('GENERO', sql.varchar(50), genero)
            .input('ALUGADO', sql.varchar(3), alugado)
            .output('CODIGOGERADO', sql.Int)
            .execute('SP_IN_FILME')
    }).then(dados => {
        res.status(200).json(dados.output)
    }).catch(err => {
        res.status(400).json(err.message)
    })
})


/**********************************************
 * PUT /veiculos/
 * Altera um veículo existente
 **********************************************/
router.put("/", (req, res) => {
    sql.connect(sqlConfig).then(pool => {
      const {codigo, placa, nome, descricao, fabricacao, preco} = req.body
          return pool
          .request()
          .input('CODIGO', sql.Int, codigo)
          .input('PLACA', sql.Char(7), placa)
          .input('NOME', sql.VarChar(50), nome)
          .input('DESCRICAO', sql.VarChar(200), descricao)
          .input('FABRICACAO', sql.Date, fabricacao)
          .input('PRECO', sql.Numeric, preco)
          .execute('SP_U_EST_VEICULO')
        }).then(dados => {
          res.status(200).json('Veículo alterado com sucesso!')
      }).catch(err => {
          res.status(400).json(err.message) //bad request
      })
  })
/**********************************************
 * DELETE /veiculos/:placa
 * Apaga um veículo pela paca
 **********************************************/
router.delete("/:placa", (req, res) => {
    sql.connect(sqlConfig).then(pool => {
      const placa = req.params.placa
          return pool.request()
          .input('PLACA', sql.Char(7), placa)
          .execute('SP_D_EST_VEICULO')
        }).then(dados => {
          res.status(200).json('Veículo excluído com sucesso!')
      }).catch(err => {
          res.status(400).json(err.message) //bad request
      })
  })

/**********************************************
 * GET /veiculos/:placa
 * Lista um único veículo pela placa
 **********************************************/
router.get("/:placa", (req, res) => {
    const placa = req.params.placa
    try {
        sql.connect(sqlConfig).then(pool => {
            return pool.request()
                .input('FILTRO', sql.Char(7), placa)
                .execute('SP_S_EST_VEICULO')
        }).then(dados => {
            res.status(200).json(dados.recordset)
        }).catch(err => {
            res.status(400).json(err) //bad request
        })
    } catch (err) {
        console.error(err)
    }
})

export default router
