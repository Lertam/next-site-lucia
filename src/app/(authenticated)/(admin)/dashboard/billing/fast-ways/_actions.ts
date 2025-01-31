"use server";

import { getAuth } from "@/features/auth/queries/get-auth";
import { prisma } from "@/lib/prisma";
import { UserRole } from "@prisma/client";
import { generateId } from "lucia";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { coerce, z } from "zod";

type FastWayFormState = {
  ok: boolean;
  errors?: {
    way?: string[];
    sum?: string[];
    weight?: string[];
  };
};

const WaysEnum = z.enum(["ROBOKASSA", "UNITPAY", "WALLET_ONE", "YOOMONEY"], {
  message: "Укажите агрегатор!",
});

const FastWayFormSchema = z.object({
  id: z.string().optional().nullable(),
  way: WaysEnum,
  sum: coerce.number().min(1, { message: "Сумма должна быть больше 0!" }),
  weight: z.coerce.number(),
});

export const editFastWay = async (
  state: FastWayFormState,
  formData: FormData
): Promise<FastWayFormState> => {
  const parsedInput = FastWayFormSchema.safeParse({
    id: formData.get("id"),
    way: formData.get("way"),
    sum: formData.get("sum"),
    weight: formData.get("weight"),
  });

  console.log(
    parsedInput.data,
    parsedInput.success,
    parsedInput.error?.flatten()
  );
  if (!parsedInput.success) {
    return { ok: false, errors: parsedInput.error.flatten().fieldErrors };
  }
  if (parsedInput.data.id) {
    await prisma.fastWay.update({
      where: { id: parsedInput.data.id },
      data: {
        way: parsedInput.data.way,
        sum: parsedInput.data.sum,
        weight: parsedInput.data.weight,
      },
    });
  } else {
    await prisma.fastWay.create({
      data: {
        id: generateId(15),
        way: parsedInput.data.way,
        sum: parsedInput.data.sum,
        weight: parsedInput.data.weight,
      },
    });
  }
  revalidatePath("/dashboard/billing/fast-ways");
  redirect("/dashboard/billing/fast-ways");
  return {
    ok: false,
  };
};

export const deleteFastWay = async (fastWayId: string) => {
  const { user } = await getAuth();
  if (!user || user.role !== UserRole.ADMIN) {
    throw new Error("Need to auth");
  }
  await prisma.fastWay.delete({
    where: { id: fastWayId },
  });
  revalidatePath("/dashboard/billing/fast-ways");
  redirect("/dashboard/billing/fast-ways");
};