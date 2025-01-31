// import { NextApiRequest, NextApiResponse } from "next";

import { Prisma } from "@prisma/client";

// export default function handler(
//   req: NextApiRequest,
//   res: NextApiResponse<{ message: string }>
// ) {
//   res.status(200).json({ message: "Hello World" });
// }
export async function GET(req: Request) {
  const url = new URL(req.url);
  const term = url.searchParams.get("term");
  const where: Prisma.UserWhereInput = {};
  if (term) where.login = { contains: term, mode: "insensitive" };

  const users = await prisma?.user.findMany({
    where,
    orderBy: { createdAt: "desc" },
    take: 10,
    select: {
      id: true,
      image: true,
      login: true,
    },
  });
  return Response.json(users);
}
