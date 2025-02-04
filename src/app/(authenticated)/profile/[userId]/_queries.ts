"use server";

import { User, UserRole } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { getAuth } from "@/features/auth/queries/get-auth";

export const getUser = async (userId: string): Promise<User | null> => {
  return prisma.user.findUnique({ where: { id: userId } });
};

export const getUserInfo = async (
  userId?: string
): Promise<{ login: string; email: string; phone: string }> => {
  const { user } = await getAuth();
  if (!user || (user.id !== userId && user.role !== UserRole.ADMIN)) {
    throw new Error("Not authorized");
  }
  if (!userId) userId = user.id;
  const usr = await prisma.user.findUniqueOrThrow({ where: { id: userId } });
  const phoneRow = await prisma.config.findUnique({
    where: { key: `phone_${userId}` },
  });
  return {
    login: usr.login,
    email: usr.email,
    phone: phoneRow && phoneRow.value ? phoneRow.value.toString() : "",
  };
};

export const getUserStatistic = async (
  userId: string
): Promise<{
  orders: number;
  images: number;
  sketches: number;
  projects: number;
  bonuses: number;
}> => {
  const { user } = await getAuth();
  if (!user || (user.id !== userId && user.role !== UserRole.ADMIN)) {
    throw new Error("Not authorized");
  }
  if (!userId) userId = user.id;
  // TODO Implements
  return {
    orders: 56,
    images: 23,
    sketches: 13,
    projects: 10,
    bonuses: 633,
  };
};

export const getUserPhotos = async (
  userId: string
): Promise<{ profile: string; standart: string | null }> => {
  // TODO Implements
  const { user: currentUser } = await getAuth();
  if (!currentUser) throw new Error("Not authorized");

  const user = await prisma.user.findUniqueOrThrow({ where: { id: userId } });
  const row = await prisma.config.findUnique({
    where: { key: `retouch_standart_${userId}` },
  });
  return {
    profile: `/modules/user/${user.image ? user.image : "no-avatar.jpg"}`,
    standart: row ? `/modules/retouch/standarts/${row.value}` : null,
  };
};
