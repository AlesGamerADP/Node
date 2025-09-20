const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const ticketRoutes = require("./routes/ticket.routes");
const notificationRoutes = require("./routes/notification.routes");
const errorHandler = require("./middlewares/errorHandler");
const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.use("/tickets", ticketRoutes);
app.use("/notifications", notificationRoutes);

app.get("/", (req, res) => {
  res.send("¡Bienvenido a la API RESTful!");
});

//Middleware Global
app.use(errorHandler);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
