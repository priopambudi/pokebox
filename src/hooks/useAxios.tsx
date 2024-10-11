import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { useState } from "react";
import { usePokemonContext } from "../context/PokeContext";
import { PokeGeneralInterface } from "../interfaces/pokeInterface";
import { getEvolution, getPokeDetailById } from "../api/poke";

export interface propsAxiosRequest extends AxiosRequestConfig {
  isGetAllDetail?: boolean;
  isSearch?: boolean;
  loadMorePoke?: boolean;
}

const useAxios = () => {
  const [loadingLoadMore, setLoadingLoadMore] = useState<boolean>(false);
  const controller = new AbortController();

  const {
    setLoading,
    setError,
    allPoke,
    setAllPoke,
    page,
    setPage,
    setDetailPoke,
  } = usePokemonContext();

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
            const detailResponse = await axiosInstance(getPokeDetailById(id));
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
      setPage(page + 1);
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

  const fetchSPecies = async (params: propsAxiosRequest) => {
    setLoading(true);
    setError(null);

    try {
      const res = await axiosInstance({
        ...params,
        signal: controller.signal,
      });

      const [detailResponse, evolutionProcess] = await Promise.all([
        axiosInstance(getPokeDetailById(res.data.id)),
        axiosInstance(getEvolution(res.data.evolution_chain.url.split("/")[6])),
      ]);

      const pokemonDetail = detailResponse.data;

      const evolutionData = evolutionProcess.data;

      let newData = {
        detail: pokemonDetail,
        species: res.data,
        evolution: evolutionData,
      };
      setDetailPoke(newData);
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

  const fetchEvolution = async (params: propsAxiosRequest) => {
    setLoading(true);
    setError(null);
    const data: any = [];

    try {
      const res = await axiosInstance({
        ...params,
        signal: controller.signal,
      });

      data.push(res.data);
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

    return data;
  };

  return { loadMore, loadingLoadMore, fetchData, fetchSPecies, fetchEvolution };
};

export default useAxios;
