import { FC } from "react";
import { useFormStatus } from "react-dom";

const SubmitButton: FC<{ text?: string; loadingText?: string }> = ({
	text,
	loadingText,
}) => {
	const { pending } = useFormStatus();

	let result = "Подтвердить";
	if (pending) {
		if (loadingText) result = loadingText;
		else result = "Подтверждаем";
	} else if (text) {
		result = text;
	}
	return (
		<button className={"bg-foreground m-auto text-white px-[30px] py-[10px]"}>
			{result}
		</button>
	);
};

export default SubmitButton;
