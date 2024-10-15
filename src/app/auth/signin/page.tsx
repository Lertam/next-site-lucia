import SignInForm from "@/features/auth/components/sign-in-form";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Вход",
};

const SignInPage = () => {
  return (
    <>
      <h1 className={"text-center font-semibold mt-4 uppercase"}>Вход</h1>
      <SignInForm />
      <div className={"text-center"}><Link href={"/auth/reset-password"}>Забыли пароль?</Link>
      </div>
    </>
  );
};

export default SignInPage;
