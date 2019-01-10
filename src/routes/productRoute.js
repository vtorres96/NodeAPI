const express = require('express')
const router = express.Router()
const controller = require('../controllers/productController')
const authService = require('../services/authService')

router.get('/', controller.get)
router.get('/:slug', controller.getBySlug)
router.get('/admin/:id', controller.getById)
router.get('/tags/:tag', controller.getByTag)
router.post('/', authService.authorize, controller.post)
router.put('/:id', authService.authorize, controller.put)
router.delete('/', authService.authorize, controller.delete)

module.exports = router