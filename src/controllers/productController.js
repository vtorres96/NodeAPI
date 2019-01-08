const ValidationContract = require('../validators/fluentValidator.js')
const repository = require('../repositories/productRepository')

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

// List Items By Slug
exports.getBySlug = async(req, res, next) => {
    try {
        let data = await repository.getBySlug(req.params.slug)
        res.status(200).send(data)
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        })
    }
}

// List Items By Id
exports.getById = async(req, res, next) => {
    try {
        let data = await repository.getById(req.params.id)
        res.status(200).send(data)
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        })
    }
}

// List Items By Tag
exports.getByTag = async(req, res, next) => {
    try {
        let data = await repository.getByTag(req.params.tag)
        res.status(200).send(data)
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        })
    }
}

// Create
exports.post = async(req, res, next) => {
    let contract = new ValidationContract()
    contract.hasMinLen(req.body.title, 5, 'O título deve conter ao menos 5 caracteres')
    contract.hasMinLen(req.body.slug, 5, 'O slug deve conter ao menos 5 caracteres')
    contract.hasMinLen(req.body.description, 5, 'A descrição deve conter ao menos 5 caracteres')

    // If Data Invalid
    if(!contract.isValid()){
        res.status(400).send(contract.errors()).end()
        return
    }

    try {
        await repository.create(req.body)
        res.status(201).send({
            message: 'Produto adicionado com sucesso'
        })
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao cadastrar o produto'
        })
    }
}

// Update
exports.put = async(req, res, next) => {
    try {
        await repository.update(req.params.id, req.body)
        res.status(200).send({
            message: 'Produto atualizado com sucesso'
        })
    } catch (e){
        res.status(500).send({
            message: 'Falha ao atualizar produto'
        })
    }
}

// Delete
exports.delete = async(req, res, next) => {
    try {
        await repository.delete(req.body.id)
        res.status(200).send({
            message: 'Produto removido com sucesso'
        })
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao removido produto'
        })
    }
}