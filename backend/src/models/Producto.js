import { query } from './db.js'

const Producto = {
  getAll:  ()        => query('SELECT * FROM producto'),
  getById: id        => query('SELECT * FROM producto WHERE codigo_producto = ?', [id]),
  create:  p         => query(
      'INSERT INTO producto (codigo_producto,precio,stock,talla,color) VALUES (?,?,?,?,?)',
      [p.codigo_producto, p.precio, p.stock, p.talla, p.color]),
  remove:  id        => query('DELETE FROM producto WHERE codigo_producto = ?', [id])
}

export default Producto
