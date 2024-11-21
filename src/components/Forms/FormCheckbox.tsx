import { FC } from "react";

const FormCheckbox: FC<{
  label: string;
  id: string;
  name: string;
  error?: string[];
  defaultChecked?: boolean;
}> = ({ label, id, name, error, defaultChecked }) => {
  return (
    <div className={"mb-4 "}>
      <div className={"flex items-start"}>
        <input
          id={id}
          type={"checkbox"}
          name={name}
          className={"mr-2 mt-1"}
          defaultChecked={defaultChecked ? defaultChecked : false}
        />
        <label htmlFor={id}>{label}</label>
      </div>
      {error && error.length > 0 && (
        <p className={"text-red-500 text-sm"}>{error[0]}</p>
      )}
    </div>
  );
};

export default FormCheckbox;
