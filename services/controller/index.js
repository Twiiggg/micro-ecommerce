i   // importa o framework web Express para criar as rotas http
const express = require('express');

// importa o cliente gRPC para o serviço de frete
const shipping = require('.shipping');

//importa o cliente gRPC para o serviço de produtos
const inventory = require('./inventory');

// importa middleware para permitir requests cross-origin (CORS)
const cors = require('cors')

// inicia o express
const app = express();

// aplica o middleware de CORS para permitir que o frontend em outro dominio consuma a API
app.use(cors());

/**
 * Retorna a lista de produtos da loja via InventoryService
 */
app.get('/products', (req, res, next) => {
    // chama o método gRPC SearchAllProducts do microserviço de inventário
    inventory.SearchAllProducts(null, (err, data) => {
        if (err) {
            // se houver erro, loga no console e retorna erro http 500
            console.error(err) ;
            res.status(500).send({ error: 'algo falhou :,('});
        } else {
            // se sucesso, responde com a lista de produtos no formato json
            res.json(data.products);
        }
    });
});

/**
 * Consulta o frete de envio no ShippingServce
 */
app.get('/shipping/:cep', (req, res, next) => {
    // chama o método grPC GetShippingRate, passando o CEP como parametro
    shipping.GetShippingRate(
        {
            cep: req.params.cep, // pega o cep do url
        },
        (err, data) => {
        if (err) {
            // se houver erro, loga no console e retorna erro http 500
            console.error(err) ;
            res.status(500).send({ error: 'algo falhou :,('});
        } else {
            // retora o cep consultada e o valor do frete calculado
            res.json({
                cep: req.params.cep,
                value: data.value,
            });
        } 
        }
    );
});

/**
 * Inicia o router ()
 */
app.listen(3000, () => {
    console.log('Serviço de Controller rodando em http://127.0.0.1:3000');
});