import { Router } from 'express'
import ProductoController from '../controllers/ProductoController.js'

const router = Router()

router.get('/',      ProductoController.getAll)
router.get('/:id',   ProductoController.getById)
router.post('/',     ProductoController.create)
router.delete('/:id',ProductoController.remove)

export default router
