import {
  ChangeEvent,
  FC,
  HTMLInputAutoCompleteAttribute,
  HTMLInputTypeAttribute,
  ReactNode,
} from "react";

const FormInput: FC<{
  label: string | ReactNode;
  name: string;
  id: string;
  placeholder?: string;
  type?: HTMLInputTypeAttribute;
  min?: number;
  required?: boolean;
  error?: string[];
  autocomplete?: HTMLInputAutoCompleteAttribute;
  defaultValue?: string | number;
  value?: string | number;
  onChange?: (ev: ChangeEvent<HTMLInputElement>) => void;
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
  value,
  onChange,
}) => {
  return (
    <div className={"flex flex-col mb-4"}>
      {typeof label === "string" ? (
        <label htmlFor={id}>{label}</label>
      ) : (
        <>{label}</>
      )}
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
        value={value ? value : undefined}
        onChange={value && onChange ? onChange : undefined}
      />
      {error && error.length > 0 && (
        <p className={"text-red-500 text-sm"}>{error[0]}</p>
      )}
    </div>
  );
};

export default FormInput;
