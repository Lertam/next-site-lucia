import React from "react";
import Link from "next/link";
import { signOut } from "@/features/auth/actions/sign-out";
import { getAuth } from "@/features/auth/queries/get-auth";

const AuthBlock = async () => {
  const { user } = await getAuth();

  if (!user) {
    return (
      <>
        <li>
          <Link href="/auth/signup">Регистрация</Link>
        </li>
        <li>
          <Link href="/auth/signin">Войти</Link>
        </li>
      </>
    );
  } else {
    return (
      <form action={signOut}>
        <button>Выйти</button>
      </form>
    );
  }
};

export default AuthBlock;
