import React, { ReactNode, createContext, useContext, useState } from "react";
import { PokeDetailInterface } from "../interfaces/pokeInterface";

interface PokemonContextType {
  allPoke: PokeDetailInterface[];
  setAllPoke: (data: PokeDetailInterface[]) => void;
  loading: boolean;
  error: any;
  setLoading: (loading: boolean) => void;
  setError: (error: any) => void;
  page: number;
  setPage: (data: number) => void;
  detailPoke: any;
  setDetailPoke: (data: any) => void;
}

const PokemonContext = createContext<PokemonContextType | null>(null);

export const PokemonProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [allPoke, setAllPoke] = useState<PokeDetailInterface[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);
  const [page, setPage] = useState<number>(0);
  const [detailPoke, setDetailPoke] = useState<any>(null);

  return (
    <PokemonContext.Provider
      value={{
        allPoke,
        setAllPoke,
        loading,
        error,
        setLoading,
        setError,
        page,
        setPage,
        detailPoke,
        setDetailPoke,
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
