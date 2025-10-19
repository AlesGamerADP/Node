// app/components/MovieCard.tsx

// Definimos los tipos de datos que recibirá el componente
interface MovieCardProps {
    title: string;
    year: string;
    poster: string;
    type: string;
  }
  
  export default function MovieCard({ title, year, poster, type }: MovieCardProps) {
    // Si el póster no está disponible, usamos una imagen por defecto
    const imageSrc = poster === "N/A" ? "https://via.placeholder.com/300x450.png?text=No+Image" : poster;
  
    return (
      <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-300">
        <img src={imageSrc} alt={`Poster of ${title}`} className="w-full h-96 object-cover" />
        <div className="p-4">
          <h3 className="text-xl font-bold text-white truncate">{title}</h3>
          <div className="flex justify-between items-center mt-2">
            <p className="text-gray-400">{year}</p>
            <span className="bg-indigo-600 text-white text-xs font-semibold px-2.5 py-0.5 rounded-full capitalize">{type}</span>
          </div>
        </div>
      </div>
    );
  }