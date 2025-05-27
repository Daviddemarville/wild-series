import { useEffect, useState } from "react";

interface Program {
  id: number;
  title: string;
  synopsis: string;
  poster: string;
  country: string;
  year: number;
}

const Programs = () => {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:3310/api/programs")
      .then((res) => {
        if (!res.ok) throw new Error("Erreur lors du chargement");
        return res.json();
      })
      .then((data) => setPrograms(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur : {error}</p>;

  return (
    <div className="bg-gray-700/80 p-4">
      <h1 className="flex justify-center text-2xl font-bold mb-4">
        Nos séries
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {programs.map((program) => (
          <div
            key={program.id}
            className="bg-gray-200 border rounded-lg p-4 shadow"
          >
            <img
              src={program.poster}
              alt={program.title}
              className="w-full h-auto mb-2 rounded"
            />
            <h2 className="text-xl text-gray-700 font-semibold">
              {program.title}
            </h2>
            <p className="text-sm text-gray-700">{program.synopsis}</p>
            <p className="text-sm text-gray-700">{program.country}</p>
            <p className="text-sm text-gray-700">{program.year}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Programs;
