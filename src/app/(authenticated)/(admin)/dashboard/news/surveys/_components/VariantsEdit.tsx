import { SurveyVariant } from "@prisma/client";
import { generateId } from "lucia";
import { FC, useReducer, useRef } from "react";
type Action = {
  type: string;
  payload?: string;
};
type State = {
  addMode: boolean;
  variants: SurveyVariant[];
};
const VariantsEdit: FC<{ variants: SurveyVariant[]; surveyId: string }> = ({
  surveyId,
  variants,
}) => {
  // TODO Добавление вариантов
  const [state, dispatch] = useReducer(
    (state: State, action: Action): State => {
      switch (action.type) {
        case "toggle_add_mode":
          return { ...state, addMode: !state.addMode };
        case "add":
          return {
            ...state,
            addMode: false,
            variants: [
              ...state.variants,
              {
                id: generateId(15),
                surveyId,
                text: action.payload || "unknown",
              },
            ],
          };
        case "remove":
          return {
            ...state,
            variants: state.variants.filter((v) => v.id !== action.payload),
          };
        default:
          return state;
      }
    },
    { addMode: false, variants }
  );

  return (
    <div className={"flex flex-col"}>
      <button
        onClick={(ev) => {
          ev.preventDefault();
          dispatch({ type: "toggle_add_mode" });
        }}
      >
        Add
      </button>
      {state.addMode && (
        <AddForm
          onSave={(newVariant: string) =>
            dispatch({ type: "add", payload: newVariant })
          }
        />
      )}
      {state.variants.map((v) => (
        <span key={`var-${v.id}`}>
          <input type={"hidden"} name={`variants[][id]`} value={v.id} />
          <input type={"hidden"} name={`variants[][text]`} value={v.text} />
          {v.text}
          <button onClick={() => dispatch({ type: "remove", payload: v.id })}>
            delete
          </button>
        </span>
      ))}
    </div>
  );
};

const AddForm: FC<{ onSave: (newVariant: string) => void }> = ({ onSave }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <div>
      <input ref={inputRef} />
      <button
        onClick={(ev) => {
          ev.preventDefault();
          if (inputRef && inputRef.current) onSave(inputRef.current.value);
        }}
      >
        Save
      </button>
    </div>
  );
};

export default VariantsEdit;
