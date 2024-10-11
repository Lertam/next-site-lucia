import { FC } from "react";

const FormInput: FC<{
	label: string;
	name: string;
	id: string;
	placeholder?: string;
	type?: "text" | "password" | "email";
	min?: number;
	required?: boolean;
	error?: string[];
	autocomplete?: string
}> = ({ label, type, min, name, id, placeholder, required, error, autocomplete }) => {
	return (
		<div className={"flex flex-col mb-4"}>
			<label htmlFor={id}>{label}</label>
			<input
				className={"border-[#b3b3b3] py-2 px-3"}
				type={type}
				min={min}
				name={name}
				id={id}
				placeholder={placeholder}
				required={required}
				autoComplete={autocomplete}
			/>
			{error && error.length > 0 && (
				<p className={"text-red-500 text-sm"}>{error[0]}</p>
			)}
		</div>
	);
};

export default FormInput;
