import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { useState } from "react";
import { usePokemonContext } from "../context/PokeContext";
import { PokeGeneralInterface } from "../interfaces/pokeInterface";
import { getPokeDetail } from "../api/poke";

export interface propsAxiosRequest extends AxiosRequestConfig {
  isGetAllDetail?: boolean;
  isSearch?: boolean;
  loadMorePoke?: boolean;
}

const useAxios = () => {
  const [page, setPage] = useState<number>(0);
  const [loadingLoadMore, setLoadingLoadMore] = useState<boolean>(true);
  const controller = new AbortController();

  const { setLoading, setError, allPoke, setAllPoke } = usePokemonContext();

  const axiosInstance = axios.create();

  const fetchData = async (params: propsAxiosRequest) => {
    setLoading(true);
    setError(null);

    try {
      const res = await axiosInstance({
        ...params,
        signal: controller.signal,
      });

      if (params.isGetAllDetail) {
        const pokemonDetails = await Promise.all(
          res.data.results.map(async (pokemon: PokeGeneralInterface) => {
            const id = pokemon.url.split("/")[6];
            const detailResponse = await axiosInstance(getPokeDetail(id));
            return detailResponse.data;
          })
        );
        if (params.loadMorePoke) {
          setAllPoke([...allPoke, ...pokemonDetails]);
        } else {
          setAllPoke(pokemonDetails);
        }
      } else {
        params.isSearch ? setAllPoke([res.data]) : setAllPoke(res.data);
      }
      setPage((prev) => prev + 1);
    } catch (error: AxiosError | unknown) {
      if (axios.isAxiosError(error)) {
        setError(error.response);
      } else {
        setError(error);
      }
    } finally {
      setLoading(false);
      setLoadingLoadMore(false);
    }
  };

  const loadMore = (params: propsAxiosRequest) => {
    setLoadingLoadMore(true);
    let newParams: propsAxiosRequest = {
      ...params,
      params: {
        offset: page * 20,
        limit: 20,
      },
      loadMorePoke: true,
    };
    fetchData(newParams);
  };

  return { loadMore, loadingLoadMore, fetchData };
};

export default useAxios;
