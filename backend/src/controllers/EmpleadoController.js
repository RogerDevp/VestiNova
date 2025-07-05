import Empleado from '../models/Empleado.js'

const EmpleadoController = {
  getAll: async (_req, res, next) => {
    try { const [rows] = await Empleado.getAll(); res.json(rows) }
    catch (err) { next(err) }
  },

  getById: async (req, res, next) => {
    try {
      const [rows] = await Empleado.getById(req.params.dni)
      rows.length ? res.json(rows[0]) : res.sendStatus(404)
    } catch (err) { next(err) }
  },

  create: async (req, res, next) => {
    try { await Empleado.create(req.body); res.status(201).json({ ok: true }) }
    catch (err) { next(err) }
  },

  remove: async (req, res, next) => {
    try { await Empleado.remove(req.params.dni); res.json({ ok: true }) }
    catch (err) { next(err) }
  }
}

export default EmpleadoController
