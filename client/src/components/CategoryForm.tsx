import type { ReactNode } from "react";

type CategoryData = {
  name: string;
};

interface CategoryFormProps {
  children: ReactNode;
  defaultValue: CategoryData;
  onSubmit: (category: CategoryData) => void;
}

function CategoryForm({ children, defaultValue, onSubmit }: CategoryFormProps) {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        const name = formData.get("name") as string;

        onSubmit({
          name,
        });
      }}
      className="max-w-md mx-auto mt-12 p-6 bg-white rounded-3xl shadow-xl border-4 border-dashed border-purple-300"
    >
      <input
        type="text"
        name="name"
        defaultValue={defaultValue.name}
        placeholder="Nom de la catégorie"
        className="w-full px-4 py-2 mb-4 rounded-full border border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
      />
      <button
        type="submit"
        className="w-full bg-gradient-to-r from-[#bc6ff1] via-[#e0aaff] to-[#c77dff] text-white font-semibold py-2 rounded-full shadow-md hover:brightness-110 transition"
      >
        {children}
      </button>
    </form>
  );
}

export default CategoryForm;
