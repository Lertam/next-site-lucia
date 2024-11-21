"use server";
import { z } from "zod";
import { existsSync, promises as fs, unlinkSync } from "fs";
import path from "path";
import { prisma } from "@/lib/prisma";
import { RetouchService } from "@prisma/client";
import { generateId } from "lucia";
import { redirect } from "next/navigation";
import { PATH_TO_IMAGES } from "../_directories";

type RetouchServiceEditForm = {
  errors?: {
    title?: string[];
    description?: string[];
    weight?: string[];
    image?: string[];
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
  title: z
    .string()
    .min(3, { message: "В названии должно быть более 3 символов" }),
  description: z.string(),
  weight: z
    .string()
    .refine((w) => !isNaN(parseInt(w)), { message: "Укажите число" }),
  // image: z.any().optional().refine((file) => file ? ACCEPTED_IMAGE_TYPES.includes(file.type): false, {
  //   message: "Недопустимый формат изображения",
  // }),
});

export const editRetouchService = async (
  state: RetouchServiceEditForm,
  formData: FormData
): Promise<RetouchServiceEditForm> => {
  const parsedInput = RetouchServiceEditFormSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    weight: formData.get("weight"),
    // image: formData.get("image"),
    serviceId: formData.get("serviceId"),
  });

  if (!parsedInput.success) {
    return { ok: false, errors: parsedInput.error.flatten().fieldErrors };
  }
  let service: RetouchService | null = null;
  if (parsedInput.data.serviceId !== "add") {
    service = await prisma.retouchService.findUnique({
      where: {
        id: parsedInput.data.serviceId,
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

    if (service && service.image) {
      // Удаляем старую картинку
      const pathToFile = path.resolve(`${PATH_TO_IMAGES}/${service.image}`);
      if (existsSync(pathToFile)) {
        unlinkSync(pathToFile);
      } else {
        console.log("No image to delete");
      }
    }
  }

  if (parsedInput.data.serviceId === "add") {
    if (!filename) {
      return {
        ok: false,
        errors: {
          image: ["Для создания услуги прикрепите картинку"],
        },
      };
    }
    // Создаем услугу
    service = await prisma.retouchService.create({
      data: {
        id: generateId(15),
        image: filename,
        title: parsedInput.data.title,
        description: parsedInput.data.description,
        weight: parseInt(parsedInput.data.weight),
      },
    });
  } else {
    // Модифицируем услугу
    if (!service) {
      throw new Error("Cannot find service");
    }

    service = await prisma.retouchService.update({
      where: {
        id: service.id,
      },
      data: {
        title: parsedInput.data.title,
        description: parsedInput.data.description,
        weight: parseInt(parsedInput.data.weight),
        image: filename,
      },
    });
  }

  redirect("/dashboard/services");
  return {
    ok: true,
  };
};
