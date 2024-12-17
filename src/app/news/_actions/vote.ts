"use server";

import { getAuth } from "@/features/auth/queries/get-auth";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

type VoteState = {
  ok?: boolean;
  errors?: {
    voteId?: string[];
  };
  message?: string;
};

const VoteSchema = z.object({
  voteId: z.string(),
});

export const vote = async (
  state: VoteState,
  formData: FormData
): Promise<VoteState> => {
  const parsedInput = VoteSchema.safeParse({
    voteId: formData.get("voteId"),
  });

  if (!parsedInput.success) {
    return { ok: false, errors: parsedInput.error.flatten().fieldErrors };
  }
  const { user } = await getAuth();
  if (!user) throw new Error("Not authorized");

  // TODO Проверять, нет лои голоса
  const voteData = await prisma.surveyVote.create({
    data: { variantId: parsedInput.data.voteId, userId: user.id },
    include: {
      variant: {
        include: {
          survey: {
            include: {news: true}
          }
        }
      }
    }
  });
  
  revalidatePath(`/news/${voteData.variant.survey.news[0].id}`)
  return { ok: true, message: "Ваш голос учтен!" };
};
