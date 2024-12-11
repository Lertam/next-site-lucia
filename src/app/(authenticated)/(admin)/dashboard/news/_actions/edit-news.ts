"use server";

import { News } from "@prisma/client";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { generateId } from "lucia";
import { redirect } from "next/navigation";

type EditNewsState = {
  ok: boolean;
  errors?: {
    newsId?: string[];
    title?: string[];
    content?: string[];
    published?: string[];
  };
  message?: string;
};

const EditNewsSchema = z.object({
  newsId: z.string(),
  title: z.string().max(200, "Название не должно быть длиннее 200 символов"),
  content: z.string(),
  published: z.coerce.boolean(),
});

export const editNewsItem = async (
  state: EditNewsState,
  formData: FormData
): Promise<EditNewsState> => {
  const parsedInput = EditNewsSchema.safeParse({
    newsId: formData.get("newsId"),
    title: formData.get("title"),
    content: formData.get("content"),
    published: formData.get("published"),
  });

  if (!parsedInput.success) {
    return { ok: false, errors: parsedInput.error.flatten().fieldErrors };
  }
  let newsItem: News | null = null;
  if (parsedInput.data.newsId !== "add") {
    newsItem = await prisma.news.findUnique({
      where: {
        id: parsedInput.data.newsId,
      },
    });
  }

  if (parsedInput.data.newsId === "add") {
    // Создаем новость
    newsItem = await prisma.news.create({
      data: {
        id: generateId(15),
        title: parsedInput.data.title,
        content: parsedInput.data.content,
        published: parsedInput.data.published,
      },
    });
  } else {
    // Модифицируем новость
    if (!newsItem) {
      throw new Error("Cannot find retuoch price");
    }

    newsItem = await prisma.news.update({
      where: {
        id: newsItem.id,
      },
      data: {
        title: parsedInput.data.title,
        content: parsedInput.data.content,
        published: parsedInput.data.published,
      },
    });
  }

  redirect(`/dashboard/news`);
  return {
    ok: true,
  };
};
