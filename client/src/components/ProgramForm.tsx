import type { ReactNode } from "react";
import { useEffect, useState } from "react";

type ProgramData = {
  title: string;
  synopsis: string;
  poster: string;
  country: string;
  year: string | number;
  category_id: string | number;
};

interface ProgramFormProps {
  children: ReactNode;
  defaultValue: ProgramData;
  onSubmit: (program: ProgramData) => void;
}

type Category = {
  id: number;
  name: string;
};

function ProgramForm({ children, defaultValue, onSubmit }: ProgramFormProps) {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/categories`)
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) =>
        console.error("Erreur de chargement des catégories", err),
      );
  }, []);

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        const title = formData.get("title") as string;
        const synopsis = formData.get("synopsis") as string;
        const poster = formData.get("poster") as string;
        const country = formData.get("country") as string;
        const year = Number(formData.get("year"));
        const category_id = Number(formData.get("category_id"));

        onSubmit({
          title,
          synopsis,
          poster,
          country,
          year,
          category_id,
        });
      }}
      className="max-w-xl mx-auto mt-10 p-6 bg-white border border-purple-200 rounded-xl shadow-lg space-y-4"
    >
      <input
        type="text"
        name="title"
        placeholder="Titre"
        defaultValue={defaultValue.title}
        className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
      />
      <textarea
        name="synopsis"
        placeholder="Synopsis"
        defaultValue={defaultValue.synopsis}
        className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
        rows={4}
      />
      <input
        type="text"
        name="poster"
        placeholder="URL de l'affiche"
        defaultValue={defaultValue.poster}
        className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
      />
      <input
        type="text"
        name="country"
        placeholder="Pays"
        defaultValue={defaultValue.country}
        className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
      />
      <input
        type="number"
        name="year"
        placeholder="Année"
        defaultValue={defaultValue.year}
        className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
      />
      <div>
        <label htmlFor="category_id" className="block font-medium mb-1">
          Catégorie :
        </label>
        <select
          name="category_id"
          id="category_id"
          defaultValue={defaultValue.category_id || ""}
          required
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          <option value="" disabled>
            -- Choisir une catégorie --
          </option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        className="w-full py-2 px-4 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white font-semibold rounded-full shadow-md hover:brightness-110 hover:scale-105 transition-all duration-200"
      >
        {children}
      </button>
    </form>
  );
}

export default ProgramForm;
