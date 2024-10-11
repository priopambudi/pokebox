import { useNavigate, useParams } from "react-router-dom";
import CardDetail from "../components/CardDetail";
import { Stat } from "../interfaces/pokeInterface";
import { useEffect, useState } from "react";
import useAxios from "../hooks/useAxios";
import { getSpecies, searchPoke } from "../api/poke";
import { usePokemonContext } from "../context/PokeContext";
import Loading from "../components/Loading";

const Detail = () => {
  const navigate = useNavigate();
  const { fetchSPecies, fetchEvolution } = useAxios();
  const { name } = useParams();
  const { detailPoke, loading, error, setDetailPoke } = usePokemonContext();
  const [evolution, setEvolution] = useState<any>(null);

  useEffect(() => {
    if (name) {
      fetchSPecies(getSpecies(name));
    }
  }, [name]);

  useEffect(() => {
    if (detailPoke) {
      getEvolutionChain(detailPoke.evolution);
    }
  }, [detailPoke]);

  const getEvolutionChain = async (evolutionChain: any) => {
    const datas: any = [];

    // Fungsi `traverseChain` harus mengembalikan Promise
    const traverseChain = async (chain: any) => {
      if (chain.species) {
        const data = await fetchEvolution(searchPoke(chain.species.name));
        datas.push(...data);
      }

      if (chain.evolves_to && chain.evolves_to.length > 0) {
        // Gunakan `map` untuk memanggil `traverseChain` dan tunggu semua dengan `Promise.all`
        await Promise.all(
          chain.evolves_to.map((evo: any) => traverseChain(evo))
        );
      }
    };

    await traverseChain(evolutionChain.chain);

    setEvolution(datas);
  };

  if (loading)
    return (
      <div className="flex justify-center mt-6">
        <Loading />
      </div>
    );

  if (error)
    return <p className="text-xl text-white font-bold">{error.data}</p>;

  return (
    <div>
      {detailPoke && (
        <>
          <button
            className="text-white"
            onClick={() => {
              navigate(-1);
              setDetailPoke(null);
            }}
          >
            Back
          </button>
          <div className="grid grid-cols-1 md:grid-cols-2 mt-5 gap-4">
            <CardDetail>
              <p className="text-center text-white mt-4 uppercase text-3xl">
                {detailPoke.detail.name}
              </p>
              <figure className="flex items-center">
                <img
                  src={
                    detailPoke.detail.sprites.other?.["official-artwork"]
                      .front_default
                  }
                  alt={detailPoke.detail.name}
                  className="mx-auto w-full md:w-8/12"
                />
              </figure>
            </CardDetail>
            <div className="flex flex-col gap-2">
              <CardDetail>
                <h3 className="text-white text-center mb-3">Statistik</h3>
                {detailPoke.detail &&
                  detailPoke.detail.stats.map((stat: Stat) => (
                    <div
                      key={stat.stat.name}
                      className="px-3 font-thin flex items-center gap-3"
                    >
                      <p className="text-white min-w-max">{stat.stat.name}:</p>
                      <div className="relative w-full h-3 border">
                        <div
                          className="absolute top-0 bottom-0 left-0 bg-green-500"
                          style={{
                            width: `${
                              stat.base_stat > 100 ? 100 : stat.base_stat
                            }%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
              </CardDetail>
              <CardDetail>
                <h3 className="text-white text-center mb-3">Evolusi</h3>
                <div className="flex items-center justify-center">
                  <div>
                    <p className="text-white">{}</p>
                  </div>
                  {evolution &&
                    evolution.map((item: any, i: number) => (
                      <div
                        key={item.id}
                        className={`evolution-${i + 1} relative`}
                      >
                        <figure className="w-8/12 mx-auto">
                          <img
                            src={
                              item.sprites.other["official-artwork"]
                                .front_default
                            }
                            alt={item.name}
                            className="w-full"
                          />
                        </figure>
                        <p className="text-white text-center">{item.name}</p>
                      </div>
                    ))}
                </div>
              </CardDetail>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Detail;
