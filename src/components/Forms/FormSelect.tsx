import { FC } from "react";

const FormSelect: FC<{
  options: Array<{ value: string; label: string }>;
  name: string;
  label: string;
  id: string;
  value: string | null;
}> = ({ id, name, options, label, value }) => {
  return (
    <div>
      <label htmlFor={id} className={"mr-4"}>
        {label}
      </label>
      <select
        id={id}
        name={name}
        className={"rounded p-2"}
        defaultValue={value ? value : undefined}
      >
        <option>Выберите</option>
        {options.map((opt, ind) => (
          <option value={opt.value} key={`ctgr-${ind}`}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FormSelect;
