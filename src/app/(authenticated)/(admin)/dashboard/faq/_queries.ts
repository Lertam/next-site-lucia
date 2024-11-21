"use server";
import { prisma } from "@/lib/prisma";

export const getQuestions = async () => {
  return prisma.faq.findMany({
    orderBy: {
      id: "desc",
    },
  });
};
