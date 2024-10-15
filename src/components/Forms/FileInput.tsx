import { FC } from "react";

const FileInput: FC<{
  id: string;
  name: string;
  value?: string;
  label: string;
  error?: string[];
}> = ({ id, name, value, label, error }) => {
  return (
    <div className={"flex flex-col mb-4"}>
      {value && <img src={value} />}
      <label htmlFor={id}>{label}</label>
      <input type={"file"} id={id} name={name} />
      {error && error.length > 0 && (
        <p className={"text-red-500 text-sm"}>{error[0]}</p>
      )}
    </div>
  );
};

export default FileInput;
