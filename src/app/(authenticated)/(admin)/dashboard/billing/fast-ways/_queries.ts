"use server";
import { prisma } from "@/lib/prisma";
import { FastWay } from "@prisma/client";

export const getFastWays = async (): Promise<FastWay[]> => {
  return prisma.fastWay.findMany({
    orderBy: { weight: "desc" },
  });
};

export const getFastWay = async (id: string): Promise<FastWay> => {
  return prisma.fastWay.findUniqueOrThrow({
    where: { id },
  });
};
