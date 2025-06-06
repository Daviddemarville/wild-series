import { useEffect, useState } from "react";
import { Link } from "react-router";

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

function CategoryIndex() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [programs, setPrograms] = useState<Program[]>([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/categories`)
      .then((res) => res.json())
      .then((data: Category[]) => {
        const sorted = [...data].sort((a, b) => a.name.localeCompare(b.name));
        setCategories(sorted);
      });

    fetch(`${import.meta.env.VITE_API_URL}/api/programs`)
      .then((res) => res.json())
      .then((data: Program[]) => {
        const sorted = [...data].sort((a, b) => a.title.localeCompare(b.title));
        setPrograms(sorted);
      });
  }, []);

  return (
    <div className="relative z-10 p-6">
      <Link
        to="/categories/new"
        className="inline-block mb-6 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full shadow hover:brightness-110 transition"
      >
        ➕ Ajouter une catégorie
      </Link>

      <div className="flex flex-wrap gap-8">
        {categories.map((category) => (
          <div
            key={category.id}
            className="w-full bg-white/80 border border-gray-200 rounded-xl p-6 shadow-lg"
          >
            <Link to={`/categories/${category.id}`}>
              <h2 className="text-xl font-semibold mb-4 text-purple-600 hover:underline">
                {category.name}
              </h2>
            </Link>

            <div className="flex flex-wrap gap-4">
              {programs
                .filter((p) => p.category_id === category.id)
                .map((program) => (
                  <Link
                    key={program.id}
                    to={`/programs/${program.id}`}
                    className="w-[180px] bg-white border border-gray-300 rounded-md p-2 text-center shadow-md hover:shadow-lg transition"
                  >
                    <img
                      src={program.poster}
                      alt={program.title}
                      className="w-full h-auto rounded"
                    />
                    <h4 className="mt-2 text-sm font-medium text-gray-800">
                      {program.title}
                    </h4>
                  </Link>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryIndex;
