"use server";
import { z } from "zod";
import { existsSync, promises as fs, unlinkSync } from "fs";
import path from "path";
import { prisma } from "@/lib/prisma";
import { RetouchVariant } from "@prisma/client";
import { generateId } from "lucia";
import { redirect } from "next/navigation";
import { PATH_TO_IMAGES } from "../_directories";

type RetouchServiceEditForm = {
  errors?: {
    title?: string[];
    description?: string[];
    weight?: string[];
    price?: string[];
    image?: string[];
    withText?: string[];
    withFiles?: string[];
  };
  ok: boolean;
  message?: string;
};

// const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const RetouchServiceEditFormSchema = z.object({
  serviceId: z.string({ message: "Не указан ID услуги" }),
  variantId: z.string({ message: "Не указан ID варианата" }),
  title: z
    .string()
    .min(3, { message: "В названии должно быть более 3 символов" }),
  description: z.string(),
  weight: z.coerce.number({
    required_error: "Укажите число",
    invalid_type_error: "Вес должен быть числом",
  }),
  price: z.coerce
    .number({
      invalid_type_error: "Цена должна быть числом",
      required_error: "Укажите цену",
    })
    .min(0, { message: "Цена должна быть больше или равна нулю" }),
});

export const editRetouchVariant = async (
  state: RetouchServiceEditForm,
  formData: FormData
): Promise<RetouchServiceEditForm> => {
  const parsedInput = RetouchServiceEditFormSchema.safeParse({
    variantId: formData.get("variantId"),
    serviceId: formData.get("serviceId"),
    title: formData.get("title"),
    description: formData.get("description"),
    weight: formData.get("weight"),
    price: formData.get("price"),
  });

  if (!parsedInput.success) {
    return { ok: false, errors: parsedInput.error.flatten().fieldErrors };
  }
  let variant: RetouchVariant | null = null;
  if (parsedInput.data.serviceId !== "add") {
    variant = await prisma.retouchVariant.findUnique({
      where: {
        id: parsedInput.data.variantId,
      },
    });
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

    await fs.writeFile(`${PATH_TO_IMAGES}/${filename}`, imageBuffer);

    if (variant && variant.image) {
      // Удаляем старую картинку
      const pathToFile = path.resolve(`${PATH_TO_IMAGES}/${variant.image}`);
      if (existsSync(pathToFile)) {
        unlinkSync(pathToFile);
      } else {
        console.log("No image to delete");
      }
    }
  }

  if (parsedInput.data.variantId === "add") {
    if (!filename) {
      return {
        ok: false,
        errors: {
          image: ["Для создания варианта прикрепите картинку"],
        },
      };
    }
    // Создаем услугу
    variant = await prisma.retouchVariant.create({
      data: {
        id: generateId(15),
        image: filename,
        title: parsedInput.data.title,
        price: parsedInput.data.price,
        description: parsedInput.data.description,
        weight: parsedInput.data.weight,
        serviceId: parsedInput.data.serviceId,
        withFiles: formData.get("withFiles") === "on",
        withText: formData.get("withText") === "on",
      },
    });
  } else {
    // Модифицируем услугу
    if (!variant) {
      throw new Error("Cannot find service");
    }

    variant = await prisma.retouchVariant.update({
      where: {
        id: variant.id,
      },
      data: {
        title: parsedInput.data.title,
        description: parsedInput.data.description,
        price: parsedInput.data.price,
        weight: parsedInput.data.weight,
        image: filename,
        withFiles: formData.get("withFiles") === "on",
        withText: formData.get("withText") === "on",
      },
    });
  }

  redirect(`/dashboard/services/${variant.serviceId}`);
  return {
    ok: true,
  };
};
