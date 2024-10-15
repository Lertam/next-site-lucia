"use server";
import crypto from "crypto";
import z from "zod";
import { prisma } from "@/lib/prisma";
import { sendEmail } from "@/lib/mailer";
import { Argon2id } from "oslo/password";
import { redirect } from "next/navigation";

type ResetPasswordFormState = {
  errors?: {
    login?: string[];
  };
  message?: string;
};

const ResetPasswordFormSchema = z.object({
  login: z
    .string()
    .min(3, { message: "Логин должен быть не менее 3 символов" }),
});

export const resetPasswordRequest = async (
  state: ResetPasswordFormState,
  formData: FormData
): Promise<ResetPasswordFormState> => {
  const parsedInput = ResetPasswordFormSchema.safeParse({
    login: formData.get("login"),
  });

  if (!parsedInput.success) {
    return { errors: parsedInput.error.flatten().fieldErrors };
  }

  // TODO Add cron script to delete expired tokens
  try {
    const user = await prisma?.user.findFirst({
      where: {
        OR: [
          { email: parsedInput.data.login },
          { login: parsedInput.data.login },
        ],
      },
    });
    if (!user) {
      return { errors: { login: ["Пользователь не найден"] } };
    }
    const expires = new Date();
    expires.setHours(expires.getHours() + 24);

    const token = await prisma.passwordResetToken.upsert({
      where: {
        userId: user.id,
      },
      create: {
        userId: user.id,
        token: crypto.randomBytes(32).toString("hex"),
        expires,
      },
      update: {
        token: crypto.randomBytes(32).toString("hex"),
        expires,
      },
    });

    await sendEmail({
      to: user.email,
      subject: "Восстановление пароля",
      html: `<a href={"${process.env.BASE_URL}/auth/reset-password/${token.token}">Восстановить пароль</a>`,
    });

    return {
      message: "ok",
    };
  } catch (ex) {
    console.log(ex);
    return { message: "Произошла ошибка, попробуйте снова" };
  }
};

type ResetPasswordFormPasswordState = {
  errors?: {
    password?: string[];
    confirmPassword?: string[];
  };
  message?: string;
  ok: boolean;
};

const ResetPasswordFormPasswordSchema = z.object({
  token: z.string().length(64),
  password: z
    .string()
    .min(8, { message: "Слишком короткий пароль" })
    .max(20, { message: "Пароль слишком длинный" }),
  confirmPassword: z.string().min(8, { message: "Проверьте пароль" }),
});

export const resetPasswordPassword = async (
  state: ResetPasswordFormPasswordState,
  formData: FormData
): Promise<ResetPasswordFormPasswordState> => {
  const parsedInput = ResetPasswordFormPasswordSchema.safeParse({
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
    token: formData.get("token"),
  });

  if (!parsedInput.success) {
    return { ok: false, errors: parsedInput.error.flatten().fieldErrors };
  }

  if (parsedInput.data.password !== parsedInput.data.confirmPassword) {
    return { ok: false, errors: { confirmPassword: ["Пароли не совпадают"] } };
  }

  const userToken = await prisma.passwordResetToken.findUnique({
    where: { token: parsedInput.data.token },
	include: {user: true}
  });

  if (!userToken || userToken.expires < new Date()) {
    return {
      ok: false,
      message:
        "Срок действия ссылки истек, запросите новую на странице сброса пароля",
    };
  }

  const hashedPassword = await new Argon2id().hash(parsedInput.data.password);
  console.log(hashedPassword, parsedInput.data.password, userToken.user.hashedPassword);
  const user = await prisma.user.update({
    where: {
      id: userToken.userId,
    },
    data: {
      hashedPassword,
    },
  });
  console.log(user.hashedPassword);
  await prisma.passwordResetToken.delete({ where: { token: parsedInput.data.token } });
  return {
    message: "Пароль изменен. Перенаправление на страницу входа",
    ok: true,
  };
};
