import type { ReactNode } from "react";
import { useNavigate } from "react-router";

type ProgramDeleteFormProps = {
  id: number;
  children: ReactNode;
};

function ProgramDeleteForm({ id, children }: ProgramDeleteFormProps) {
  const navigate = useNavigate();

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();

        fetch(`${import.meta.env.VITE_API_URL}/api/programs/${id}`, {
          method: "delete",
        }).then((response) => {
          if (response.status === 204) {
            navigate("/programs");
          }
        });
      }}
      className="max-w-md mx-auto mt-8 p-4 bg-white rounded-xl border border-red-200 shadow-lg"
    >
      <button
        type="submit"
        className="w-full bg-gradient-to-r from-red-500 via-orange-400 to-pink-500 text-white font-semibold py-2 rounded-full shadow-md hover:brightness-110 hover:scale-105 transition-all duration-200"
      >
        {children}
      </button>
    </form>
  );
}

export default ProgramDeleteForm;
