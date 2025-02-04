"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import path from "path";
import { promises as fs } from "fs";
import { generateId } from "lucia";

const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/bmp",
  "image/png",
  "image/webp",
];

export const saveAvatar = async (userId: string, image: File) => {
  console.log(userId, image);
  const user = await prisma.user.findUniqueOrThrow({ where: { id: userId } });

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

    await fs.writeFile(`public/modules/user/${filename}`, imageBuffer);
    console.log(
      await prisma.user.update({
        where: { id: user.id },
        data: { image: filename },
      })
    );
  } else {
    return {
      errors: {
        image: ["Необходимо выбрать изображение"],
      },
      ok: false,
    };
  }

  if (user.image && user.image !== "no-avatar.jpg") {
    try {
      await fs.unlink(`public/modules/user/${user.image}`);
    } catch (err: unknown) {
      console.log(
        `Cannot remove image for user #${user.id}, "${user.image}"`,
        err
      );
    }
  }
  console.log(filename);

  revalidatePath(`/profile/${userId}`);
  revalidatePath(`/profile`);
  return { ok: true };
};

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
    console.log(
      await prisma.config.upsert({
        where: { key: `retouch_standart_${userId}` },
        update: { value: filename },
        create: {
          id: generateId(15),
          key: `retouch_standart_${userId}`,
          value: filename,
        },
      })
    );
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
  console.log(filename);

  revalidatePath(`/profile/${userId}`);
  revalidatePath(`/profile`);
  return { ok: true };
};
