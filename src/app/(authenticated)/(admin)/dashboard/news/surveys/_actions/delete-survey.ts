"use server";

import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

export const deleteSurvey = async (newsId: string) => {
  // TODO Удалять и варианты и голоса
  await prisma.survey.delete({
    where: {
      id: newsId,
    },
  });
  redirect(`/dashboard/news`);
};
