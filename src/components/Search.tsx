import { useState } from "react";
import { getAllPoke, searchPoke } from "../api/poke";
import useAxios from "../hooks/useAxios";
import Button from "./Button";

import close from "../assets/img/cross.png";

const Search = () => {
  const [value, setValue] = useState<string>("");
  const { fetchData } = useAxios();
  const [isInputTouched, setIsInputTouched] = useState<boolean>(false);

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
      <div className="relative">
        <input
          type="text"
          placeholder="Type Poke name"
          onChange={(e) => setValue(e.target.value)}
          className="pl-3 pr-5 py-1 text-xs outline-none rounded-lg text-black h-full"
          value={value}
        />
        {value.trim() && (
          <img
            src={close}
            alt="close icon"
            width={16}
            className="absolute top-0 translate-y-1/2 right-2 cursor-pointer"
            onClick={() => {
              fetchData(getAllPoke);
              setValue("");
            }}
          />
        )}
      </div>
      <Button type={"submit"} className="py-0 line-clamp-1 text-base">
        Search
      </Button>
    </form>
  );
};

export default Search;
