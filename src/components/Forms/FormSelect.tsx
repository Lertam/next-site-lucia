import { ComponentPropsWithoutRef, FC } from "react";

const FormSelect: FC<{
  options: Array<{ value: string; label: string }>;
  name: string;
  label: string;
  id: string;
  value: string | null;
  containerProps?: ComponentPropsWithoutRef<"div">;
  inputProps?: ComponentPropsWithoutRef<"select">;
  error?: string[];
}> = ({
  id,
  name,
  options,
  label,
  value,
  containerProps,
  inputProps,
  error,
}) => {
  return (
    <>
      <div {...containerProps}>
        <label htmlFor={id} className={"mr-4"}>
          {label}
        </label>
        <select
          id={id}
          name={name}
          className={"rounded p-2"}
          defaultValue={value ? value : undefined}
          {...inputProps}
        >
          <option>Выберите</option>
          {options.map((opt, ind) => (
            <option value={opt.value} key={`ctgr-${ind}`}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
      {error && error.length > 0 && (
        <p className={"text-red-500 text-sm mt-2 text-center"}>{error[0]}</p>
      )}
    </>
  );
};

export default FormSelect;
