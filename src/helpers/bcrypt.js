const bcrypt = require('bcrypt');
const fs = require("fs");

const { hashPassword, comparePasswords } = require('./bcryptFunctions'); // Importa las funciones de bcrypt

const cargarDatos = () => JSON.parse(fs.readFileSync("data.json", "utf-8"));
const guardarDatos = (data) => fs.writeFileSync("data.json", JSON.stringify(data), "utf-8");

// Función para el registro de usuarios
exports.registrarUsuario = async (req, res) => {
    const { nombre, email, password } = req.body;
    const data = cargarDatos();
    const usuarios = data.usuarios;

    // Verificar si el usuario ya está registrado
    if (usuarios.find((user) => user.email === email)) {
        return res.status(400).json({ error: "El usuario ya está registrado" });
    }

    try {
        // Cifra la contraseña antes de guardarla en la base de datos
        const hashedPassword = await hashPassword(password);

        // Crea un nuevo usuario con la contraseña cifrada
        const nuevoUsuario = { id: usuarios.length + 1, nombre, email, password: hashedPassword };
        usuarios.push(nuevoUsuario);
        guardarDatos(data);

        res.status(200).json({ mensaje: "Usuario registrado correctamente" });
    } catch (error) {
        res.status(500).json({ error: "Error al registrar el usuario" });
    }
};

// Función para el inicio de sesión
exports.iniciarSesion = async (req, res) => {
    const { email, password } = req.body;
    const data = cargarDatos();
    const usuarios = data.usuarios;

    // Busca el usuario por email
    const usuario = usuarios.find((user) => user.email === email);

    if (!usuario) {
        return res.status(401).json({ error: "Credenciales inválidas" });
    }

    try {
        // Compara la contraseña ingresada con la contraseña cifrada almacenada en la base de datos
        const match = await comparePasswords(password, usuario.password);
        if (match) {
            res.status(200).json({ mensaje: "Inicio de sesión exitoso", usuario });
        } else {
            res.status(401).json({ error: "Credenciales inválidas" });
        }
    } catch (error) {
        res.status(500).json({ error: "Error al iniciar sesión" });
    }
};
