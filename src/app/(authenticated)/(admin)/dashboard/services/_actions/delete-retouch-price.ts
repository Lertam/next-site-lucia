"use server";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export const deleteRetouchPrice = async (priceId: string): Promise<void> => {
  // TODO Удалять и картинки услуги
  const price = await prisma.retouchPrice.delete({
    where: {
      id: priceId,
    },
  });
  redirect(`/dashboard/services/${price.serviceId}`);
};
