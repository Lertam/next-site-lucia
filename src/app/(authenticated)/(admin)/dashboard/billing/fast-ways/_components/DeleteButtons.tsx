"use client";
import { FC } from "react";
import { deleteFastWay } from "../_actions";
import { useRouter } from "next/navigation";

const DeleteButtons: FC<{ id: string }> = ({ id }) => {
  const router = useRouter();
  return (
    <div className={"mt-4 flex gap-4 justify-stretch"}>
      <button
        className={"bg-foreground text-white uppercase px-4 py-2"}
        onClick={() => router.back()}
      >
        Нет
      </button>
      <button
        className={"bg-red-800 text-white uppercase px-4 py-2"}
        onClick={async () => {
          await deleteFastWay(id);
        }}
      >
        Да
      </button>
    </div>
  );
};

export default DeleteButtons;
