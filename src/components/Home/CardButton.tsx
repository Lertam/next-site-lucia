"use client";
import { useRouter } from "next/navigation";
import { FC } from "react";

const CardButton: FC<{ text: string, link?:string }> = ({ text, link }) => {
  const router = useRouter();

  return (
    <button
      className={
        "bg-[#f9f2e9] p-1 text-center text-sm uppercase w-48 font-bold"
      }
      style={{ fontFamily: "OpenSans, sans-serif", letterSpacing: 1 }}
      onClick={() => {
        if(link) {
          router.push(link);
        }
      }}
    >
      {text}
    </button>
  );
};

export default CardButton;
