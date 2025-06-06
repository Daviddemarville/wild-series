import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";

import ProgramDeleteForm from "../components/ProgramDeleteForm";

type Program = {
  id: number;
  title: string;
  synopsis: string;
  poster: string;
  country: string;
  year: number;
  category_id: number;
};

function ProgramDetail() {
  const { id } = useParams();
  const [program, setProgram] = useState<null | Program>(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/programs/${id}`)
      .then((response) => response.json())
      .then((data: Program) => {
        setProgram(data);
      });
  }, [id]);

  return (
    program && (
      <div className="bg-white rounded-xl shadow-md p-6 max-w-xl mx-auto">
        <h1 className="text-3xl font-bold text-purple-700 mb-4 text-center">
          {program.title}
        </h1>

        <img
          src={program.poster}
          alt={program.title}
          className="w-52 h-auto mx-auto rounded shadow mb-6"
        />

        <div className="space-y-2 text-gray-800">
          <p>
            <strong className="text-purple-600">Pays :</strong>{" "}
            {program.country}
          </p>
          <p>
            <strong className="text-purple-600">Année :</strong> {program.year}
          </p>
          <p>
            <strong className="text-purple-600">Synopsis :</strong>{" "}
            {program.synopsis}
          </p>
        </div>

        <div className="mt-6 flex justify-between">
          <Link
            to={`/programs/${program.id}/edit`}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Modifier
          </Link>
          <ProgramDeleteForm id={program.id}>
            <button
              type="button"
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
            >
              Supprimer
            </button>
          </ProgramDeleteForm>
        </div>
      </div>
    )
  );
}

export default ProgramDetail;
