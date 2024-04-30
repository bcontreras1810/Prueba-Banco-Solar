const express = require("express");
const app = express();
const { insertar, consultar, editar, eliminar } = require("./consultas");
const { transferir, obtenerTransferencias } = require("./transferencias");

// Middleware para analizar el cuerpo de las solicitudes como JSON
app.use(express.json());

// Ruta para la pagina de inicio
app.get("/", (req, res) => {
    // Envia un archivo HTML como respuesta
    res.sendFile(__dirname + "/index.html");
});

// Ruta para agregar un usuario 
app.post("/usuario", async (req, res) => {
    try {
        // Extrae el nombre y el saldo del cuerpo de la solicitud
        const { nombre, balance } = req.body;
        // Inserta un nuevo usuario en la base de datos
        const respuesta = await insertar(nombre, balance);
        // Devuelve la respuesta al cliente
        res.json(respuesta);
    } catch (error) {
        // Manejo de errores
        res.status(500).send("Error al agregar usuario :/");
    }
});

// Ruta para obtener todos los usuarios
app.get("/usuarios", async (req, res) => {
    try {
        // Consulta todos los usuarios en la base de datos
        const usuarios = await consultar();
        // Devuelve los usuarios como respuesta
        res.json(usuarios);
    } catch (error) {
        // Manejo de errores
        res.status(500).send("Error al consultar usuarios");
    }
});

// Ruta para editar un usuario 
app.put("/usuario", async (req, res) => {
    try {
        // Extrae el ID, nombre y saldo del cuerpo de la solicitud
        const { id, nombre, balance } = req.body;
        // Edita un usuario existente en la base de datos
        const resultado = await editar(id, nombre, balance);
        // Devuelve el resultado de la edición como respuesta
        res.json(resultado);
    } catch (error) {
        // Manejo de errores
        res.status(500).json("Error al editar usuario ");
    }
});

// Ruta para eliminar un usuario 
app.delete("/usuario", async (req, res) => {
    try {
        // Extrae el ID del usuario a eliminar de los parametros de consulta
        const { id } = req.query;
        // Elimina el usuario de la base de datos
        const respuesta = await eliminar(id);
        // Devuelve la respuesta al cliente
        res.json(respuesta);
    } catch (error) {
        // Manejo de errores
        res.status(500).json("Error al borrar usuario");
    }
});

// Ruta para realizar una transferencia 
app.post('/transferencia', async (req, res) => {
    try {
        // Extrae el emisor, receptor y monto de la transferencia del cuerpo de la solicitud
        const { emisor, receptor, monto } = req.body;
        // Realiza la transferencia entre usuarios
        await transferir(emisor, receptor, monto);
        // Devuelve un mensaje de exito
        res.status(200).json("Transferencia exitosa");
    } catch (error) {
        // Manejo de errores
        res.status(500).json({ success: false, error: 'Error al procesar la transferencia' });
    }
});

// Ruta para obtener todas las transferencias 
app.get('/transferencias', async (req, res) => {
    try {
        // Obtiene todas las transferencias almacenadas
        const result = await obtenerTransferencias();
        // Devuelve las transferencias como respuesta
        res.status(200).json(result);
    } catch (error) {
        // Manejo de errores
        res.status(500).json({ success: false, error: 'Error al obtener las transferencias' });
    }
});

// Ruta generica para manejar solicitudes no definidas
app.get("*", (req, res) => {
    // Envia un mensaje de error
    res.send("Esta página no existe");
});

// Inicia el servidor en el puerto 3000
app.listen(3000, () => {
    console.log("Server ON");
});
