import express from 'express'
import HorarioController from '../controllers/HorarioController.js'
var HorarioRouter = express.Router()

// ruta para insertar un nuevo horario de comida
HorarioRouter.post('/horarios', HorarioController.insertarHorario )

// ruta para obtener todos los horarios de comida
HorarioRouter.get('/horarios', HorarioController.obtenerHorarios)

// ruta para actualizar un horario de comida
HorarioRouter.put('/horarios/:id',HorarioController.actualizarHorario )

// ruta para eliminar un horario de comida
HorarioRouter.delete('/horarios/:id', HorarioController.eliminarHorario)

export {
    HorarioRouter
}
