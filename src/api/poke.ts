import { propsAxiosRequest } from "../hooks/useAxios";

const getAllPoke: propsAxiosRequest = {
  method: "GET",
  url: "/pokemon",
  isGetDetail: true,
};

const getPokeDetail = (id: number): propsAxiosRequest => ({
  method: "GET",
  url: `/pokemon/${id}`,
});

export { getAllPoke, getPokeDetail };
