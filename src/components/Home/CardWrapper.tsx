"use client";
import { FC, PropsWithChildren, useState } from "react";

const CardWrapper: FC<PropsWithChildren<{ image: string; title: string }>> = ({
  children,
  image,
  title,
}) => {
  const [isHover, setIsHover] = useState<boolean>(false);
  let hoverStyles = {};
  if (isHover) {
    hoverStyles = {
      transform: "scale(1.5)",
    };
  }
  return (
    <div
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      className={
        "border flex flex-col justify-center align-middle w-full text-center border-foreground relative overflow-hidden"
      }
    >
      <div
        className={
          "w-full h-full absolute top-0 left-0 bg-cover bg-no-repeat bg-center z-0"
        }
        style={{
          backgroundImage: `linear-gradient(0deg, rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url("${image}")`,
          transition: "transform 500ms ease",
          transitionDuration: "3s",
          ...hoverStyles,
        }}
      ></div>
      <div className={"z-10 w-full h-full relative"}>
        <div
          className={
            "absolute top-1 text-center w-full md:w-auto md:top-7 md:left-7 text-white"
          }
          style={{ fontSize: "1rem", textShadow: "2px 2px 10px rgba(0,0,0,1)" }}
        >
          {title}
        </div>
        {children}
      </div>
    </div>
  );
};

export default CardWrapper;
