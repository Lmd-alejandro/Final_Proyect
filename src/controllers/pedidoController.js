const fs = require("fs");

const loadData = () => JSON.parse(fs.readFileSync("data.json", "utf-8"));

exports.createOrder = (req, res) => {
  const { clientId, products } = req.body;
  const { users } = loadData();
  const client = users.find((u) => u.id === clientId);

  // Se verifica que el cliente exista
  if (!client) {
    return res.status(404).json({ error: "Client not found" });
  }

  // Registro la orden
  const newOrder = { clientId, products };
  client.orders.push(newOrder);
  fs.writeFileSync("data.json", JSON.stringify({ users }), "utf-8");

  res.status(200).send("Order registered successfully");
};
