import { FC } from "react";

const FormSwitch: FC<{
  label: string;
  defaultChecked?: boolean;
  id: string;
  name: string;
  error?: string[];
}> = ({ label, defaultChecked: checked, name, id, error }) => {
  return (
    <div className={"mb-4"}>
      <label className={"inline-flex items-center cursor-pointer"}>
        <input
          type={"checkbox"}
          value={"checked"}
          className={"sr-only peer"}
          defaultChecked={checked}
          id={id}
          name={name}
        />
        <div
          className={
            "relative w-11 h-6 bg-background peer-focus:outline-none ring-2 ring-foreground rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-foreground"
          }
        ></div>
        <span className={"ms-3 text-sm font-medium"}>{label}</span>
      </label>
      {error && error.length > 0 && (
        <p className={"text-red-500 text-sm"}>{error[0]}</p>
      )}
    </div>
  );
};

export default FormSwitch;
