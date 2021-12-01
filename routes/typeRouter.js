const Router = require('express') // получаем Router из express
const router = new Router() // создаем объект этого Router
const typeController = require('../controllers/typeController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/',checkRole('ADMIN'),typeController.create )
router.get('/',typeController.getAll )
router.put('/:id',checkRole('ADMIN'),typeController.update)
router.delete('/:id',checkRole('ADMIN'),typeController.delete)

module.exports = router