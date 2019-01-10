const repository = require('../repositories/orderRepository')
const guid = require('guid')
const authService = require('../services/authService')

// List Items
exports.get = async(req, res, next) => {
    try {
        let data = await repository.get()
        res.status(200).send(data)       
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        })
    }
}

// Create
exports.post = async(req, res, next) => {
    try {
        // Catching the Token
        const token = req.body.token || req.query.token || req.headers['x-access-token']

        // Decode the Token
        const data = await authService.decodeToken(token)

        await repository.create({
            customer: data.id,
            number: guid.raw().substring(0,6),
            items: req.body.items  
        })
        res.status(201).send({
            message: 'Pedido cadastrado com sucesso'
        })
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        })
    }
}