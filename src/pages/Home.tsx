import Card, { cardProps } from "../components/Card";

const Home = () => {
  const data: cardProps[] = [
    {
      imgurl:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/21.png",
      name: "Name",
      category: ["Racun", "Daun"],
    },
    {
      imgurl:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/21.png",
      name: "Name 2",
      category: ["Api"],
    },
    {
      imgurl:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/21.png",
      name: "Name 2",
      category: ["Api"],
    },
    {
      imgurl:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/21.png",
      name: "Name 2",
      category: ["Api"],
    },
    {
      imgurl:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/21.png",
      name: "Name 2",
      category: ["Api"],
    },
    {
      imgurl:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/21.png",
      name: "Name 2",
      category: ["Api"],
    },
  ];

  return (
    <section>
      <div className="gap-3 items-center justify-center grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
        {data.map((item, i) => (
          <Card data={item} key={i} />
        ))}
      </div>
    </section>
  );
};

export default Home;
