const fs = require("fs");

const loadData = () => JSON.parse(fs.readFileSync("data.json", "utf-8"));

exports.createProduct = (req, res) => {
  const { name, price } = req.body;
  const products = loadData().products;

  // Agregar producto
  const newProduct = { name, price };
  products.push(newProduct);
  fs.writeFileSync("data.json", JSON.stringify({ products }), "utf-8");

  res.status(200).send("Product added successfully");
};
