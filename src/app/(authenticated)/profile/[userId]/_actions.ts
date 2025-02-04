"use server";

import { getAuth } from "@/features/auth/queries/get-auth";
import { UserRole } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export const changeEmail = async (
  userId: string,
  email: string
): Promise<void> => {
  const { user: currentUser } = await getAuth();
  if (!currentUser || currentUser.role !== UserRole.ADMIN) {
    throw new Error("You are not authorized to change email");
  }

  const user = await prisma.user.findUniqueOrThrow({ where: { id: userId } });
  await prisma.user.update({ where: { id: userId }, data: { email } });
  redirect(`/dashboard/user/${user.id}`);
};
