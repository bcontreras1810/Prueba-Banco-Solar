const pool = require("./dbConfig")

// Función para realizar una transferencia
const transferir = async (emisor, receptor, monto) => {
    try {
      // Iniciar una transacción SQL
      await pool.query("BEGIN");
      // Actualizar el balance del emisor
      await pool.query("UPDATE usuarios SET balance = balance - $1 WHERE id = $2", [monto, emisor]);     
      // Actualizar el balance del receptor
      await pool.query("UPDATE usuarios SET balance = balance + $1 WHERE id = $2", [monto, receptor]);
      // Insertar el registro de la transferencia
      await pool.query("INSERT INTO transferencias (emisor, receptor, monto, fecha) VALUES ($1, $2, $3, NOW())", [emisor, receptor, monto]);
      // Confirmar la transacción SQL
      await pool.query("COMMIT");  
      console.log("transferencia realizada con exito:","monto:", monto, "de", receptor, "a", emisor )
    } catch (error) {
      // Si ocurre un error, hacer rollback de la transacción SQL
      await pool.query("ROLLBACK");  
      console.error("Error al procesar transferencia",error) 
    }
  };
  
  // Función para obtener todas las transferencias almacenadas
const obtenerTransferencias = async () => {
    try {
      // Consultar todas las transferencias
      const result = await pool.query("SELECT * FROM transferencias");
      return result.rows
    } catch (error) {
      // Enviar respuesta de error si ocurre un problema
      console.error("Error al ontener transferencias",error)
    }
};
  
module.exports = { transferir, obtenerTransferencias };