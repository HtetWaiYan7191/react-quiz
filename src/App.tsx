import React, { useEffect, useReducer } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import Loader from "./components/Loader";
import Start from "./components/Start";
import Question from "./components/Question";
import ProgressBar from "./components/ProgressBar";
import NextButton from "./components/NextButton";
import FinishedScreen from "./components/FinishedScreen";
import Timer from "./components/Timer";
import { useQuizz } from "./context/QuizzContext";
// Define action types


const App = () => {
  const {status, dispatch} = useQuizz();
  return (
    <div>
      <Header />
      <Main>
        {status === "loading" && <Loader />}

        {status === "error" && <p className="text-center"> Failed fetch quizz 😞</p>}

        {status === "ready" && (
          <>
            <Start />
          </>
        )}

        {status === "active" && (
          <>
            <ProgressBar
            />
            <Question
            />
            <div className=" next-btn-container w-[40%] mx-auto flex justify-between items-center mt-6">
              <Timer/>
              <NextButton
              />
            </div>
          </>
        )}

        {status === "finished" && (
          <>
            <FinishedScreen  />
            <div className=" next-btn-container w-[50%] mx-auto flex justify-end mt-6">
              <button onClick={() => dispatch({type: 'restart'})} className="px-8 py-2 rounded-full bg-slate-600 hover:bg-slate-700">
                Restart Quiz
              </button>
            </div>
          </>
        )}
      </Main>
    </div>
  );
};

export default App;
