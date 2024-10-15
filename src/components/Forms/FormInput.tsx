import {
  FC,
  HTMLInputAutoCompleteAttribute,
  HTMLInputTypeAttribute,
} from "react";

const FormInput: FC<{
  label: string;
  name: string;
  id: string;
  placeholder?: string;
  type?: HTMLInputTypeAttribute;
  min?: number;
  required?: boolean;
  error?: string[];
  autocomplete?: HTMLInputAutoCompleteAttribute;
  defaultValue?: string | number;
}> = ({
  label,
  type,
  min,
  name,
  id,
  placeholder,
  required,
  error,
  autocomplete,
  defaultValue,
}) => {
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
        defaultValue={defaultValue}
      />
      {error && error.length > 0 && (
        <p className={"text-red-500 text-sm"}>{error[0]}</p>
      )}
    </div>
  );
};

export default FormInput;
