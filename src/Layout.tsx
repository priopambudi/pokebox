import { Outlet } from "react-router-dom";
import { PokemonProvider } from "./context/PokeContext";

const Layout = () => {
  return (
    <PokemonProvider>
      <header className="sticky top-0 w-full py-3 px-3 sm:px-0 bg-blur">
        <nav className="container px-4 py-3 mx-auto bg-darkGray text-lg rounded-lg text-white">
          Pokebox
        </nav>
      </header>

      <main className="container px-4 mx-auto">
        <Outlet />
      </main>

      <footer className="my-4 px-3 sm:px-3">
        <div className="container px-4 py-3 mx-auto bg-darkGray rounded-lg">
          <p className="text-center text-white">© 2024 Pokebox</p>
        </div>
      </footer>
    </PokemonProvider>
  );
};

export default Layout;
