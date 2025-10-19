'use client';

import { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard";
import MovieModal, { MovieDetails } from "../components/MovieModal";

interface Movie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

export default function OmdbHomePage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<MovieDetails | null>(null);

  const apiKey = process.env.NEXT_PUBLIC_OMDB_API_KEY;

  useEffect(() => {
    const fetchMovies = async () => {
      const res = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=marvel&page=1`);
      const data = await res.json();
      setMovies(data.Search || []);
    };

    fetchMovies();
  }, [apiKey]);

  const handleCardClick = async (imdbID: string) => {
    const res = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&i=${imdbID}&plot=full`);
    const data = await res.json();
    setSelectedMovie(data);
  };

  const closeModal = () => {
    setSelectedMovie(null);
  };

  return (
    <main className="bg-gray-900 min-h-screen p-8 text-white">
      <h1 className="text-4xl font-extrabold text-center mb-10">
        Películas Populares (OMDb)
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {movies.map((movie) => (
          <MovieCard
            key={movie.imdbID}
            title={movie.Title}
            year={movie.Year}
            poster={movie.Poster}
            type={movie.Type}
            onClick={() => handleCardClick(movie.imdbID)}
          />
        ))}
      </div>

      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={closeModal} />
      )}
    </main>
  );
}
