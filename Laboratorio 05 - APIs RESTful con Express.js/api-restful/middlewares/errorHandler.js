function errorHandler(err, req, res, next) {
    console.log("Ruta que falló:", req.originalUrl);
    console.log("Método:", req.method);

    res.status(err.status || 500).json({
      success: false,
      message: err.message || "Error interno del servidor",
      body: process.env.NODE_ENV === "development" ? req.body : undefined,
    });

}
  
module.exports = errorHandler;
  