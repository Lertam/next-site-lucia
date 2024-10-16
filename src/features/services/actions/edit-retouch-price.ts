"use server";
import { prisma } from "@/lib/prisma";
import { RetouchPrice } from "@prisma/client";
import { generateId } from "lucia";
import { redirect } from "next/navigation";
import { z } from "zod";

type RetouchPriceEditForm = {
  ok: boolean;
  errors?: {
    priceId?: string[];
    serviceId?: string[];
    title?: string[];
    description?: string[];
    weight?: string[];
    price?: string[];
    express?: string[];
  };
  message?: string;
};

const RetouchPriceEditFormSchema = z.object({
  serviceId: z.string({ message: "Укажите ID услуги" }),
  priceId: z.string({ message: "Укажите ID цены" }),
  title: z
    .string({ message: "Укажите название" })
    .min(3, { message: "Название должно быть не менее 3 символов" }),
  description: z.string({ message: "Укажите описание" }),
  weight: z.coerce.number({
    required_error: "Укажите вес",
    invalid_type_error: "Вес должен быть числом",
  }),
  price: z.coerce.number({
    required_error: "Укажите цену",
    invalid_type_error: "Цена должна быть числом",
  }),
});

export const editRetouchPrice = async (
  state: RetouchPriceEditForm,
  formData: FormData
): Promise<RetouchPriceEditForm> => {
  const parsedInput = RetouchPriceEditFormSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    price: formData.get("price"),
    weight: formData.get("weight"),
    serviceId: formData.get("serviceId"),
    priceId: formData.get("priceId"),
  });

  if (!parsedInput.success) {
    return { ok: false, errors: parsedInput.error.flatten().fieldErrors };
  }
  let price: RetouchPrice | null = null;
  if (parsedInput.data.priceId !== "add") {
    price = await prisma.retouchPrice.findUnique({
      where: {
        id: parsedInput.data.priceId,
      },
    });
  }

  console.log(formData.get("express"));
  if (parsedInput.data.priceId === "add") {
    // Создаем услугу
    price = await prisma.retouchPrice.create({
      data: {
        id: generateId(15),
        title: parsedInput.data.title,
        description: parsedInput.data.description,
        price: parsedInput.data.price,
        weight: parsedInput.data.weight,
        serviceId: parsedInput.data.serviceId,
        express: formData.get("express") === "on",
      },
    });
  } else {
    // Модифицируем услугу
    if (!price) {
      throw new Error("Cannot find retuoch price");
    }

    price = await prisma.retouchPrice.update({
      where: {
        id: price.id,
      },
      data: {
        title: parsedInput.data.title,
        description: parsedInput.data.description,
        weight: parsedInput.data.weight,
        price: parsedInput.data.price,
        express: formData.get("express") === "on",
      },
    });
  }

  redirect("/dashboard/services");
  return {
    ok: true,
  };
};
