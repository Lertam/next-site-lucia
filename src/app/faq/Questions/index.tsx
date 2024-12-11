"use client";

import { Faq } from "@prisma/client";
import { FC, useReducer } from "react";
import Question from "./Question";

type State = Record<string, boolean>;

const Questions: FC<{ questions: Faq[] }> = ({ questions }) => {
  const [state, dispatch] = useReducer(
    (state: State, action: string): State => {
      const keys = questions.map((q) => q.id);
      const newState: State = {};
      keys.forEach((key) => {
        newState[key] = false;
      });

      if (state[action]) {
        newState[action] = false;
      } else {
        newState[action] = true;
      }

      return newState;
    },
    {},
    () => {
      const keys = questions.map((q) => q.id);
      const state: State = {};
      keys.forEach((key) => {
        state[key] = false;
      });
      return state;
    }
  );

  return (
    <div className={"flex flex-col gap-6"}>
      {questions.map((q) => (
        <Question
          key={`faq-${q.id}`}
          {...q}
          isOpen={state[q.id]}
          close={() => dispatch(q.id)}
        />
      ))}
    </div>
  );
};

export default Questions;
