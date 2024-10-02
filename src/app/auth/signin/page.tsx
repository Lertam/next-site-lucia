import SignInForm from "@/features/auth/components/sign-in-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Вход",
};

const SignInPage = () => {
  return (
    <>
      <h1 className={"text-center font-semibold mt-4 uppercase"}>Вход</h1>
      <SignInForm />
    </>
  );
};

export default SignInPage;
