const videoGames = [];

const list = (req, res) => {
  res.render("videogames", { title: "Catálogo de Videojuegos", videoGames });
};

const save = (req, res) => {
  const { titulo, plataforma, genero, anio, desarrollador, calificacion } = req.body;

  videoGames.push({
    id: videoGames.length + 1,
    titulo,
    plataforma,
    genero,
    anio,
    desarrollador,
    calificacion,
    createdAt: new Date().toISOString()
  });

  res.redirect("/videogames");
};

module.exports = {
  list,
  save,
  videoGames
};
