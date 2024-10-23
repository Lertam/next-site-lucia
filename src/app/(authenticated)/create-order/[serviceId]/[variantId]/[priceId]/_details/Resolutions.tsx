import RadioInput, { RadioInputProps } from "@/components/Forms/RadioInput";
import { FC } from "react";

const RESOLUTIONS: Omit<RadioInputProps, "name">[] = [
  {
    id: "resolution300pd",
    text: "300 п/д",
    value: "300pd",
  },
  {
    id: "resolution150pd",
    text: "150 п/д",
    value: "150pd",
  },
  {
    id: "resolution55pcm",
    text: "55 п/см",
    value: "55pcm",
  },
  {
    id: "resolution125pd",
    text: "125 п/д",
    value: "125pd",
  },
  {
    id: "resolution44pcm",
    text: "44 п/см",
    value: "44pcm",
  },
  {
    id: "resolution160pd",
    text: "106 п/д",
    value: "106pd",
  },
  {
    id: "resolution40pcm",
    text: "40 п/см",
    value: "40pcm",
  },
  {
    id: "resolution96pd",
    text: "96 п/д",
    value: "96pd",
  },
  {
    id: "resolution33pcm",
    text: "33 п/см",
    value: "33pcm",
  },
];

const Resolutions: FC = () => {
  return (
    <div className={"mt-4"}>
      <h4 className={"font-bold"}>Разрешение</h4>
      <div
        className={"grid gap-4 grid-cols-2 sm:grid-cols-4 md:grid-cols-9 mt-4"}
      >
        {RESOLUTIONS.map((r) => (
          <RadioInput
            key={r.id}
            {...r}
            name={"resolution"}
            inputProps={{ required: true }}
          />
        ))}
      </div>
      <div className={"text-gray-600 text-xs mt-2"}>
        Выберите рекомендуемое для вашего станка разрешение эскиза. Необходимо
        для качественного результата.
      </div>
    </div>
  );
};

export default Resolutions;
