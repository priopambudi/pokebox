import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";
import { PokeDetailInterface } from "../interfaces/pokeInterface";

export interface propsAxiosRequest extends AxiosRequestConfig {
  isGetAllDetail?: boolean;
  isSearch?: boolean;
}

type PokeData<T> = T | null;

const useAxios = () => {
  const [data, setData] = useState<PokeData<any>>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<AxiosError | unknown>(null);
  const [page, setPage] = useState<number>(0);
  const [loadingLoadMore, setLoadingLoadMore] = useState<boolean>(true);
  const controller = new AbortController();

  const axiosInstance = axios.create({
    baseURL: "https://pokeapi.co/api/v2",
  });

  const fetchData = async (params: propsAxiosRequest) => {
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
        setError(error);
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
    const source = axios.CancelToken.source();

    return () => {
      source.cancel("Component unmounted: Request cancelled.");
    };
  }, []);

  return { data, loading, error, loadMore, loadingLoadMore, fetchData };
};

export default useAxios;
