import {
  ChangeEvent,
  ComponentPropsWithoutRef,
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
  inline?: boolean;
  helper?: string;
  inputProps?: ComponentPropsWithoutRef<"input">;
  containerProps?: ComponentPropsWithoutRef<"div">;
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
  inline,
  helper,
  inputProps,
  containerProps,
}) => {
  return (
    <>
      <div
        className={`flex ${!inline ? "flex-col" : " items-center gap-4"} mb-4`}
        {...containerProps}
      >
        {typeof label === "string" ? (
          <label htmlFor={id}>{label}</label>
        ) : (
          <>{label}</>
        )}
        <input
          className={"border-[#b3b3b3] py-2 px-3" + (inline ? " max-w-20" : "")}
          type={type ? type : "text"}
          min={min}
          name={name}
          id={id}
          placeholder={placeholder}
          required={required}
          autoComplete={autocomplete}
          defaultValue={defaultValue}
          value={value ? value : undefined}
          onChange={value && onChange ? onChange : undefined}
          {...inputProps}
        />
        {helper && <span className={"text-xs text-gray-500"}>{helper}</span>}
      </div>
      {error && error.length > 0 && (
        <p className={"text-red-500 text-sm text-center mt-2"}>{error[0]}</p>
      )}
    </>
  );
};

export default FormInput;
