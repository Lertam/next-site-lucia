import { FC, InputHTMLAttributes, RefObject } from "react";

export type RadioInputProps = {
  id: string;
  name: string;
  text: string;
  value: string;
  // onChange: () => void;
};

const RadioInput: FC<
  RadioInputProps & {
    ref?: RefObject<HTMLInputElement>;
    inputProps?: InputHTMLAttributes<unknown>;
    classes?: string;
    error?: string[];
  }
> = ({ id, name, text, value, ref, inputProps, classes, error }) => {
  // TODO Сменить цвет
  return (
    <div className={"flex gap-1 items-center pl-6 " + classes}>
      <input
        type={"radio"}
        id={id}
        name={name}
        value={value}
        ref={ref}
        {...inputProps}
        className={
          "cursor-pointer appearance-none hidden peer " + inputProps?.className
        }
      />
      <label
        htmlFor={id}
        className={`cursor-pointer before:inline-block before:w-4 before:mr-2 before:h-4 before:border-2 before:border-foreground before:rounded-full flex items-center peer-checked:before:bg-foreground peer-checked:before:p-1 ${
          error ? " text-red-700" : ""
        }`}
      >
        {text}
      </label>
      {error && error.length > 0 && (
        <span className={"text-red-700 test-xs"}>{error[0]}</span>
      )}
    </div>
  );
};

export default RadioInput;
