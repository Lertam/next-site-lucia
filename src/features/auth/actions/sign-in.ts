"use server";
import { prisma } from "@/lib/prisma";
import { lucia } from "@/lib/lucia";
import { Argon2id } from "oslo/password";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

type SignInFormState = {
  errors?: {
    login?: string[];
    password?: string[];
  };
  message?: string;
};

const SignInFormSchema = z.object({
  login: z
    .string()
    .min(3, { message: "Логин должен быть не менее 3 символов" }),
  password: z
    .string()
    .min(8, { message: "Слишком короткий пароль" })
    .max(20, { message: "Пароль слишком длинный" }),
});

const signIn = async (
  state: SignInFormState,
  formData: FormData
): Promise<SignInFormState> => {
  const parsedInput = SignInFormSchema.safeParse({
    login: formData.get("login"),
    password: formData.get("password"),
  });

  if (!parsedInput.success) {
    return { errors: parsedInput.error.flatten().fieldErrors };
  }
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
      return { errors: { password: ["Неправильный логин или пароль"] } };
    }

    const validPassword = await new Argon2id().verify(
      user.hashedPassword,
      parsedInput.data.password
    );
    console.log(user.hashedPassword);

    if (!validPassword) {
      return { errors: { password: ["Неправильный логин или пароль"] } };
    }

    const session = await lucia.createSession(user.id, {});
    const sessionCookie = await lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );
  } catch (error) {
    // TODO: add error feedback yourself
    // https://www.robinwieruch.de/next-forms/
    console.log("SignInErr", error);
  }

  redirect("/dashboard");
};

export { signIn };
