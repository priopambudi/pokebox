import { useLocation, useNavigate, useParams } from "react-router-dom";
import CardDetail from "../components/CardDetail";
import { Stat } from "../interfaces/pokeInterface";
import { useEffect } from "react";
import useAxios from "../hooks/useAxios";
import { getSpecies } from "../api/poke";
import { usePokemonContext } from "../context/PokeContext";
import Loading from "../components/Loading";

const Detail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const pokemon = location.state?.pokemon;
  const { fetchSPecies } = useAxios();
  const { name } = useParams();
  const { detailPoke, loading, error, setDetailPoke } = usePokemonContext();

  useEffect(() => {
    if (name) {
      fetchSPecies(getSpecies(name));
    }
  }, [pokemon, name]);

  const getEvolutionChain = (evolutionChain: any) => {
    const names: any = [];

    const traverseChain = (chain: any) => {
      if (chain.species) {
        names.push(chain.species.name);
      }

      if (chain.evolves_to) {
        chain.evolves_to.forEach((evo: any) => {
          traverseChain(evo);
        });
      }
    };
    traverseChain(evolutionChain.chain);

    return names;
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
          <button className="text-white" onClick={() => navigate(-1)}>
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
                    <p className="text-white">
                      {getEvolutionChain(detailPoke.evolution).join(" => ")}
                    </p>
                  </div>
                  {/* <div> */}
                  {/* <figure>
                      <img src={detailPoke.evolution.chain.species} alt="" />
                    </figure> */}
                  {/* </div> */}
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
