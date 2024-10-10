import { FC } from "react";

const CardButton: FC<{ text: string }> = ({ text }) => {
  return (
    <button
      className={
        "bg-[#f9f2e9] p-1 text-center text-sm uppercase w-48 font-bold"
      }
      style={{ fontFamily: "OpenSans, sans-serif", letterSpacing: 1 }}
    >
      {text}
    </button>
  );
};

export default CardButton;
