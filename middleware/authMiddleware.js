const jwt = require('jsonwebtoken')

module.exports = function ( req, res, next) {
    if (req.method === 'OPTIONS') {
        next()
    }
    try {
        const token = req.headers.authorization.split(' ')[1] // Typetoken fkldsjflkfjds.klfjdsklfjdsklfjsdklf.dsflkdsjdslkfj - отделяем по пробелу тип от самого токена
        if (!token) {
            return res.status(401).json({message: 'Не авторизован'})
        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY) // декодируем токен сверяя его с секретным ключом
        req.user = decoded
        next()
    } catch (e) {
        res.status(401).json({message: 'Не авторизован'})
    }


}