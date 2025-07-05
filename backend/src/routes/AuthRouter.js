import { Router } from 'express'
import { query } from '../models/db.js'
import jwt from 'jsonwebtoken'

const router = Router()
const SECRET = process.env.JWT_SECRET || 'super‑secret'

router.post('/login', async (req, res, next) => {
  try {
    const { dni, email } = req.body
    const [rows] = await query(
      'SELECT dni,nombres FROM empleado WHERE dni = ? AND email = ?', [dni, email])
    if (!rows.length) return res.status(401).json({ error: 'Credenciales incorrectas' })
    const token = jwt.sign({ dni }, SECRET, { expiresIn: '1h' })
    res.json({ token })
  } catch (err) { next(err) }
})

export default router
