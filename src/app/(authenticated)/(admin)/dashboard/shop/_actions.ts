"use server";

import { z } from "zod";
import path from "path";
import { promises as fs } from "fs";
import { ShopItem } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

type State = {
  ok?: boolean;
  errors?: {
    name?: string[];
    preview?: string[];
    source?: string[];
    categoryId?: string[];
    price?: string[];
  };
  message?: string;
};

const Schema = z.object({
  itemId: z.coerce.number().optional(),
  categoryId: z.string(),
  name: z.string({ message: "Укажите название" }),
  price: z.coerce
    .number({ message: "Укажите цену" })
    .min(0, { message: "Цена должна быть больше нуля" }),
});

const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/bmp"];

export const editShopItem = async (
  state: State,
  formData: FormData
): Promise<State> => {
  const parsedInput = Schema.safeParse({
    itemId: formData.get("itemId"),
    categoryId: formData.get("categoryId"),
    name: formData.get("name"),
    price: formData.get("price"),
  });

  if (!parsedInput.success) {
    return { ok: false, errors: parsedInput.error.flatten().fieldErrors };
  }

  const preview = formData.get("preview") as File;

  let previewFilename: string | undefined = undefined;
  if (preview && preview.size > 0) {
    if (!ACCEPTED_IMAGE_TYPES.includes(preview.type)) {
      return {
        errors: {
          preview: ["Недопустимый формат изображения"],
        },
        ok: false,
      };
    }
    const { ext } = path.parse(preview.name);
    previewFilename = crypto.randomUUID() + ext;

    const buffer = await preview.arrayBuffer(); // Получаем байты из файла
    const imageBuffer = Buffer.from(buffer);
    // TODO Удалять старые картинки
    await fs.writeFile(
      `public/modules/shop/previews/${previewFilename}`,
      imageBuffer
    );
  }

  const source = formData.get("source") as File;

  let sourceFilename: string | undefined = undefined;
  if (source && source.size > 0) {
    if (!ACCEPTED_IMAGE_TYPES.includes(source.type)) {
      return {
        errors: {
          source: ["Недопустимый формат изображения"],
        },
        ok: false,
      };
    }
    const { ext } = path.parse(source.name);
    sourceFilename = crypto.randomUUID() + ext;

    const buffer = await source.arrayBuffer(); // Получаем байты из файла
    const imageBuffer = Buffer.from(buffer);
    // TODO Удалять старые картинки
    await fs.writeFile(`sources/shop/${sourceFilename}`, imageBuffer);
  }

  let shopItem: ShopItem | null = null;
  if (parsedInput.data.itemId !== -1) {
    shopItem = await prisma?.shopItem.findUnique({
      where: {
        id: parsedInput.data.itemId,
      },
    });
  }

  console.log(parsedInput.data);

  if (parsedInput.data.itemId === -1) {
    if (!sourceFilename) {
      return { ok: false, errors: { source: ["Укажите файл для магазина"] } };
    }
    if (!previewFilename) {
      return { ok: false, errors: { preview: ["Укажите файл превью"] } };
    }
    // TODO Парсить инфу о файле
    // TODO Накладывать водяной знак
    // TODO Автоматически создавать превью
    // Создаем новость
    shopItem = await prisma.shopItem.create({
      data: {
        name: parsedInput.data.name,
        categoryId: parsedInput.data.categoryId,
        preview: previewFilename,
        source: sourceFilename,
        data: "",
        price: parsedInput.data.price,
      },
    });
  } else {
    // Модифицируем новость
    if (!shopItem) {
      throw new Error("Cannot find shop item");
    }

    shopItem = await prisma.shopItem.update({
      where: {
        id: shopItem.id,
      },
      data: {
        name: parsedInput.data.name,
        categoryId: parsedInput.data.categoryId,
        preview: previewFilename,
        source: sourceFilename,
        price: parsedInput.data.price,
      },
    });
  }

  redirect(`/dashboard/shop`);
  return { ok: true };
};
