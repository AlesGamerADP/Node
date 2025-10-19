'use client';

import { useState, useEffect } from 'react';
import MovieModal, { type MovieDetails } from '../../components/MovieModal';

interface MovieSummary {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
}

export default function SearchPage() {
  // --- ESTADOS ---
  const [searchType, setSearchType] = useState<'general' | 'titleYear'>('general');

  // Estados para la búsqueda general
  const [generalQuery, setGeneralQuery] = useState('');
  const [movies, setMovies] = useState<MovieSummary[]>([]);

  // Estados para la búsqueda por Título y Año
  const [titleQuery, setTitleQuery] =useState('');
  const [yearQuery, setYearQuery] = useState('');

  // Estados compartidos
  const [selectedMovie, setSelectedMovie] = useState<MovieDetails | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // --- LÓGICA DE BÚSQUEDA ---

  // Búsqueda General (debounced)
  useEffect(() => {
    if (searchType !== 'general') return;
    const timer = setTimeout(() => {
      if (generalQuery.length > 2) {
        searchMovies(generalQuery);
      } else {
        setMovies([]);
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [generalQuery, searchType]);

  // Función para BÚSQUEDA GENERAL (&s=...)
  const searchMovies = async (searchQuery: string) => {
    setIsLoading(true);
    setError('');
    const apiKey = process.env.NEXT_PUBLIC_OMDB_API_KEY;
    try {
      const res = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${searchQuery}`);
      const data = await res.json();
      if (data.Response === "True") {
        const uniqueMovies = data.Search.filter((movie: MovieSummary, index: number, self: MovieSummary[]) =>
          index === self.findIndex((m: MovieSummary) => m.imdbID === movie.imdbID)
        );
        setMovies(uniqueMovies);
      } else {
        setError(data.Error);
        setMovies([]);
      }
    } catch (err) { setError("Error al conectar con el servidor."); }
    finally { setIsLoading(false); }
  };
  
  // Función para BÚSQUEDA POR TÍTULO Y AÑO (&t=...&y=...)
  const searchByTitleAndYear = async () => {
    if (!titleQuery) {
        setError("El campo de título es obligatorio.");
        return;
    }
    setIsLoading(true);
    setError('');
    setMovies([]); // Limpiamos la búsqueda general
    const apiKey = process.env.NEXT_PUBLIC_OMDB_API_KEY;
    try {
        const yearParam = yearQuery ? `&y=${yearQuery}` : '';
        const res = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&t=${titleQuery}${yearParam}`);
        const data = await res.json();
        if (data.Response === "True") {
            // Como devuelve un solo resultado detallado, lo mostramos en el modal directamente
            setSelectedMovie(data);
        } else {
            setError(data.Error);
        }
    } catch (err) { setError("Error al conectar con el servidor."); }
    finally { setIsLoading(false); }
  };

  // Función para obtener detalles (para la búsqueda general)
  const getMovieDetails = async (id: string) => {
    const apiKey = process.env.NEXT_PUBLIC_OMDB_API_KEY;
    const res = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&i=${id}`);
    const data = await res.json();
    setSelectedMovie(data);
  };

  // --- RENDERIZADO (JSX) ---
  return (
    <div className="bg-gray-900 min-h-screen p-8 text-white">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center mb-6">Busca una Película o Serie</h1>
        
        {/* Pestañas para cambiar de tipo de búsqueda */}
        <div className="flex justify-center mb-4 border-b border-gray-700">
            <button 
                onClick={() => setSearchType('general')}
                className={`px-4 py-2 text-lg font-medium ${searchType === 'general' ? 'border-b-2 border-indigo-500 text-white' : 'text-gray-400'}`}>
                Búsqueda General
            </button>
            <button 
                onClick={() => setSearchType('titleYear')}
                className={`px-4 py-2 text-lg font-medium ${searchType === 'titleYear' ? 'border-b-2 border-indigo-500 text-white' : 'text-gray-400'}`}>
                Por Título y Año
            </button>
        </div>

        {/* Contenido dinámico según la pestaña seleccionada */}
        {searchType === 'general' ? (
            <div>
                <input 
                    type="text"
                    value={generalQuery}
                    onChange={(e) => setGeneralQuery(e.target.value)}
                    placeholder="Escribe aquí (ej: Batman, Friends...)"
                    className="w-full p-4 bg-gray-800 rounded-lg"
                />
            </div>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input 
                    type="text"
                    value={titleQuery}
                    onChange={(e) => setTitleQuery(e.target.value)}
                    placeholder="Título de la película..."
                    className="md:col-span-2 w-full p-4 bg-gray-800 rounded-lg"
                />
                <input 
                    type="number"
                    value={yearQuery}
                    onChange={(e) => setYearQuery(e.target.value)}
                    placeholder="Año (opcional)"
                    className="w-full p-4 bg-gray-800 rounded-lg"
                />
                <button 
                    onClick={searchByTitleAndYear}
                    className="md:col-span-3 w-full p-4 bg-indigo-600 hover:bg-indigo-700 rounded-lg font-bold text-lg">
                    Buscar por Título
                </button>
            </div>
        )}

        {/* Resultados y errores */}
        {isLoading && <p className="text-center mt-8">Buscando...</p>}
        {error && <p className="text-center mt-8 text-red-500">{error}</p>}
        
        {/* Grid para resultados de búsqueda general */}
        {searchType === 'general' && movies.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8">
                {movies.map(movie => (
                    <div key={movie.imdbID} onClick={() => getMovieDetails(movie.imdbID)} className="bg-gray-800 rounded-lg overflow-hidden cursor-pointer transform hover:scale-105">
                        <img src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300x450.png?text=No+Image"} alt={`Poster of ${movie.Title}`} className="w-full h-80 object-cover" />
                        <div className="p-4">
                            <h3 className="font-bold truncate text-white">{movie.Title}</h3>
                            <p className="text-gray-400">{movie.Year}</p>
                        </div>
                    </div>
                ))}
            </div>
        )}
      </div>
      <MovieModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
    </div>
  );
}