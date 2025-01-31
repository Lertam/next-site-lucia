"use server";

import { getAuth } from "@/features/auth/queries/get-auth";
import { BillingStatus, UserRole } from "@prisma/client";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

type EditOrderState = {
  ok: boolean;
  errors?: {
    orderId?: string[];
    userId?: string[];
    sum?: string[];
    shopItemId?: string[];
    comment?: string[];
    status?: string[];
  };
};

const EditOrderSchema = z.object({
  orderId: z.coerce.number().nullish(),
  userId: z.string({ message: "Укажите пользователя" }),
  sum: z.coerce.number(),
  shopItemId: z.coerce.number().nullish(),
  comment: z.string().nullish(),
  status: z
    .enum([BillingStatus.WAIT, BillingStatus.READY, BillingStatus.DELETED], {
      message: "Укажите статус",
    })
    .nullish(),
});

export const editOrder = async (
  state: EditOrderState,
  formData: FormData
): Promise<EditOrderState> => {
  // Проверка прав
  const { user } = await getAuth();
  if (!user || user.role !== UserRole.ADMIN) {
    throw new Error("Need to auth");
  }

  const parsedData = EditOrderSchema.safeParse({
    orderId: formData.get("orderId"),
    userId: formData.get("userId"),
    sum: formData.get("sum"),
    shopItemId: formData.get("shopItemId"),
    comment: formData.get("comment"),
    status: formData.get("status"),
  });

  console.log(parsedData);

  if (parsedData.error) {
    return { ok: false, errors: parsedData.error.flatten().fieldErrors };
  }

  const { orderId, userId, sum, shopItemId, comment, status } = parsedData.data;

  // Проверяем наличие юзера
  const existedUser = await prisma.user.findUnique({ where: { id: userId } });
  if (!existedUser) {
    throw new Error("User not found");
  }

  if (orderId) {
    // Проверка наличия картинки, ели указан id
    if (shopItemId) {
      const img = await prisma.shopItem.findUnique({
        where: { id: shopItemId },
      });
      if (!img) {
        throw new Error("Image not found");
      }
    }
    if (!status) {
      throw new Error("Status not sended");
    }
    await prisma.billing.update({
      where: { id: orderId },
      data: {
        sum,
        comment: comment ? comment : undefined,
        status,
      },
    });
  } else {
    await prisma.billing.create({
      data: {
        userId,
        sum,
        shopItemId: Number(shopItemId) > 0 ? shopItemId : undefined,
        comment: comment ? comment : undefined,
        status: BillingStatus.WAIT,
      },
    });
  }
  revalidatePath("/dashboard/billing");
  redirect("/dashboard/billing");

  return { ok: false };
};
