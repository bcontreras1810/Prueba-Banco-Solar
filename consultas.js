// Importar la configuracion del pool de la base de datos
const pool = require("./dbConfig");

// Definir una funcion asincrona llamada "insertar" que reciba los parametros "nombre" y "balance"
const insertar = async (nombre, balance) => {
    try {
        // Ejecutar una consulta SQL para insertar un nuevo usuario en la tabla "usuarios"
        const { rows } = await pool.query(
            "INSERT INTO usuarios (nombre, balance) VALUES ($1, $2) RETURNING *",
            [nombre, balance]
        );
        // Devolver el primer usuario insertado
        return rows[0];
    } catch (error) {
        // Manejar errores en caso de que ocurran
        console.error("Error al insertar usuario", error);
    }
};

// Definir una funcion asincrona llamada "consultar"
const consultar = async () => {
    try {
        // Ejecutar una consulta SQL para obtener todos los usuarios de la tabla "usuarios"
        const result = await pool.query("SELECT * FROM usuarios");
        // Devolver los usuarios obtenidos
        return result.rows;
    } catch (error) {
        // Manejar errores en caso de que ocurran
        console.error("Error al consultar usuarios", error);
    }
};

// Definir una funcion asincrona llamada "editar" que reciba los parametros "id", "nombre" y "balance"
const editar = async (id, nombre, balance) => {
    try {
        // Ejecutar una consulta SQL para actualizar el nombre y el balance de un usuario en la tabla "usuarios"
        const result = await pool.query(
            "UPDATE usuarios SET nombre = $2, balance = $3 WHERE id = $1 RETURNING *",
            [id, nombre, balance]
        );
        // Devolver el resultado de la actualizacion
        return result;
    } catch (error) {
        // Manejar errores en caso de que ocurran
        console.error("Error al editar usuario!", error);
    }
};

// Definir una función asíncrona llamada "eliminar" que reciba un parámetro "id"
const eliminar = async (id) => {
    try {
        // Ejecutar una consulta SQL para eliminar un usuario de la tabla "usuarios" segun su ID
        const result = await pool.query("DELETE FROM usuarios WHERE id = $1", [id]);
        // Devolver el resultado de la eliminacion
        return result.rows;
    } catch (error) {
        // Manejar errores en caso de que ocurran
        console.error("Error al eliminar usuario!", error);
    }
};

// Exportar las funciones creadas para que esten disponibles en otros modulos
module.exports = { insertar, consultar, editar, eliminar };
