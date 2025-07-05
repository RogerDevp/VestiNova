import Producto from '../models/Producto.js'

const ProductoController = {
  getAll: async (_req, res, next) => {
    try { const [rows] = await Producto.getAll(); res.json(rows) }
    catch (err) { next(err) }
  },

  getById: async (req, res, next) => {
    try {
      const [rows] = await Producto.getById(req.params.id)
      rows.length ? res.json(rows[0]) : res.sendStatus(404)
    } catch (err) { next(err) }
  },

  create: async (req, res, next) => {
    try { await Producto.create(req.body); res.status(201).json({ ok: true }) }
    catch (err) { next(err) }
  },

  remove: async (req, res, next) => {
    try { await Producto.remove(req.params.id); res.json({ ok: true }) }
    catch (err) { next(err) }
  }
}

export default ProductoController
