"use server";

import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export const deleteQuestion = async (questionId: string): Promise<void> => {
  // TODO Удалять и картинки услуги
  await prisma.faq.delete({
    where: {
      id: questionId,
    },
  });
  redirect(`/dashboard/faq`);
};
