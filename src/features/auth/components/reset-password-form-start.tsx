"use client";
import FormInput from "@/components/Forms/FormInput";
import SubmitButton from "@/components/Forms/SubmitButton";
import { resetPasswordRequest } from "../actions/reset-password";
import { useActionState } from "react";

const ResetPasswordForm = () => {
	const [state, action] = useActionState(resetPasswordRequest, { errors: undefined });
	return (
		<form
			className={"w-[570px] m-auto p-3.5"}
			action={action}
			autoComplete={"on"}
		>
			<div className={"flex flex-col"}>
				<FormInput
					type={"text"}
					name={"login"}
					label={"Логин или E-mail"}
					required
					id={"login"}
					error={state.errors?.login}
				/>
				<SubmitButton text={"Сбросить"} loadingText={"Отправляем ссылку"} />
				{state.message && state.message === "ok" ? (
					<p className={"text-green-700 text-center"}>
						Ссылка для сброса пароля отправлена на Ваш адрес электронной почту.
						<br />
						Ссылка действительна 24 часа.
					</p>
				) : (
					<p className={"text-red-700 text-center"}>{state.message}</p>
				)}
			</div>
		</form>
	);
};

export default ResetPasswordForm;
