"use server";
import { prisma } from "@/lib/prisma";
import { Faq } from "@prisma/client";
import { notFound } from "next/navigation";

export const getQuestions = async (): Promise<Faq[]> => {
  return prisma.faq.findMany({
    orderBy: {
      id: "desc",
    },
  });
};

export const getQuestion = async (questionId: string): Promise<Faq> => {
  const question = await prisma.faq.findUnique({ where: { id: questionId } });
  if (!question) {
    notFound();
  }
  return question;
};
