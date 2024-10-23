import { FC, InputHTMLAttributes, ReactNode } from "react";

const FileInput: FC<{
  id: string;
  name: string;
  value?: string;
  label: string | ReactNode;
  error?: string[];
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
}> = ({ id, name, value, label, error, inputProps }) => {
  console.log(value);
  return (
    <div className={"flex flex-col mb-4"}>
      {value && value.length > 0 && <img src={value} className={"max-w-40"} />}
      {typeof label === "string" ? (
        <label htmlFor={id}>{label}</label>
      ) : (
        <>{label}</>
      )}
      <input type={"file"} id={id} name={name} {...inputProps} />
      {error && error.length > 0 && (
        <p className={"text-red-500 text-sm"}>{error[0]}</p>
      )}
    </div>
  );
};

export default FileInput;
