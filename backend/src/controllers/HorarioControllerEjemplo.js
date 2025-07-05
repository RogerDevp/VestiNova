import Horario from '../models/Horario.js'

const HorarioController = {
    insertarHorario: async (req, res) => {
        const horario = req.body
        const nuevoHorario = await Horario.insertarHorario(horario)
        return res.json(nuevoHorario)
    },
    obtenerHorarios: async (req, res) => {
        const horarios = await Horario.obtenerHorarios()
        return res.json(horarios)
    },
    actualizarHorario: async (req, res) => {
        const { id } = req.params
        const horario = req.body
        const horarioActualizado = await Horario.actualizarHorario(id, horario)
        return res.json(horarioActualizado)
    },
    eliminarHorario:  async (req, res) => {
        const { id } = req.params
        const horarioEliminado = await Horario.eliminarHorario(id)
        return res.json(horarioEliminado)
    }

}

export default HorarioController