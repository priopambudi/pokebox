import { Link } from "react-router-dom";

export interface cardProps {
  name: string;
  imgurl: string;
  category: string[];
}
interface dataProps {
  data: cardProps;
}

const Card = ({ data }: dataProps) => {
  return (
    <Link
      to={"/"}
      id="card"
      className="rounded-md hover:scale-105 transition-all"
    >
      <div className="bg-darkGray px-2 py-5 rounded-md">
        <figure className="flex items-center">
          <img
            src={data.imgurl}
            alt={data.imgurl}
            width={100}
            className="mx-auto"
          />
        </figure>
        <p className="text-center text-white mt-4 text-xl">{data.name}</p>
      </div>
    </Link>
  );
};

export default Card;
