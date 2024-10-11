import { propsAxiosRequest } from "../hooks/useAxios";

const getAllPoke: propsAxiosRequest = {
  method: "GET",
  url: "/api/pokemon",
  isGetAllDetail: true,
};

const getPokeDetailById = (id: string): propsAxiosRequest => ({
  method: "GET",
  url: `/api/pokemon/${id}`,
});

const searchPoke = (name: string): propsAxiosRequest => ({
  method: "GET",
  url: `/api/pokemon/${name}`,
  isSearch: true,
});

const getSpecies = (name: string): propsAxiosRequest => ({
  method: "GET",
  url: `/api/pokemon-species/${name}`,
});

const getEvolution = (id: string): propsAxiosRequest => ({
  method: "GET",
  url: `/api/evolution-chain/${id}`,
});

export { getAllPoke, getPokeDetailById, searchPoke, getSpecies, getEvolution };
