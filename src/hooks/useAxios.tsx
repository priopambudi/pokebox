import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";
import { usePokemonContext } from "../context/PokeContext";

export interface propsAxiosRequest extends AxiosRequestConfig {
  isGetAllDetail?: boolean;
  isSearch?: boolean;
}

type PokeData<T> = T | null;

const useAxios = () => {
  const [data, setData] = useState<PokeData<any>>(null);
  const [page, setPage] = useState<number>(0);
  const [loadingLoadMore, setLoadingLoadMore] = useState<boolean>(true);
  const controller = new AbortController();

  const { setLoading, setError } = usePokemonContext();

  const axiosInstance = axios.create({
    baseURL: "https://pokeapi.co/api/v2",
  });

  const fetchData = async (params: propsAxiosRequest) => {
    setLoading(true);
    setError(null);

    try {
      const res = await axiosInstance({
        ...params,
        signal: controller.signal,
      });
      if (params.isSearch) {
        setData(null);
      }

      if (params.isGetAllDetail) {
        const pokemonDetails = await Promise.all(
          res.data.results.map(async (pokemon: any) => {
            const detailResponse = await axios.get(pokemon.url);
            return detailResponse.data;
          })
        );
        setData(pokemonDetails);
      } else {
        setData(res.data);
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
    let newParams = {
      ...params,
      params: {
        offset: page * 20,
        limit: 20,
      },
    };
    fetchData(newParams);
  };

  useEffect(() => {
    const source = new AbortController();

    return () => {
      source.abort();
    };
  }, []);

  return { data, loadMore, loadingLoadMore, fetchData };
};

export default useAxios;
