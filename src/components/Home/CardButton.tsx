"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FC } from "react";

const CardButton: FC<{
  variant?: "link" | "button";
  text: string;
  link?: string;
}> = ({ variant, text, link }) => {
  const router = useRouter();

  if (variant === "link") {
    if (!link) throw new Error("No link");
    return (
      <Link
        href={link}
        className={
          "bg-[#f9f2e9] p-1 text-center text-sm uppercase w-48 font-bold"
        }
        style={{ fontFamily: "OpenSans, sans-serif", letterSpacing: 1 }}
      >
        {text}
      </Link>
    );
  }
  return (
    <button
      className={
        "bg-[#f9f2e9] p-1 text-center text-sm uppercase w-48 font-bold"
      }
      style={{ fontFamily: "OpenSans, sans-serif", letterSpacing: 1 }}
      onClick={() => {
        if (link) {
          router.push(link);
        }
      }}
    >
      {text}
    </button>
  );
};

export default CardButton;
