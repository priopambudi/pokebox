import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";

axios.defaults.baseURL = "https://pokeapi.co/api/v2";

export interface propsAxiosRequest extends AxiosRequestConfig {
  isGetDetail?: boolean;
}

const useAxios = (axiosParams: propsAxiosRequest) => {
  const [data, setData] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<AxiosError | unknown>(null);
  const controller = new AbortController();

  useEffect(() => {
    const fetchData = async (params: propsAxiosRequest) => {
      setLoading(true);

      try {
        const res = await axios.request({
          ...params,
          signal: controller.signal,
        });
        if (params.isGetDetail) {
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
      } catch (error: AxiosError | unknown) {
        if (axios.isAxiosError(error)) {
          setError(error);
        } else {
          setError(error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData(axiosParams);

    return () => controller.abort();
  }, [axiosParams]);

  return { data, loading, error };
};

export default useAxios;
