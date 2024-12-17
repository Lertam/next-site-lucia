"use server";
import { getAuth } from "@/features/auth/queries/get-auth";
import { NewsComment, User } from "@prisma/client";
import { FC } from "react";
import Image from "next/image";
import { deleteComment } from "../_actions/comment";

const Comment: FC<NewsComment & { user: User }> = async ({
  id,
  text,
  user,
  created,
}) => {
  const { user: currentUser } = await getAuth();
  const canEdit = currentUser?.role === "ADMIN" || user.id === currentUser?.id;

//   TODO Ответ на комментарий
  return (
    <div
      className={"flex border rounded mt-4 border-foreground p-2 items-stretch"}
    >
      <div className={"p-4"}>
        {/* TODO Аватарки пользователей */}
        <Image
          width={80}
          height={80}
          src={"/profile.jpg"}
          className={"w-20 rounded-full"}
          alt={user.login}
        />
      </div>
      <div className={"ml-4 w-full flex flex-col justify-between"}>
        <div>
          <span className={"truncate font-bold"}>{user.login}</span>
          <div>{text}</div>
        </div>
        <div className={"flex justify-between"}>
          {/* TODO Возможность удалять и редактировать*/}
          {currentUser && canEdit && (
            <div className={"flex gap-4"}>
              Реактировать{" "}
              <form action={deleteComment}>
                <input type={"hidden"} name={"commentId"} value={id} />
                <button>Удалить</button>
              </form>
            </div>
          )}
          <div className={"text-xs text-gray-600 text-right"}>
            {created.toLocaleDateString()} ({created.toLocaleTimeString()})
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comment;
