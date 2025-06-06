import { useEffect, useState } from "react";
import { Link } from "react-router";

type Program = {
  id: number;
  title: string;
  poster: string;
};

function Home() {
  const [randomPrograms, setRandomPrograms] = useState<Program[]>([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/programs`)
      .then((res) => res.json())
      .then((programs: Program[]) => {
        const shuffled = [...programs].sort(() => 0.5 - Math.random());
        setRandomPrograms(shuffled.slice(0, 3));
      });
  }, []);

  return (
    <div className="flex flex-wrap gap-8 justify-center mt-8">
      {randomPrograms.map((program) => (
        <div
          key={program.id}
          className="bg-white border border-gray-300 rounded-lg shadow-md w-52 text-center p-4 hover:scale-105 transition-transform duration-300"
        >
          <Link to={`/programs/${program.id}`}>
            <img
              src={program.poster}
              alt={program.title}
              className="w-full h-auto rounded"
            />
          </Link>
          <h3 className="mt-4 text-lg font-semibold text-gray-800">
            <Link
              to={`/programs/${program.id}`}
              className="hover:text-purple-600 transition-colors"
            >
              {program.title}
            </Link>
          </h3>
        </div>
      ))}
    </div>
  );
}

export default Home;
