// app/omdb/page.tsx
import MovieCard from "../components/MovieCard"; // Ruta correcta

interface Movie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

// ✅ Función SSR para obtener las películas populares
async function getPopularMovies() {
  const apiKey = process.env.NEXT_PUBLIC_OMDB_API_KEY;
  const res = await fetch(
    `https://www.omdbapi.com/?apikey=${apiKey}&s=marvel&page=1`,
    { cache: "no-store" } // aseguras que sea SSR dinámico
  );

  if (!res.ok) {
    throw new Error("Error al obtener las películas");
  }

  const data = await res.json();
  return data.Search || [];
}

export default async function OmdbHomePage() {
  const movies: Movie[] = await getPopularMovies();

  // ✅ URL de imagen por defecto (placeholder)
  const fallbackPoster =
    "https://via.placeholder.com/300x445?text=Sin+Imagen";

  return (
    <main className="bg-gray-900 min-h-screen p-8 text-white">
      <h1 className="text-4xl font-extrabold text-center mb-10">
        Películas Populares (OMDb)
      </h1>

      {/* GRID de películas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {movies.map((movie) => {
          // ✅ Si el poster es "N/A", usamos la imagen de fallback
          const poster =
            movie.Poster && movie.Poster !== "N/A"
              ? movie.Poster
              : fallbackPoster;

          return (
            <MovieCard
              key={movie.imdbID}
              title={movie.Title}
              year={movie.Year}
              poster={poster}
              type={movie.Type}
            />
          );
        })}
      </div>
    </main>
  );
}
