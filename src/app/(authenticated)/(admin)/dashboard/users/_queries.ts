"use server";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

const USERS_PER_PAGE = 2;

export const getUsers = async (term: string, page: number = 1) => {
  const where: Prisma.UserWhereInput = {};
  if (term && term.length > 0) {
    where.OR = [
      { login: { contains: term, mode: "insensitive" } },
      { email: { contains: term, mode: "insensitive" } },
    ];
  }
  console.log('s', USERS_PER_PAGE * (page - 1));
  return prisma.user.findMany({
    where,
    take: USERS_PER_PAGE,
    select: {
      id: true,
      login: true,
      email: true,
    },
    skip: USERS_PER_PAGE * (page - 1),
  });
};

export const getTotalUsersPage = async (term: string) => {
  const where: Prisma.UserWhereInput = {};
  if (term && term.length > 0) {
    where.OR = [
      { login: { contains: term, mode: "insensitive" } },
      { email: { contains: term, mode: "insensitive" } },
    ];
  }
  const totalUsers = await prisma.user.count({ where });
  return Math.ceil(totalUsers / USERS_PER_PAGE);
};
