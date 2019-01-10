const ValidationContract = require('../validators/fluentValidator.js')
const repository = require('../repositories/customerRepository')
const md5 = require('md5')
const emailService = require('../services/emailService')
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
    let contract = new ValidationContract()
    contract.hasMinLen(req.body.name, 3, 'O nome deve conter ao menos 3 caracteres')
    contract.isEmail(req.body.email, 'E-mail inválido')
    contract.hasMinLen(req.body.password, 6, 'A senha deve conter ao menos 6 caracteres')

    // If Data Invalid
    if(!contract.isValid()){
        res.status(400).send(contract.errors()).end()
        return
    }

    try {
        await repository.create({
            name: req.body.name,
            email: req.body.email,
            password: md5(req.body.password + global.SALT_KEY)
        })

        emailService.send(
            req.body.email,
            'Bem vindo ao Node Store',
            global.EMAIL_TMPL.replace('{0}', req.body.name)
        )

        res.status(201).send({
            message: 'Cliente cadastrado com sucesso'
        })
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        })
    }
}

// Authenticate Token
exports.authenticate = async(req, res, next) => {
    try {
        const customer = await repository.authenticate({
            email: req.body.email,
            password: md5(req.body.password + global.SALT_KEY)
        }) 

        if (!customer) {
            res.status(404).send({
                message: 'Usuário ou senha inválidos'
            }) 
            return 
        }

        const token = await authService.generateToken({
            email: customer.email,
            name: customer.name
        }) 

        res.status(201).send({
            token: token,
            data: {
                email: customer.email,
                name: customer.name
            }
        }) 
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        }) 
    }
} 

/*
exports.refreshToken = async(req, res, next) => {
    try {
        const token = req.body.token || req.query.token || req.headers['x-access-token'] 
        const data = await authService.decodeToken(token) 

        const customer = await repository.getById(data.id) 

        if (!customer) {
            res.status(404).send({
                message: 'Cliente não encontrado'
            }) 
            return 
        }

        const tokenData = await authService.generateToken({
            id: customer._id,
            email: customer.email,
            name: customer.name,
            roles: customer.roles
        }) 

        res.status(201).send({
            token: token,
            data: {
                email: customer.email,
                name: customer.name
            }
        }) 
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        }) 
    }
}
*/