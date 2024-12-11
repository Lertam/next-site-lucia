"use server";

import { Survey } from "@prisma/client";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { generateId } from "lucia";
import { redirect } from "next/navigation";

type EditSurveyState = {
  ok: boolean;
  errors?: {
    surveyId?: string[];
    title?: string[];
    text?: string[];
    finished?: string[];
  };
  message?: string;
};

const EditSurveySchema = z.object({
  surveyId: z.string(),
  title: z.string(),
  text: z.string(),
  finished: z.coerce.boolean(),
});

export const editSurvey = async (
  state: EditSurveyState,
  formData: FormData
): Promise<EditSurveyState> => {
  const parsedInput = EditSurveySchema.safeParse({
    surveyId: formData.get("surveyId"),
    title: formData.get("title"),
    text: formData.get("text"),
    finished: formData.get("finished"),
  });

  if (!parsedInput.success) {
    return { ok: false, errors: parsedInput.error.flatten().fieldErrors };
  }

  let survey: Survey | null = null;
  if (parsedInput.data.surveyId !== "add") {
    survey = await prisma.survey.findUnique({
      where: {
        id: parsedInput.data.surveyId,
      },
    });
  }

  if (parsedInput.data.surveyId === "add") {
    // Создаем опрос
    survey = await prisma.survey.create({
      data: {
        id: generateId(15),
        text: parsedInput.data.text,
        title: parsedInput.data.title,
      },
    });
  } else {
    // Модифицируем опрос
    if (!survey) {
      throw new Error("Cannot find survey");
    }

    survey = await prisma.survey.update({
      where: {
        id: survey.id,
      },
      data: {
        title: parsedInput.data.title,
        text: parsedInput.data.text,
        finished: parsedInput.data.finished,
      },
    });
  }

  redirect(`/dashboard/news/surveys`);
  return {
    ok: true,
  };
};
