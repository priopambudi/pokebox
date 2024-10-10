import Card from "../components/Card";
import useAxios from "../hooks/useAxios";
import { getAllPoke } from "../api/poke";

const Home = () => {
  const { data, loading, error } = useAxios(getAllPoke);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  return (
    <section>
      <div className="gap-3 items-center justify-center grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
        {data.map((item: any) => (
          <Card data={item} key={item.id} />
        ))}
      </div>
    </section>
  );
};

export default Home;
