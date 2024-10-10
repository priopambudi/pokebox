import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";
import { PokeDetailInterface } from "../interfaces/pokeInterface";

axios.defaults.baseURL = "https://pokeapi.co/api/v2";

export interface propsAxiosRequest extends AxiosRequestConfig {
  isGetAllDetail?: boolean;
}

const useAxios = (axiosParams: propsAxiosRequest) => {
  const [data, setData] = useState<PokeDetailInterface[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<AxiosError | unknown>(null);
  const [page, setPage] = useState<number>(0);
  const [loadingLoadMore, setLoadingLoadMore] = useState<boolean>(true);
  const controller = new AbortController();

  const fetchData = async (params: propsAxiosRequest) => {
    try {
      const res = await axios.request({
        ...params,
        signal: controller.signal,
      });
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

  useEffect(() => {
    fetchData(axiosParams);

    return () => controller.abort();
  }, [axiosParams]);

  const loadMore = () => {
    setLoadingLoadMore(true);
    let newParams = {
      ...axiosParams,
      params: {
        offset: page * 20,
        limit: 20,
      },
    };
    fetchData(newParams);
  };

  return { data, loading, error, loadMore, loadingLoadMore };
};

export default useAxios;
