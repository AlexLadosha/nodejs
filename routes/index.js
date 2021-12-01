const Router = require('express') // получаем Router из express
const router = new Router() // создаем объект этого Router

const userRouter = require('./userRouter')
const deviceRouter = require('./deviceRouter')
const brandRouter = require('./brandRouter')
const typeRouter = require('./typeRouter')


router.use('/user', userRouter)
router.use('/device', deviceRouter )
router.use('/brand', brandRouter )
router.use('/type', typeRouter )



module.exports = router