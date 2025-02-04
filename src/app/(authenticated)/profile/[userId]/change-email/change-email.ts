"use server";
import { getAuth } from "@/features/auth/queries/get-auth";
import { prisma } from "@/lib/prisma";
import { UserRole } from "@prisma/client";
import { redirect } from "next/navigation";
import { z } from "zod";

type ChangeEmailState = {
  ok: boolean;
  errors?: {
    userId?: string[];
    email?: string[];
  };
};

const ChangeEmailSchema = z.object({
  userId: z.string({ message: "Укажите пользователя" }),
  email: z.string().email("Неправильный формат адреса"),
});

export const changeEmail = async (
  state: ChangeEmailState,
  formData: FormData
): Promise<ChangeEmailState> => {
  const { user: currentUser } = await getAuth();
  if (!currentUser || currentUser.role !== UserRole.ADMIN) {
    throw new Error("You are not authorized to change email");
  }
  const parsedInput = ChangeEmailSchema.safeParse({
    userId: formData.get("userId"),
    email: formData.get("email"),
  });
  if (!parsedInput.success) {
    return { ok: false, errors: parsedInput.error.flatten().fieldErrors };
  }

  const user = await prisma.user.findUniqueOrThrow({
    where: { id: parsedInput.data.userId },
  });
  await prisma.user.update({
    where: { id: parsedInput.data.userId },
    data: { email: parsedInput.data.email },
  });
  redirect(`/profile/${user.id}`);
  return { ok: true };
};
