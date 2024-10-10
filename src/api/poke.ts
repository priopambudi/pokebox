import { propsAxiosRequest } from "../hooks/useAxios";

const getAllPoke: propsAxiosRequest = {
  method: "GET",
  url: "/pokemon",
  isGetAllDetail: true,
};

const getPokeDetail = (id: number): propsAxiosRequest => ({
  method: "GET",
  url: `/pokemon/${id}`,
});

export { getAllPoke, getPokeDetail };
