"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { generateId } from "lucia";
import { redirect } from "next/navigation";

type State = {
  ok?: boolean;
  errors?: {
    catetegoryId?: string[];
    name?: string[];
    weight?: string[];
  };
  message?: string;
};

const Schema = z.object({
  categoryId: z.string(),
  name: z.string().min(1).max(50),
  weight: z.coerce.number(),
});

export const editShopCategory = async (
  state: State,
  formData: FormData
): Promise<State> => {
  const parsedInput = Schema.safeParse({
    categoryId: formData.get("categoryId"),
    name: formData.get("name"),
    weight: formData.get("weight"),
  });

  if (!parsedInput.success) {
    return { ok: false, errors: parsedInput.error.flatten().fieldErrors };
  }

  if (parsedInput.data.categoryId === "add") {
    await prisma.shopCategory.create({
      data: {
        id: generateId(15),
        name: parsedInput.data.name,
        weight: parsedInput.data.weight,
      },
    });
  } else {
    await prisma.shopCategory.update({
      where: {
        id: parsedInput.data.categoryId,
      },
      data: {
        name: parsedInput.data.name,
        weight: parsedInput.data.weight,
      },
    });
  }
  redirect("/dashboard/shop/categories");
};

export const deleteCategory = async (categoryId: string) => {
  // TODO Удалять и картинки услуги
  await prisma.shopCategory.delete({
    where: {
      id: categoryId,
    },
  });
  redirect(`/dashboard/shop/categories`);
};
