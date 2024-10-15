import ResetPasswordForm from "@/features/auth/components/reset-password-form-start";

const ResetPasswordPage = () => {
    return <>
    <h1 className={"text-center font-semibold mt-4 uppercase"}>Восстановление пароля</h1>
    <ResetPasswordForm />
  </>
}

export default ResetPasswordPage;