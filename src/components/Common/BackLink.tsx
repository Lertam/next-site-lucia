"use client";

import { ArrowLongLeftIcon } from "@heroicons/react/24/outline";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FC } from "react";

const BackLink: FC<{ href?: string }> = ({ href }) => {
  const router = useRouter();
  const pathname = usePathname();

  const params = useSearchParams();

  return (
    <a
      onClick={(ev) => {
        ev.preventDefault();
        const step = Number(params.get("step"));
        if (step) {
          const newParams = new URLSearchParams(params);
          console.log(step);
          if (step > 1) {
            newParams.set("step", String(step - 1));
          } else {
            newParams.delete("step");
          }
          console.log("set step", newParams.get("step"));
          router.replace(`${pathname}?${newParams.toString()}`);
          return;
        }
        if (href) {
          router.replace(href);
        } else {
          router.back();
        }
      }}
      className={"cursor-pointer absolute top-0 flex"}
    >
      <ArrowLongLeftIcon className={"w-5 mr-2 text-foreground"} />
      <span>Назад</span>
    </a>
  );
};

export default BackLink;
