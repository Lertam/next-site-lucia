import { RetouchService } from "@prisma/client";
import { cache } from "react";
import { prisma } from "@/lib/prisma";

export const getRetouchServices = cache(async (): Promise<RetouchService[]> => {
  return prisma.retouchService.findMany({ orderBy: { weight: "desc" } });
});
