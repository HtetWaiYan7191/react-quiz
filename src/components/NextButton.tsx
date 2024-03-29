import React from 'react'
import { useQuizz } from '../context/QuizzContext';

export default function NextButton() {
  const {dispatch, index, questions} = useQuizz();
  return (
    <>
        {
      index === questions.length - 1 ? (
        <button onClick={() => dispatch({type: 'finished'})} className='px-8 py-2 rounded-full bg-slate-600 hover:bg-slate-700'>
          Finish
        </button>
      ) : (
        <button onClick={() => dispatch({type: 'nextQuestion'})} className='px-8 py-2 rounded-full bg-slate-600 hover:bg-slate-700'>
          Next
        </button>
      )
    }
    </>
  )
}
