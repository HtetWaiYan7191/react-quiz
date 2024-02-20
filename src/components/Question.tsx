import React from "react";
import { StateProps } from "../App";
import Option from "./Option";

export default function Question({
  question,
  answer,
  dispatch,
}: {
  question: {
    question: string;
    options: string[];
    correctOption: number;
    points: number;
  };
  dispatch: () => void;
  answer: number | null;
}) {
  const hasAnswered = answer !== null;
  return (
    <div className="question-container mx-auto  w-[60%] py-6 items-center">
      <h2 className="text-xl font-semibold mb-6 text-center">
        {question.question}
      </h2>
      <div className="options-container flex flex-col w-[50%] mx-auto">
        {question.options.map((option, index) => (
          <button
          key={option}
            onClick={() => dispatch({ type: "newAnswer", payload: index })}
            className={`bg-slate-700 hover:ml-6 hover:border-white hover:border ${
              answer === index ? "ml-6" : ""
            } ${
              hasAnswered
                ? index === question.correctOption
                  ? "bg-green-300"
                  : "bg-yellow-700"
                : ""
            } transition-all hover:bg-slate-600 w-full rounded-full p-3 my-2`}
            disabled={hasAnswered}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
