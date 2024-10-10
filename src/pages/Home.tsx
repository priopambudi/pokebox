import Card from "../components/Card";
import useAxios from "../hooks/useAxios";
import { getAllPoke } from "../api/poke";
import { usePokemonContext } from "../context/PokeContext";
import { useEffect } from "react";
import Button from "../components/Button";
import Loading from "../components/Loading";

const Home = () => {
  const { data, loading, error, loadMore, loadingLoadMore, fetchData } =
    useAxios();
  const { allPoke, addData } = usePokemonContext();

  useEffect(() => {
    fetchData(getAllPoke);
  }, []);

  useEffect(() => {
    if (data) {
      addData(data);
    }
  }, [data]);

  const handleLoadMore = () => {
    loadMore(getAllPoke);
  };

  if (loading)
    return (
      <div className="flex justify-center mt-6">
        <Loading />
      </div>
    );
  if (error) return <p>Error</p>;

  return (
    <section>
      <div className="gap-3 items-center justify-center grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
        {allPoke.length > 0 &&
          allPoke.map((item: any) => <Card data={item} key={item.id} />)}
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
