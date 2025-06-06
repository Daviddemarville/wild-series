import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";

import CategoryDeleteForm from "../components/CategoryDeleteForm";

type Program = {
  id: number;
  title: string;
  poster: string;
  category_id: number;
};

type Category = {
  id: number;
  name: string;
};

function CategoryDetail() {
  const { id } = useParams();
  const [category, setCategory] = useState<null | Category>(null);
  const [programs, setPrograms] = useState<Program[]>([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/categories/${id}`)
      .then((res) => res.json())
      .then((data) => setCategory(data));

    fetch(`${import.meta.env.VITE_API_URL}/api/programs`)
      .then((res) => res.json())
      .then((data: Program[]) => {
        const filtered = data
          .filter((p) => p.category_id === Number(id))
          .sort((a, b) => a.title.localeCompare(b.title));
        setPrograms(filtered);
      });
  }, [id]);

  return (
    category && (
      <div className="p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
          <h1 className="text-3xl font-bold text-purple-700">
            {category.name}
          </h1>
          <div className="mt-4 sm:mt-0 flex gap-4">
            <Link
              to={`/categories/${category.id}/edit`}
              className="bg-yellow-400 text-white px-4 py-2 rounded hover:brightness-110 transition"
            >
              ✏️ Modifier
            </Link>
            <CategoryDeleteForm id={category.id}>
              <button
                type="button"
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
              >
                🗑️ Supprimer
              </button>
            </CategoryDeleteForm>
          </div>
        </div>

        <h2 className="text-xl font-semibold mt-6 mb-4">Séries associées :</h2>

        {programs.length > 0 ? (
          <div className="flex flex-wrap gap-6">
            {programs.map((program) => (
              <Link
                key={program.id}
                to={`/programs/${program.id}`}
                className="w-[180px] bg-white border border-gray-300 rounded-lg p-3 shadow hover:shadow-lg transition text-center"
              >
                <img
                  src={program.poster}
                  alt={program.title}
                  className="w-full rounded"
                />
                <h4 className="mt-2 font-medium text-gray-800">
                  {program.title}
                </h4>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-gray-600 italic">
            Aucune série pour cette catégorie.
          </p>
        )}
      </div>
    )
  );
}

export default CategoryDetail;
