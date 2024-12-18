"use server";

import { lucia } from "@/lib/lucia";
import { generateId } from "lucia";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Argon2id } from "oslo/password";
import z from "zod";
import { prisma } from "@/lib/prisma";

type SignUpFormState = {
  errors?: {
    login?: string[];
    email?: string[];
    password?: string[];
    confirmPassword?: string[];
    agree?: string[];
  };
  message?: string;
};

const SignUpFormSchema = z
  .object({
    login: z
      .string()
      .min(3, { message: "Логин должен быть не менее 3 символов" }),
    email: z.string().email({ message: "Проверьте адрес email" }),
    password: z
      .string()
      .min(8, { message: "Слишком короткий пароль" })
      .max(20, { message: "Пароль слишком длинный" }),
    confirmPassword: z.string().min(8, { message: "Проверьте пароль" }),
    agree: z
      .string({ message: "Подтвердите согласие перед регистрацией" })
      .min(2),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Пароли не совпадают",
    path: ["password2"],
  });

const signUp = async (
  state: SignUpFormState | undefined,
  formData: FormData
): Promise<SignUpFormState> => {
  const parsedInput = SignUpFormSchema.safeParse({
    login: formData.get("login"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
    agree: formData.get("agree"),
  });
  if (!parsedInput.success) {
    return { errors: parsedInput.error.flatten().fieldErrors };
  }
  if (parsedInput.data.agree !== "on") {
    return { errors: { agree: ["Необходимо согласие"] } };
  }

  // Check if email and login are unique
  const [emailDouble, loginDouble] = await Promise.all([
    prisma.user.findUnique({
      where: {
        email: parsedInput.data.email,
      },
    }),
    prisma.user.findUnique({
      where: {
        login: parsedInput.data.login,
      },
    }),
  ]);

  if (emailDouble) {
    return {
      errors: { email: ["Пользователь с таким адресом email уже существует"] },
    };
  }

  if (loginDouble) {
    return {
      errors: { login: ["Пользователь с таким логином уже существует"] },
    };
  }

  try {
    const hashedPassword = await new Argon2id().hash(parsedInput.data.password);
    const userId = generateId(15);
    await prisma?.user.create({
      data: {
        id: userId,
        login: parsedInput.data.login,
        email: parsedInput.data.email,
        hashedPassword,
      },
    });

    const session = await lucia.createSession(userId, {});
    const sessionCookie = lucia.createSessionCookie(session.id);

    (await cookies()).set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );
  } catch (ex) {
    // TODO: add error feedback yourself
    // https://www.robinwieruch.de/next-forms/
    // TODO: add error handling if user email is already taken
    // The Road to Next
    console.log("signUpErr", ex);
  }
  redirect("/");
};

export { signUp };
