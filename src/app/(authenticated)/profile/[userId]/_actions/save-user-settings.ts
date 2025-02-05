"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { generateId } from "lucia";
import { UserRole } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { UserAccess } from "@/lib/utils";

type SaveUserSettingsState = {
  ok: boolean;
  errors?: {
    label?: string[];
    role?: string[];
  };
};

const SaveUserSettingsSchema = z.object({
  userId: z.string(),
  label: z.string().nullish(),
  role: z.enum([UserRole.ADMIN, UserRole.RETOUCHER, UserRole.USER]),
  editor_access: z.coerce.boolean(),
  messenger_access: z.coerce.boolean(),
  orders_access: z.coerce.boolean(),
  site_access: z.coerce.boolean(),
});

export const saveUserSettings = async (
  state: SaveUserSettingsState,
  formData: FormData
): Promise<SaveUserSettingsState> => {
  const parsedInput = SaveUserSettingsSchema.safeParse({
    userId: formData.get("userId"),
    label: formData.get("label"),
    role: formData.get("role"),
    editor_access: formData.get("editor_access"),
    messenger_access: formData.get("messenger_access"),
    orders_access: formData.get("orders_access"),
    site_access: formData.get("site_access"),
  });

  console.log(parsedInput.error?.flatten());

  if (!parsedInput.success) {
    return { ok: false, errors: parsedInput.error.flatten().fieldErrors };
  }
  const { userId, label } = parsedInput.data;

  await prisma.config.upsert({
    where: { key: `retoucher-label-${userId}` },
    create: {
      id: generateId(15),
      key: `retoucher-label-${userId}`,
      value: label ? label : "",
    },
    update: { value: label ? label : "" },
  });

  await prisma.user.update({
    where: { id: userId },
    data: { role: parsedInput.data.role },
  });

  const access: UserAccess = {
    editor: parsedInput.data.editor_access,
    messenger: parsedInput.data.messenger_access,
    orders: parsedInput.data.orders_access,
    site: parsedInput.data.site_access,
  };
  await prisma.config.upsert({
    where: { key: `access-${userId}` },
    create: {
      id: generateId(15),
      key: `access-${userId}`,
      value: access,
    },
    update: {
      value: access,
    },
  });

  revalidatePath("/profile");
  revalidatePath(`/profile/${userId}`);
  return { ok: true };
};
