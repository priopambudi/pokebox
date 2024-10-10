import React, { ReactNode, createContext, useContext, useState } from "react";
import { PokeDetailInterface } from "../interfaces/pokeInterface";

interface PokemonContextType {
  allPoke: PokeDetailInterface[];
  addData: (item: PokeDetailInterface[], fromSearch?: boolean) => void;
  addDataSearch: (item: PokeDetailInterface) => void;
  clearData: () => void;
  loading: boolean;
  error: any;
  setLoading: (loading: boolean) => void;
  setError: (error: any) => void;
}

const PokemonContext = createContext<PokemonContextType | null>(null);

export const PokemonProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [allPoke, setAllPoke] = useState<PokeDetailInterface[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);
  //   const [detailPoke, setDetailPoke] = useState<PokeDetailInterface | null>(
  //     null
  //   );

  const addData = (
    item: PokeDetailInterface[],
    fromSearch: boolean = false
  ) => {
    setAllPoke(fromSearch ? [...item] : [...allPoke, ...item]);
  };

  const addDataSearch = (item: PokeDetailInterface) => {
    setAllPoke([item]);
  };

  const clearData = () => {
    setAllPoke([]);
  };

  return (
    <PokemonContext.Provider
      value={{
        allPoke,
        addData,
        addDataSearch,
        clearData,
        loading,
        error,
        setLoading,
        setError,
      }}
    >
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
