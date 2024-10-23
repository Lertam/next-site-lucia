"use server";

import { RetouchService } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export const getRetouchServicesWithPrices = async (): Promise<
  Array<RetouchService & { price: number }>
> => {
  const services = await prisma.retouchService.findMany({
    orderBy: { weight: "desc" },
    include: {
      prices: {
        take: 1,
        orderBy: { weight: "desc" },
        select: {
          price: true,
        },
      },
    },
  });
  return services.map((service) => ({
    ...service,
    price: service.prices[0] ? service.prices[0].price : 0,
  }));
};
