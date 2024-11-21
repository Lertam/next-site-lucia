"use server";
import { Faq } from "@prisma/client";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { generateId } from "lucia";
import { redirect } from "next/navigation";

type EditQuestionState = {
  ok: boolean;
  errors?: {
    questionId?: string[];
    question?: string[];
    answer?: string[];
    weight?: string[];
    hidden?: string[];
  };
  message?: string;
};

const EditQuestionSchema = z.object({
  questionId: z.string(),
  question: z
    .string({ message: "Укажите вопрос" })
    .min(10, "Вопрос должен быть длинее 10 символов"),
  answer: z.string({ message: "Укажите ответ" }),
  weight: z.coerce.number({ message: "Укажите вес" }),
  hidden: z.coerce.boolean(),
});

export const editQuestion = async (
  state: EditQuestionState,
  formData: FormData
): Promise<EditQuestionState> => {
  const parsedInput = EditQuestionSchema.safeParse({
    questionId: formData.get("questionId"),
    question: formData.get("question"),
    answer: formData.get("answer"),
    weight: formData.get("weight"),
    hidden: formData.get("hidden"),
  });

  if (!parsedInput.success) {
    return { ok: false, errors: parsedInput.error.flatten().fieldErrors };
  }
  let question: Faq | null = null;
  if (parsedInput.data.questionId !== "add") {
    question = await prisma.faq.findUnique({
      where: {
        id: parsedInput.data.questionId,
      },
    });
  }

  console.log("edit", parsedInput);
  if (parsedInput.data.questionId === "add") {
    // Создаем услугу
    question = await prisma.faq.create({
      data: {
        id: generateId(15),
        question: parsedInput.data.question,
        answer: parsedInput.data.answer,
        weight: parsedInput.data.weight,
        hidden: parsedInput.data.hidden,
      },
    });
  } else {
    // Модифицируем услугу
    if (!question) {
      throw new Error("Cannot find retuoch price");
    }

    question = await prisma.faq.update({
      where: {
        id: question.id,
      },
      data: {
        question: parsedInput.data.question,
        answer: parsedInput.data.answer,
        weight: parsedInput.data.weight,
        hidden: parsedInput.data.hidden,
      },
    });
  }

  redirect(`/dashboard/faq`);
  return {
    ok: true,
  };
};
