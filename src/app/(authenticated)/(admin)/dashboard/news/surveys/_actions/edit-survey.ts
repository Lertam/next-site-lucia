"use server";

import { Survey, SurveyVariant } from "@prisma/client";
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
  variants: z.array(
    z.object({
      id: z.string(),
      text: z.string(),
    }),
    {
      required_error: "Укажите варианты",
      invalid_type_error: "Неправильный формат вариантов",
    }
  ),
});

export const editSurvey = async (
  state: EditSurveyState,
  formData: FormData
): Promise<EditSurveyState> => {
  const variants: SurveyVariant[] = JSON.parse(
    formData.get("variants") as string
  );

  const parsedInput = EditSurveySchema.safeParse({
    surveyId: formData.get("surveyId"),
    title: formData.get("title"),
    text: formData.get("text"),
    finished: formData.get("finished"),
    variants,
  });

  if (!parsedInput.success) {
    return { ok: false, errors: parsedInput.error.flatten().fieldErrors };
  }

  let survey: (Survey & { variants: SurveyVariant[] }) | null = null;
  if (parsedInput.data.surveyId !== "add") {
    survey = await prisma.survey.findUnique({
      where: {
        id: parsedInput.data.surveyId,
      },
      include: {
        variants: true,
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
        variants: {
          create: variants,
        },
      },
      include: {
        variants: true,
      },
    });
  } else {
    // Модифицируем опрос
    if (!survey) {
      throw new Error("Cannot find survey");
    }

    const exisingVariants = survey.variants;
    const deletedVariants = variants.filter(
      (v) => !exisingVariants.map((v) => v.id).includes(v.id)
    );
    console.log("del", deletedVariants);
    try {
      const a = await prisma.$transaction(async (tx) => {
        if (!survey) throw new Error("Cannot find survey");

        if (deletedVariants.length > 0) {
          await tx.survey.update({
            where: {
              id: survey.id,
            },
            data: {
              variants: {
                disconnect: deletedVariants.map((v) => ({ id: v.id })),
              },
            },
          });
        }
        const sv = await tx.survey.update({
          where: {
            id: survey.id,
          },
          data: {
            title: parsedInput.data.title,
            text: parsedInput.data.text,
            finished: parsedInput.data.finished,
            variants: {
              connectOrCreate: variants.map((v) => ({
                where: { id: v.id },
                create: {
                  id: v.id,
                  text: v.text,
                },
              })),
            },
          },
        });
        return sv;
      });
      console.log("a", a);
    } catch (ex) {
      console.log("ex", ex);
    }
    // survey = await prisma.survey.update({
    //   where: {
    //     id: survey.id,
    //   },
    //   data: {
    //     title: parsedInput.data.title,
    //     text: parsedInput.data.text,
    //     finished: parsedInput.data.finished,
    //     variants: {
    //       disconnect: deletedVariants.map((v) => ({ id: v.id })),
    //       connectOrCreate: variants.map((v) => ({
    //         where: { id: v.id },
    //         create: {
    //           id: v.id,
    //           text: v.text,
    //         },
    //       })),
    //     },
    //   },
    //   include: {
    //     variants: true,
    //   },
    // });
  }

  redirect(`/dashboard/news/surveys`);
  return {
    ok: true,
  };
};
