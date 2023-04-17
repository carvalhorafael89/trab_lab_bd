import express from "express";
import cors from 'cors';
import filmes from './routes/filmes.js';

const app = express();
const port = 4001;

app.use(cors()) //habilita o CORS
app.use(express.urlencoded({extended: true}));
app.use(express.json()) //parse JSON
app.use('./api/filmes', filmes)
/**
 * Rotas publicas
 */
app.use('/', express.static('public'));

app.get('/api/', (req, res) => {
    res.status(200).json({
        mensagem: 'API 100% funcional!',
        versao: '1.0.0'
    })
})

/**
 * Rota para erro 404
 */

app.use(function(req, res){
    res.status(404).json({
        mensagem: `A rota ${req.originalUrl} não existe!`
    })
})


app.listen(port, function(){
    console.log(`Servidor rodando na porta ${port}`);
})