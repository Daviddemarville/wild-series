import { useNavigate } from "react-router";
import ProgramForm from "../components/ProgramForm";

function ProgramNew() {
  const navigate = useNavigate();

  const newProgram = {
    title: "",
    synopsis: "",
    poster: "",
    country: "",
    year: "",
    category_id: "",
  };

  return (
    <ProgramForm
      defaultValue={newProgram}
      onSubmit={(programData) => {
        fetch(`${import.meta.env.VITE_API_URL}/api/programs`, {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(programData),
        })
          .then((response) => response.json())
          .then((data) => {
            navigate(`/programs/${data.id}`);
          });
      }}
    >
      Ajouter
    </ProgramForm>
  );
}

export default ProgramNew;
