'use client';
export interface MovieDetails {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  imdbRating: string;
}

interface ModalProps {
  movie: MovieDetails | null;
  onClose: () => void;
}

export default function MovieModal({ movie, onClose }: ModalProps) {
  if (!movie) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50 p-4">
      <div className="bg-gray-800 rounded-lg shadow-xl w-full max-w-4xl max-h-full overflow-y-auto relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-white text-3xl font-bold">&times;</button>
        
        <div className="flex flex-col md:flex-row">
          <img src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/400x600.png?text=No+Image"} alt={`Poster of ${movie.Title}`} className="w-full md:w-1/3 h-auto object-cover rounded-l-lg" />
          <div className="p-8 text-white">
            <h2 className="text-3xl font-bold mb-2">{movie.Title} ({movie.Year})</h2>
            <p className="text-gray-400 mb-4">{movie.Genre} &middot; {movie.Runtime}</p>
            <div className="flex items-center mb-4">
              <span className="bg-yellow-500 text-black font-bold px-3 py-1 rounded-md mr-4">IMDb: {movie.imdbRating}</span>
              <span className="border border-gray-500 px-3 py-1 rounded-md">{movie.Rated}</span>
            </div>
            <p className="mb-6">{movie.Plot}</p>
            <p><strong className="text-gray-400">Director:</strong> {movie.Director}</p>
            <p><strong className="text-gray-400">Actores:</strong> {movie.Actors}</p>
            <p><strong className="text-gray-400">Premios:</strong> {movie.Awards}</p>
          </div>
        </div>
      </div>
    </div>
  );
}