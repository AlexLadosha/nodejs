const Router = require('express') // получаем Router из express
const router = new Router() // создаем объект этого Router
const deviceController = require('../controllers/deviceController')

router.post('/',deviceController.create)
router.get('/',deviceController.getAll)
router.get('/:id',deviceController.getOne)
router.put('/:id',deviceController.update)
router.delete('/:id',deviceController.delete)

module.exports = router