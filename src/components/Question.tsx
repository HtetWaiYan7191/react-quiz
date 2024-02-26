import React, { useContext } from "react";
import { StateProps } from "../App";
import Option from "./Option";
import NextButton from "./NextButton";
import { useQuizz } from "../context/QuizzContext";

export default function Question() {
  const {questions, answer, dispatch} = useQuizz();
  const question = questions.at(index);
  const hasAnswered = answer !== null;
  
  return (
    <div className="question-container mx-auto  w-[60%] py-6 items-center">
      <h2 className="mb-6 text-xl font-semibold text-center">
        {question.question}
      </h2>
      <div className="options-container flex flex-col w-[50%] mx-auto">
        {question.options.map((option, index) => (
          <button
            key={option}
            onClick={() => dispatch({ type: "newAnswer", payload: index })}
            className={`border-2 border-white/90 hover:ml-6  ${
              answer === index ? "ml-6" : ""
            } ${
              hasAnswered
                ? index === question.correctOption
                  ? "bg-sky-500"
                  : "bg-yellow-700"
                : ""
            } transition-all  w-full rounded-full p-3 my-2`}
            disabled={hasAnswered}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
