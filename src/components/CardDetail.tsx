import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
}

const CardDetail = ({ children }: CardProps) => {
  return (
    <div id="card-detail" className="rounded-md">
      <div className="bg-darkGray px-2 py-5 rounded-md">{children}</div>
    </div>
  );
};

export default CardDetail;
