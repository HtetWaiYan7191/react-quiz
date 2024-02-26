import { createContext, useEffect, useContext, useReducer } from "react";
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

const QuizzContext = createContext();
const initialState:StateProps = {
    questions: [],
    status: "loading",
    index: 0,
    answer: null,
    points: 0,
    highScore: 0,
    secondsRemaining: null,
}
const SEC_PER_QUE = 20;
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

function QuizzProvider({children}) {
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
        <QuizzContext.Provider value={{questions, status, index, answer, points, totalPoints, highScore, secondsRemaining, dispatch}}>
            {children}
        </QuizzContext.Provider>
    )
}

function useQuizz() {
    const context = useContext(QuizzContext);
    if(context === undefined) 
    throw new Error("Quizz Context was used outside the Auth Provider")
    return context
}

export {QuizzProvider, useQuizz};