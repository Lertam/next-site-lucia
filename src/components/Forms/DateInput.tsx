import { FC, HTMLAttributes, useRef } from "react";

const DateInput: FC<{
  defaultValue?: string;
  onChange: (nextVal: string) => void;
  inputProps?: HTMLAttributes<HTMLInputElement>;
  containerProps?: HTMLAttributes<HTMLDivElement>;
}> = ({ defaultValue, onChange, inputProps, containerProps }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <div {...containerProps} onClick={() => inputRef.current?.showPicker()}>
      <input
        ref={inputRef}
        type={"date"}
        onChange={(ev) => onChange(ev.target.value)}
        value={defaultValue}
        {...inputProps}
        className={"date-picker"}
      />
    </div>
  );
};

export default DateInput;
