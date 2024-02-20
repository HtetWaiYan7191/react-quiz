import React, { useEffect, useReducer } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import Loader from "./components/Loader";
import Start from "./components/Start";

// Define action types
type ActionType = { type: string; payload?: string[] };

// Define state type
interface StateProps {
  questions: string[];
  status: string;
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
    default:
      throw new Error("Unknown");
  }
}

const initialState: StateProps = {
  questions: [],
  status: "loading",
};

const App = () => {
  const [{ questions, status }, dispatch] = useReducer(reducer, initialState);
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
           <Start questions={questions}/>
          </>
        )}
      </Main>
    </div>
  );
};

export default App;
