require('dotenv').config() // .env - npm i dotenv
const express = require('express') // фреймворк Express - npm i express
const sequelize = require('./db') // ORM Sequelize для работы с БД - npm i pg pg-hstore sequelize
const cors =require('cors') // пакет CORS («совместное использование ресурсов между разными источниками»)Чтобы делать запросы с браузера на сервер - npm i cors
const fileUpload = require('express-fileupload') // пакет для работы с файлами - npm i express-fileupload

const models = require('./models/models') // модели
const router = require('./routes/index') //  маршруты
const errorHandler = require('./middleware/ErrorHandlingMiddleware') // Middleware обработка ошибок
const path = require('path') // модуль для работы с путями


const PORT = process.env.PORT || 5000//берём порт приложения из env

const app = express()

//регистрируем
app.use(cors()) // чтобы делать запросы с браузера
app.use(express.json()) // чтобы парсить json
app.use(express.static(path.resolve(__dirname, 'static'))) // делаем всё доступным в папке static, resolve - адаптирует путь под ОС
app.use(fileUpload({})) //
app.use('/api', router) //указываем подмаршрут для API


//Обработка ошибок (должен быть последним Middleware!!!)
app.use(errorHandler)

app.get('/', (req, res) => {
    res.status(200).json({message: 'WORK'})
} )

const start = async () =>{
    try {
        await sequelize.authenticate() //устанавливает подключение к БД
        await sequelize.sync() //сверяет состояние БД со схемой БД
        app.listen(PORT,() => console.log(`Server started on port ${PORT}`))
    }catch (e) {
        console.log(e)
    }
}

start()

