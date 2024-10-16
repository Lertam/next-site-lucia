"use client";

import { useRouter } from "next/navigation";
import { FC } from "react";

const BackLink: FC<{ href?: string }> = ({ href }) => {
  const router = useRouter();

  return (
    <a
      onClick={(ev) => {
        ev.preventDefault();
        if (href) {
          router.replace(href);
        } else {
          router.back();
        }
      }}
      className={"cursor-pointer absolute top-0"}
    >
      {`< Назад`}
    </a>
  );
};

export default BackLink;
