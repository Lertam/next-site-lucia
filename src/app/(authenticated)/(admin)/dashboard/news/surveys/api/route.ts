import { prisma } from "@/lib/prisma";

export const GET = async () => {
  const data = await prisma.survey.findMany({
    orderBy: {
      created: "desc",
    },
  });
  return Response.json(data);
};
