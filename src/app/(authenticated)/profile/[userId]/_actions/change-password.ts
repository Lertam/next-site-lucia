"use server";
import { getAuth } from "@/features/auth/queries/get-auth";
import { prisma } from "@/lib/prisma";
import { UserRole } from "@prisma/client";
import { redirect } from "next/navigation";
import { Argon2id } from "oslo/password";
import { z } from "zod";

type ChangeEmailState = {
  ok: boolean;
  errors?: {
    userId?: string[];
    password?: string[];
    password2?: string[];
  };
};

const ChangeEmailSchema = z.object({
  userId: z.string({ message: "Укажите пользователя" }),
  password: z.string().min(6, "Минимальная длина пароля - 6"),
  password2: z.string().min(6, "Минимальная длина пароля - 6"),
});

export const changePassword = async (
  state: ChangeEmailState,
  formData: FormData
): Promise<ChangeEmailState> => {
  const { user: currentUser } = await getAuth();
  if (!currentUser || currentUser.role !== UserRole.ADMIN) {
    throw new Error("You are not authorized to change email");
  }
  const parsedInput = ChangeEmailSchema.safeParse({
    userId: formData.get("userId"),
    password: formData.get("password"),
    password2: formData.get("password2"),
  });
  if (!parsedInput.success) {
    return { ok: false, errors: parsedInput.error.flatten().fieldErrors };
  }

  if (parsedInput.data.password !== parsedInput.data.password2) {
    return { ok: false, errors: { password2: ["Пароли не совпадают!"] } };
  }

  const user = await prisma.user.findUniqueOrThrow({
    where: { id: parsedInput.data.userId },
  });
  const hashedPassword = await new Argon2id().hash(parsedInput.data.password);
  console.log(await prisma.user.update({
    where: { id: parsedInput.data.userId },
    data: { hashedPassword },
  }), hashedPassword);
  redirect(`/profile/${user.id}`);
  return { ok: true };
};
