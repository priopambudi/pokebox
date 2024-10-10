import { propsAxiosRequest } from "../hooks/useAxios";

const getAllPoke: propsAxiosRequest = {
  method: "GET",
  url: "/api/pokemon",
  isGetAllDetail: true,
};

const getPokeDetail = (id: string): propsAxiosRequest => ({
  method: "GET",
  url: `/api/pokemon/${id}`,
});

const searchPoke = (name: string): propsAxiosRequest => ({
  method: "GET",
  url: `/api/pokemon/${name}`,
  isSearch: true,
});

export { getAllPoke, getPokeDetail, searchPoke };
