"use server";
import { prisma } from "@/lib/prisma";

const ITEMS_PER_PAGE = 10;

export const getSurveyVariants = async (surveyId: string) => {
  return prisma.surveyVariant.findMany({
    where: { surveyId },
    include: { votes: true },
  });
};
