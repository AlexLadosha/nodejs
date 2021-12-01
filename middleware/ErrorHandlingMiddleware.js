const ApiError = require('../error/ApiError')

module.exports = function (err, req, res, next) {
    if (err instanceof ApiError) { // если класс ошибки именно ApiError
        return res.status(err.status).json({message: err.message}) //отправляем статус ошибки и сообщение, которое в ApiError
    }
    return res.status(500).json({message: 'Непредвиденная ошибка!'}) //если же ошибка не класса ApiError
}