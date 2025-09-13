const express = require("express");
const app = express();
const path = require("path");

app.set("view engine","ejs");
app.set("views", path.join (__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname,"public")));
app.use((req, res, next) => {
    res.status(404).render('notFound', { url: req.originalUrl });
  });

const mainRoutes = require("./routes/mainRoutes");
app.use("/",mainRoutes)
  
const PORT = 3000;
app.listen(PORT,() => console.log(`Servidor en http://localhost:${PORT}`))