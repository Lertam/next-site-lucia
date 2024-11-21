"use server";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import path from "path";
import fs from "fs";
import { PATH_TO_IMAGES } from "../_directories";

export const deleteRetouchVariant = async (
  variantId: string
): Promise<void> => {
  // TODO Удалять и картинки услуги
  const variant = await prisma.retouchVariant.delete({
    where: {
      id: variantId,
    },
  });
  if (variant.image) {
    const pathToFile = path.resolve(PATH_TO_IMAGES, variant.image);
    if (fs.existsSync(pathToFile)) {
      fs.unlinkSync(pathToFile);
    }
  }
  redirect(`/dashboard/services/${variant.serviceId}`);
};
