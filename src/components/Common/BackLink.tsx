"use client";

import { useRouter } from "next/navigation";

const BackLink = () => {
  const router = useRouter();

  return (
    <a
      onClick={(ev) => {
        ev.preventDefault();
        router.back();
      }}
      className={"cursor-pointer absolute top-0"}
    >
      {`< Назад`}
    </a>
  );
};

export default BackLink;
