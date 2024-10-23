import { FC, InputHTMLAttributes, RefObject } from "react";

export type RadioInputProps = {
  id: string;
  name: string;
  text: string;
  value: string;
};

const RadioInput: FC<
  RadioInputProps & {
    ref?: RefObject<HTMLInputElement>;
    inputProps?: InputHTMLAttributes<unknown>;
  }
> = ({ id, name, text, value, ref, inputProps }) => {
  return (
    <div className={"flex gap-1 items-center"}>
      <input
        type={"radio"}
        id={id}
        name={name}
        value={value}
        ref={ref}
        {...inputProps}
      />
      <label htmlFor={id}>
        {text}
      </label>
    </div>
  );
};

export default RadioInput;
