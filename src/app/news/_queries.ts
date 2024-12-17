"use server";
import { getAuth } from "@/features/auth/queries/get-auth";
import { prisma } from "@/lib/prisma";
import { Survey, SurveyVariant, SurveyVote } from "@prisma/client";

export const getNewsList = async (page: number = 1, query: string = "") => {
  // TODO Проверка ролей
  // TODO Фильтровать по содержанию
  return prisma.news.findMany({
    where: {
      title: {
        contains: query,
      },
    },
    skip: (page - 1) * 9,
    take: 9,
    orderBy: {
      created: "desc",
    },
  });
};

export const getNewsTotalPages = async (query: string = "") => {
  // TODO Проверка ролей
  // TODO Фильтровать по содержанию
  const totalNews = await prisma.news.count({
    where: {
      title: {
        contains: query,
      },
    },
  });
  return Math.ceil(totalNews / 9);
};

export const getNewsItem = async (id: string) => {
  // TODO Проверка ролей
  return prisma.news.findUnique({
    where: {
      id,
    },
  });
};

export const getSurveyVariants = async (
  surveyId: string
): Promise<Array<SurveyVariant & { votes: SurveyVote[] }>> => {
  return prisma.surveyVariant.findMany({
    where: { surveyId },
    include: { votes: true },
  });
};

export const getSurvey = async (
  surveyId: string
): Promise<
  | (Survey & {
      variants: Array<
        SurveyVariant & {
          votes: SurveyVote[];
        }
      >;
    })
  | null
> => {
  return prisma.survey.findUnique({
    where: {
      id: surveyId,
    },
    include: {
      variants: {
        include: {
          votes: true,
        },
      },
    },
  });
};

export const getUserSurveyVote = async (
  surveyId: string
): Promise<SurveyVote | null> => {
  const { user } = await getAuth();
  if (!user) {
    return null;
  }
  return prisma.surveyVote.findFirst({
    where: {
      variant: {
        surveyId: surveyId,
      },
      userId: user.id,
    },
  });
};

export const getNewsComments = async (newsId: string) => {
  return prisma.newsComment.findMany({
    where: {
      newsId,
    },
    include: {
      user: true,
    },
  });
};
