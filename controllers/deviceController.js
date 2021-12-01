const uuid = require('uuid') // пакет для генерации рандомных id
const path = require('path') // модуль для пути
const {Device, DeviceInfo} = require('../models/models')
const ApiError = require('../error/ApiError')


class DeviceController {

    async create(req, res, next) {
        try {
            let {name, price, brandId, typeId, info} = req.body
            const {img} = req.files
            let fileName = uuid.v4() + ".jpg"// генерируем уникальное имя
            img.mv(path.resolve(__dirname, '..', 'static', fileName)) // mv - перемещает файл в папку, resolve - адаптирует путь под ОС
            const device = await Device.create({name, price, brandId, typeId, img: fileName})

            if (info) {
                info = JSON.parse(info)
                info.forEach((i =>
                        DeviceInfo.create({title: i.title, description: i.description, deviceId: device.id})
                ))
            }

            // return res.json(device)
            return res.json(device)

        } catch (e) {
            next(ApiError.badReauest(e.message))
        }

    }

    async getAll(req, res) {
        let {brandId, typeId, limit, page} = req.query

        //пагинация
        page = page || 1 // страница
        limit = limit || 9 // количество на странице
        let offset = page * limit - limit // отступ

        let devices
        if (!brandId && !typeId) {
            devices = await Device.findAndCountAll({limit, offset})
        }
        if (!brandId && typeId) {
            devices = await Device.findAndCountAll({where: {typeId}, limit, offset})
        }
        if (brandId && !typeId) {
            devices = await Device.findAndCountAll({where: {brandId}, limit, offset})
        }
        if (brandId && typeId) {
            devices = await Device.findAndCountAll({where: {brandId, typeId}, limit, offset})
        }

        return res.json(devices)
    }

    async getOne(req, res) {
        const {id} = req.params
        const device = await Device.findOne(
            {
                where: {id},
                include: [{model: DeviceInfo, as: 'device_infos'}]
            },
        )
        return res.json(device)
    }

    async update(req, res) {
        const {id} = req.params
        const device = await Device.update(req.body, {where: {id}})
        if (device) {
        return res.json({message: 'Девайс изменен'})
        }
    }

    async delete(req, res) {
        const {id} = req.params
        const device = await Device.destroy({where: {id}})
        if (device) {
        return res.json({message: 'Девайс удалён'})
        }
    }

}

module.exports = new DeviceController()