"use server";
import { prisma } from "@/lib/prisma";
import { ACCEPTED_IMAGE_TYPES } from "@/lib/utils/contants";
import path from "path";
import { promises as fs } from "fs";
import { revalidatePath } from "next/cache";

export const saveAvatar = async (userId: string, image: File) => {
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

    await prisma.user.update({
      where: { id: user.id },
      data: { image: filename },
    });
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

  revalidatePath(`/profile/${userId}`);
  revalidatePath(`/profile`);
  return { ok: true };
};
