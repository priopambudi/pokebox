import React, { ReactNode, createContext, useContext, useState } from "react";
import { PokeDetailInterface } from "../interfaces/pokeInterface";

interface PokemonContextType {
  allPoke: PokeDetailInterface[];
  addData: (item: PokeDetailInterface[]) => void;
}

const PokemonContext = createContext<PokemonContextType | null>(null);

export const PokemonProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [allPoke, setAllPoke] = useState<PokeDetailInterface[]>([]);
  //   const [detailPoke, setDetailPoke] = useState<PokeDetailInterface | null>(
  //     null
  //   );

  const addData = (item: PokeDetailInterface[]) => {
    setAllPoke([...allPoke, ...item]);
  };

  return (
    <PokemonContext.Provider value={{ allPoke, addData }}>
      {children}
    </PokemonContext.Provider>
  );
};

export const usePokemonContext = () => {
  const context = useContext(PokemonContext);
  if (!context) {
    throw new Error("usePokemonContext must be used within a PokemonProvider");
  }

  return context;
};
