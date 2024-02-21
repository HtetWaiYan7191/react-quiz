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
// Define action types
type ActionType = { type: string; payload?: string[] };

// Define state type
export interface StateProps {
  questions: string[];
  status: string;
  index: number;
  answer: null | number;
  points: number;
  highScore:number;
  secondsRemaining:number | null;
}

const SEC_PER_QUE = 20;
// Define reducer function
function reducer(state: StateProps, action: ActionType) {
  switch (action.type) {
    case "fetchSuccess":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };
    case "fetchFailed":
      return {
        ...state,
        status: "error",
      };
    case "statusActive":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * SEC_PER_QUE,

      };
    case "newAnswer":
      const question = state.questions[state.index];
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "nextQuestion":
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      };
    case "finished":
      return {
        ...state,
        status: "finished",
        highScore: state.points > state.highScore ? state.points : state.highScore,
      };
      case 'restart':
        return {
          ...initialState, questions: state.questions, status: 'ready', highScore: state.highScore
        }
      case 'timeTick':
          return {
            ...state,
            secondsRemaining: state.secondsRemaining !== null && state.secondsRemaining - 1,
            status: state.secondsRemaining === 0 ? 'finished' : state.status
          }
    default:
      throw new Error("Unknown");
  }
}

const initialState: StateProps = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highScore: 0,
  secondsRemaining: null,
};

const App = () => {
  const [{ questions, status, index, answer, points, highScore, secondsRemaining }, dispatch] = useReducer(
    reducer,
    initialState
  );
  const totalPoints = questions
    .map((question:StateProps) => question.points)
    .reduce((a:number, b:number) => a + b, 0);
  useEffect(() => {
    async function fetchData() {
      try {
        const result = await fetch("http://localhost:8000/questions");
        const data = await result.json();
        dispatch({ type: "fetchSuccess", payload: data });
      } catch (err) {
        dispatch({ type: "fetchFailed" });
      }
    }
    fetchData(); // Call the async function inside useEffect
  }, []);

  return (
    <div>
      <Header />
      <Main>
        {status === "loading" && <Loader />}

        {status === "error" && <p> Failed fetch quizz 😞</p>}

        {status === "ready" && (
          <>
            <Start questions={questions} dispatch={dispatch} />
          </>
        )}

        {status === "active" && (
          <>
            <ProgressBar
              answer={answer}
              index={index}
              totalQuestions={questions.length}
              points={points}
              totalPoints={totalPoints}
            />
            <Question
              dispatch={dispatch}
              answer={answer}
              question={questions[index]}
            />
            <div className=" next-btn-container w-[40%] mx-auto flex justify-between items-center mt-6">
              <Timer secondsRemaining={secondsRemaining} dispatch={dispatch}/>
              <NextButton
                dispatch={dispatch}
                index={index}
                questionsLength={questions.length}
              />
            </div>
          </>
        )}

        {status === "finished" && (
          <>
            <FinishedScreen highScore={highScore} points={points} totalPoints={totalPoints} />
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
