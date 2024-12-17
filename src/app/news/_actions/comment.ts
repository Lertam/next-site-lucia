"use server";

import { getAuth } from "@/features/auth/queries/get-auth";
import { generateId } from "lucia";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { UserRole } from "@prisma/client";

export const createComment = async (
  _prevState: { message: string },
  formData: FormData
): Promise<{ message: string }> => {
  const { user } = await getAuth();

  if (!user) throw new Error("Need to auth");

  const newsId = formData.get("newsId") as string;
  const text = formData.get("text") as string;

  if (!newsId || !text) {
    throw new Error("No enoght params");
  }

  await prisma.newsComment.create({
    data: {
      id: generateId(16),
      text,
      newsId: newsId,
      userId: user.id,
    },
  });
  revalidatePath(`/news/${newsId}`);
  return { message: "Comment created" };
};

export const deleteComment = async (formData: FormData): Promise<void> => {
  const commentId = formData.get("commentId") as string;

  const { user } = await getAuth();
  if (!user) throw new Error("Need to auth");

  const comment = await prisma.newsComment.findUnique({
    where: {
      id: commentId,
    },
  });
  if (!comment) throw new Error("No comment found");

  if (comment.userId !== user.id && user.role !== UserRole.ADMIN)
    throw new Error("Not authorized");

  await prisma.newsComment.delete({
    where: {
      id: commentId,
    },
  });
  revalidatePath(`/news/${comment.newsId}`);
};
