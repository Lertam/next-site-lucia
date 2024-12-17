"use server";

import { News } from "@prisma/client";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { generateId } from "lucia";
import { redirect } from "next/navigation";
import path from "path";
import { promises as fs } from "fs";

const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/bmp",
  "image/webp",
];

type EditNewsState = {
  ok: boolean;
  errors?: {
    newsId?: string[];
    title?: string[];
    content?: string[];
    published?: string[];
    image?: string[];
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

  const image = formData.get("image") as File;

  let filename: string | undefined = undefined;
  if (image && image.size > 0) {
    if (!ACCEPTED_IMAGE_TYPES.includes(image.type)) {
      return {
        errors: {
          image: ["Недопустимый формат изображения"],
        },
        ok: false,
      };
    }
    const { ext } = path.parse(image.name);
    filename = crypto.randomUUID() + ext;

    const buffer = await image.arrayBuffer(); // Получаем байты из файла
    const imageBuffer = Buffer.from(buffer);

    await fs.writeFile(`public/images/news/${filename}`, imageBuffer);
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
        image: filename,
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
        image: filename,
      },
    });
  }

  redirect(`/dashboard/news`);
  return {
    ok: true,
  };
};
