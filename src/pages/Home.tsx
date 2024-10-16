import Card from "../components/Card";
import useAxios from "../hooks/useAxios";
import { getAllPoke } from "../api/poke";
import { usePokemonContext } from "../context/PokeContext";
import { useEffect } from "react";
import Button from "../components/Button";
import Loading from "../components/Loading";
import { PokeDetailInterface } from "../interfaces/pokeInterface";

const Home = () => {
  const { loadMore, loadingLoadMore, fetchData } = useAxios();
  const { allPoke, loading, error } = usePokemonContext();

  useEffect(() => {
    if (allPoke.length === 0) {
      fetchData(getAllPoke);
    }
  }, [allPoke.length]);

  const handleLoadMore = () => {
    loadMore(getAllPoke);
  };

  if (loading && !loadingLoadMore)
    return (
      <div className="flex justify-center mt-6">
        <Loading />
      </div>
    );

  if (error)
    return <p className="text-xl text-white font-bold">{error.data}</p>;

  return (
    <section>
      <div className="gap-3 items-center justify-center grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
        {allPoke.length > 0 &&
          allPoke.map((item: PokeDetailInterface) => (
            <Card data={item} key={item.id} />
          ))}
      </div>
      {loadingLoadMore ? (
        <div className="flex justify-center mt-6">
          <Loading />
        </div>
      ) : (
        <div className="flex justify-center mt-6">
          <Button
            onClick={handleLoadMore}
            className="bg-gradient-to-br from-[#56c6f8] to-[#5759fc] text-white px-4"
          >
            Load more
          </Button>
        </div>
      )}
    </section>
  );
};

export default Home;
