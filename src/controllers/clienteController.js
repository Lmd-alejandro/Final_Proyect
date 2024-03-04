const fs = require("fs");

// Función para cargar los datos desde el archivo JSON
const loadData = () => JSON.parse(fs.readFileSync("data.json", "utf-8"));

exports.createClient = (req, res) => {
  const { name, email } = req.body;
  const users = loadData().users;

  // Agregar Cliente
  const newClient = { name, email, visits: [] };
  users.push(newClient);
  fs.writeFileSync("data.json", JSON.stringify({ users }), "utf-8");

  res.status(200).send("Client added successfully");
};
