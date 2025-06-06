import { Link, NavLink, Outlet } from "react-router";
import background from "./assets/images/background.webp";
import "./App.css";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-gradient-to-r from-[#bc6ff1] via-[#e0aaff] to-[#c77dff] text-white shadow-md transition-all duration-300 relative z-20">
        <div className="p-4">
          <Link to="/">
            <h1 className="text-2xl md:text-4xl text-center font-bold hover:opacity-90 transition-opacity duration-200 drop-shadow-[0_0_6px_#bc6ff1]">
              Wild Series
            </h1>
          </Link>
        </div>

        <nav className="px-4 pb-2">
          <ul className="flex justify-end gap-6 drop-shadow-[0_0_4px_#bc6ff1] mr-6">
            <li>
              <NavLink
                to="/categories"
                className="hover:underline hover:text-gray-100 transition-colors duration-200"
              >
                Catégories
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/programs"
                className="hover:underline hover:text-gray-100 transition-colors duration-200"
              >
                Séries
              </NavLink>
            </li>
          </ul>
        </nav>

        {/* Reflet animé flou et lumineux global */}
        <div className="absolute inset-0 bg-white/10 blur-sm opacity-50 animate-pulse pointer-events-none" />
      </header>

      {/* Contenu principal */}
      {/* Section avec fond d'écran */}
      <div
        className="flex-grow bg-cover bg-center"
        style={{ backgroundImage: `url(${background})` }}
      >
        <main className="p-6 min-h-[90vh]">
          <Outlet />
        </main>

        <footer className=" bg-black/20 text-white text-center text-sm py-4">
          Développé par la&nbsp;
          <a
            href="https://www.wildcodeschool.com/"
            className="hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Wild Code School
          </a>
        </footer>
      </div>
    </div>
  );
}

export default App;
