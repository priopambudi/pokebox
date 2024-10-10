import { ReactNode } from "react";

interface ButtonInterface {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit";
}

const Button = ({
  children,
  onClick,
  className,
  type = "button",
}: ButtonInterface) => {
  let cls =
    "px-2 py-1 bg-white rounded-lg border-none hover:scale-105 transition-all";

  if (className) {
    cls += ` ${className}`;
  }

  return (
    <button className={cls} onClick={onClick} type={type}>
      {children}
    </button>
  );
};

export default Button;
