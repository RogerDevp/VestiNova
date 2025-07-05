import { Router } from 'express'
import EmpleadoController from '../controllers/EmpleadoController.js'

const router = Router()

router.get('/',        EmpleadoController.getAll)
router.get('/:dni',    EmpleadoController.getById)
router.post('/',       EmpleadoController.create)
router.delete('/:dni', EmpleadoController.remove)

export default router
