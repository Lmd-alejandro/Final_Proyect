const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const config = require("./config/index");

const clientRoutes = require("./routes/clientRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const authMiddleware = require("./middleware/authMiddleware");

const app = express();

app.use(bodyParser.json());

app.use('/clients', authMiddleware, clientRoutes);
app.use('/products', authMiddleware, productRoutes);
app.use('/orders', authMiddleware, orderRoutes);

const PORT = config.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
