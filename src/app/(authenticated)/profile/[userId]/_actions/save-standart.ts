"use server";
import { prisma } from "@/lib/prisma";
import { ACCEPTED_IMAGE_TYPES } from "@/lib/utils/contants";
import { promises as fs } from "fs";
import { generateId } from "lucia";
import { revalidatePath } from "next/cache";
import path from "path";

export const saveStandart = async (userId: string, image: File) => {
  const row = await prisma.config.findUnique({
    where: { key: `retouch_standart_${userId}` },
  });

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

    await fs.writeFile(
      `public/modules/retouch/standarts/${filename}`,
      imageBuffer
    );
    await prisma.config.upsert({
      where: { key: `retouch_standart_${userId}` },
      update: { value: filename },
      create: {
        id: generateId(15),
        key: `retouch_standart_${userId}`,
        value: filename,
      },
    });
  } else {
    return {
      errors: {
        image: ["Необходимо выбрать изображение"],
      },
      ok: false,
    };
  }

  if (row && row.value) {
    try {
      await fs.unlink(`public/modules/retouch/standarts/${row.value}`);
    } catch (err: unknown) {
      console.log(
        `Cannot remove image for user #${userId}, "${row.value}"`,
        err
      );
    }
  }

  revalidatePath(`/profile/${userId}`);
  revalidatePath(`/profile`);
  return { ok: true };
};
