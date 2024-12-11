"use server";

import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

export const deleteNews = async (newsId: string) => {
  // TODO Удалять и картинки новости
  await prisma.news.delete({
    where: {
      id: newsId,
    },
  });
  redirect(`/dashboard/news`);
};
