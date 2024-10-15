"use server";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import path from "path";
import fs from "fs";
import { PATH_TO_IMAGES } from "../directories";

export const deleteRetouchService = async (
  serviceId: string
): Promise<void> => {
  // TODO Удалять и картинки услуги
  const service = await prisma.retouchService.delete({
    where: {
      id: serviceId,
    },
  });
  if (service.image) {
    const pathToFile = path.resolve(PATH_TO_IMAGES, service.image);
    if (fs.existsSync(pathToFile)) {
      fs.unlinkSync(pathToFile);
    }
  }
  redirect("/dashboard/services");
};
