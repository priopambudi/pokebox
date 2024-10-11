import { useNavigate } from "react-router-dom";
import Search from "./Search";
import { usePokemonContext } from "../context/PokeContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { setDetailPoke } = usePokemonContext();

  const goToHome = () => {
    navigate("/");
    setDetailPoke(null);
  };
  return (
    <header className="sticky top-0 w-full py-3 px-3 sm:px-0 bg-blur z-50">
      <nav className="container px-4 py-4 mx-auto bg-darkGray text-lg rounded-lg flex justify-between">
        <h2
          className="text-white line-clamp-1 cursor-pointer"
          onClick={goToHome}
        >
          Pokebox
        </h2>
        <Search />
      </nav>
    </header>
  );
};

export default Navbar;
