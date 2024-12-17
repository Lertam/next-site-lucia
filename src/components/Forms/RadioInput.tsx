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
  return (
    <div className={"flex gap-1 items-center " + classes}>
      <input
        type={"radio"}
        id={id}
        name={name}
        value={value}
        ref={ref}
        {...inputProps}
        className={"cursor-pointer"}
      />
      <label
        htmlFor={id}
        className={`cursor-pointer${error ? " text-red-700" : ""}`}
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
