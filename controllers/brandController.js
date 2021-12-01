const {Brand} = require('../models/models')
const ApiError = require('../error/ApiError')

class BrandController{

    async create(req, res) {
        const {name} = req.body
        const brand = await Brand.create({name})
        return res.json(brand)
    }

    async getAll(req, res) {
        const brands = await Brand.findAll()
        return res.json(brands)

    }

    async update(req, res) {
        const {id} = req.params
        const brand = await Brand.update(req.body, {where: {id}})

        return res.json({message: 'Брэнд изменен'})
    }

    async delete(req, res) {
        const {id} = req.params
        const brand = await Brand.destroy({where: {id}})

        return res.json({message: 'Брэнд удалён'})
    }
}

module.exports = new BrandController()