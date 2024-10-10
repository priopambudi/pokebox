import Card from "../components/Card";
import useAxios from "../hooks/useAxios";
import { getAllPoke } from "../api/poke";
import { usePokemonContext } from "../context/PokeContext";
import { useEffect } from "react";

const Home = () => {
  const { data, loading, error, loadMore, loadingLoadMore } =
    useAxios(getAllPoke);
  const { allPoke, addData } = usePokemonContext();

  useEffect(() => {
    if (data) {
      addData(data);
    }
  }, [data]);

  const handleLoadMore = () => {
    loadMore();
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  return (
    <section>
      <div className="gap-3 items-center justify-center grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
        {allPoke.length > 0 &&
          allPoke.map((item: any) => <Card data={item} key={item.name} />)}
        {loadingLoadMore ? (
          <p>Loading...</p>
        ) : (
          <button onClick={handleLoadMore}>Load More</button>
        )}
      </div>
    </section>
  );
};

export default Home;
