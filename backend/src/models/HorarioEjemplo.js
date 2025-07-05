import { query } from './db.js'

const Horario = {

// insertar horario de comida
    insertarHorario : async (horario) => {
    const { hora, id_estanque, cantidad_comida } = horario
    const result = await query(
        `INSERT INTO horarios (hora, id_estanque, cantidad_comida) VALUES ($1, $2, $3)`,
        [hora, id_estanque, cantidad_comida])
    console.log(result);
    return result.rows[0]
}, 

// obtener todos los horarios de comida
    obtenerHorarios : async () => {
    const result = await query(`SELECT * FROM horarios;`,[])
    return result.rows
},

// actualizar horario de comida
    actualizarHorario : async (id_horario, horario) => {
    const { hora, id_estanque, cantidad_comida } = horario
    const result = await query(
        `UPDATE horarios SET hora = $1, id_estanque = $2, cantidad_comida = $3 WHERE id_horario = $4`,
        [hora, id_estanque, cantidad_comida, id_horario])
    return result.rows[0]
},

// eliminar horario de comida
    eliminarHorario : async (id_horario) => {
    const result = await query(
        `DELETE FROM horarios WHERE id_horario = $1`,
        [id_horario])
    return result.rows[0]
},

}

export default Horario



// creamos la funcion para insertar horario de comida


// si ya existe ese horario para ese estanque auctualizamos