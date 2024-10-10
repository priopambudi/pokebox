import { useEffect, useState } from "react";
import { getAllPoke, searchPoke } from "../api/poke";
import useAxios from "../hooks/useAxios";
import { usePokemonContext } from "../context/PokeContext";
import Button from "./Button";

const Search = () => {
  const [value, setValue] = useState<string>("");
  const { data, fetchData } = useAxios();
  const { addData, addDataSearch, clearData } = usePokemonContext();
  const [isInputTouched, setIsInputTouched] = useState<boolean>(false);

  useEffect(() => {
    if (data && value !== "") {
      addDataSearch(data);
    } else if (data && isInputTouched) {
      addData(data, true);
    }
  }, [data]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!isInputTouched) setIsInputTouched(true);

    if (value.trim() !== "") {
      fetchData(searchPoke(value));
    } else if (value === "") {
      fetchData(getAllPoke);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        placeholder="Type Poke name"
        onChange={(e) => setValue(e.target.value)}
        className="px-2 py-1 text-xs outline-none rounded-lg text-black"
      />
      <Button type={"submit"} className="py-0 line-clamp-1 text-base">
        Search
      </Button>
    </form>
  );
};

export default Search;
