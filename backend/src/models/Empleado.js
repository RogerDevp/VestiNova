import { query } from './db.js'

const Empleado = {
  getAll:   ()            => query('SELECT * FROM empleado'),
  getById:  (dni)         => query('SELECT * FROM empleado WHERE dni = ?', [dni]),
  create:   (e)           => query(
      `INSERT INTO empleado (dni,nombres,apellido_paterno,apellido_materno,
                              num_telefono,email,ubicacion,salario,id_rol)
       VALUES (?,?,?,?,?,?,?,?,?)`,
      [e.dni, e.nombres, e.apellido_paterno, e.apellido_materno,
       e.num_telefono, e.email, e.ubicacion, e.salario, e.id_rol || null]),
  remove:   (dni)         => query('DELETE FROM empleado WHERE dni = ?', [dni])
}

export default Empleado
