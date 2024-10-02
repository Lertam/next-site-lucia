import SignUpForm from "@/features/auth/components/sign-up-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Регистрация",
};

const SignUpPage = () => {
  return (
    <>
      <h1 className={"text-center font-semibold mt-4 uppercase"}>
        Регистрация
      </h1>
      <SignUpForm />
    </>
  );
};

export default SignUpPage;
