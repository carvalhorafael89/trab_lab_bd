/**
 * Rotas publicas
 */

app.use('/', express.static('public'));

/**
 * Criando rota default da API
 */

app.get('/api', (req, res) => {
    res.status(200).json({
        mensagem: 'API 100% funcional!',
        versao: '1.0.0'
    })
})

/**
 * Rota para erro 404
 */

app.use(function(req, res){
    res.status(404).json({ //passando código de erro como parametro para darmos a mensagem
        mensagem: `A rota ${req.originalUrl} não existe!`
    })
})

app.listen(port, function(){
    console.log(`Servidor rodando na porta ${port}`);
})