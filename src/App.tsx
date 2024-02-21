import React, { useEffect, useReducer } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import Loader from "./components/Loader";
import Start from "./components/Start";
import Question from "./components/Question";
// Define action types
type ActionType = { type: string; payload?: string[] };

// Define state type
export interface StateProps {
  questions: string[];
  status: string;
  index:number;
  answer: null | number;
  points: number;
}

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
        status: 'active',
      };
    case "newAnswer":
      const question = state.questions[state.index];
      console.log(question);
      console.log(action.payload)
      return {
          ...state,
          answer: action.payload,
          points: action.payload === question.correctOption ? state.points + question.points : state.points
      }
    case "nextQuestion":
      return {
        ...state,
        index: state.index + 1,
        answer: null,
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
};

const App = () => {
  const [{ questions, status, index, answer, points }, dispatch] = useReducer(reducer, initialState);
  console.log(points);
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
           <Start questions={questions} dispatch={dispatch}/>
          </>
        )}

        {status === "active" && <Question dispatch={dispatch} answer={answer} question={questions[index]}/>}
      </Main>
    </div>
  );
};

export default App;
