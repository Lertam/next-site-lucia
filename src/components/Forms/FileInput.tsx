import { FC } from "react";

const FileInput: FC<{
  id: string;
  name: string;
  value?: string;
  label: string;
  error?: string[];
}> = ({ id, name, value, label, error }) => {
  console.log(value);
  return (
    <div className={"flex flex-col mb-4"}>
      {value && value.length > 0 && <img src={value} className={"max-w-40"}/>}
      <label htmlFor={id}>{label}</label>
      <input type={"file"} id={id} name={name} />
      {error && error.length > 0 && (
        <p className={"text-red-500 text-sm"}>{error[0]}</p>
      )}
    </div>
  );
};

export default FileInput;
