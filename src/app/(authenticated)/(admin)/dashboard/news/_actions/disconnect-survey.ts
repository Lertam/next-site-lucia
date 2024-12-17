"use server";

import { prisma } from "@/lib/prisma";

export const disconnectSurvey = async (newsId: string, surveyId: string) => {
  await prisma.news.update({
    where: { id: newsId },
    data: {
      survey: { disconnect: { id: surveyId } },
    },
  });
};

export const connectSurvey = async (newsId: string, surveyId: string) => {
  await prisma.news.update({
    where: { id: newsId },
    data: {
      survey: { connect: { id: surveyId } },
    },
  });
};
