import { useEffect, useState } from "react";
import { Link } from "react-router";

type Program = {
  id: number;
  title: string;
  poster: string;
};

function ProgramIndex() {
  const [programs, setPrograms] = useState<Program[]>([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/programs`)
      .then((response) => response.json())
      .then((data: Program[]) => {
        const sorted = [...data].sort((a, b) => a.title.localeCompare(b.title));
        setPrograms(sorted);
      });
  }, []);

  return (
    <div className="p-6">
      <Link
        to="/programs/new"
        className="inline-block mb-6 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full shadow hover:brightness-110 transition"
      >
        ➕ Ajouter une série
      </Link>

      <div className="flex flex-wrap gap-6">
        {programs.map((program) => (
          <Link
            key={program.id}
            to={`/programs/${program.id}`}
            className="w-[200px] bg-white border border-gray-300 rounded-lg p-4 text-center shadow hover:shadow-lg transition"
          >
            <img
              src={program.poster}
              alt={program.title}
              className="w-full h-auto rounded mb-2"
            />
            <h3 className="text-base font-semibold text-gray-800">
              {program.title}
            </h3>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default ProgramIndex;
