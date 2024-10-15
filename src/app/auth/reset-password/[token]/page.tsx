import ResetPasswordFormPassword from "@/features/auth/components/reset-password-form-password";

const ResetPasswordFinal = async ({
	params: { token },
}: {
	params: { token: string };
}) => {
	const userToken = await prisma?.passwordResetToken.findUnique({
		where: {
			token,
		},
		include: {
			user: true,
		},
	});
	console.log(userToken);
	if (!userToken || new Date() > userToken.expires) {
		return <h1 className={"text-center font-semibold mt-4 uppercase"}>Ссылка не действительна</h1>;
	}
	return (
		<>
			<h1 className={"text-center font-semibold mt-4 uppercase"}>
				Восстановление пароля
			</h1>
            <ResetPasswordFormPassword token={token} />
		</>
	);
};

export default ResetPasswordFinal;
