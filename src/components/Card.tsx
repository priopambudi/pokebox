import { Link, useNavigate } from "react-router-dom";

const Card = ({ data }: any) => {
  const navigate = useNavigate();

  const handleNavigate = (pokemon: any) => {
    navigate("/detail/" + pokemon.id, { state: { pokemon } }); // Mengirimkan state saat navigasi
  };

  return (
    <div
      onClick={() => handleNavigate(data)}
      id="card"
      className="rounded-md hover:scale-105 transition-all"
    >
      <div className="bg-darkGray px-2 py-5 rounded-md">
        <p className="text-white text-center mb-2 font-semibold text-xl">
          {data.id}
        </p>
        <figure className="flex items-center">
          <img
            src={data.sprites.other["official-artwork"].front_default}
            alt={data.name}
            width={100}
            className="mx-auto"
          />
        </figure>
        <p className="text-center text-white mt-4 text-xl">{data.name}</p>
        <div className="flex items-center justify-center gap-2 mx-auto mt-3">
          {data.types.map((item: any) => (
            <p
              key={item.slot}
              className="bg-gradient-to-br from-[#56c6f8] to-[#5759fc] text-white px-2 line-clamp-1 rounded-md"
            >
              {item.type.name}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Card;
