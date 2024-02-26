import React from 'react'
import { useQuizz } from '../context/QuizzContext';

export default function Start() {
  const {questions, dispatch} = useQuizz();
  return (
    <div className='start-container *:mb-4'>
        <h2 className='text-3xl font-bold text-center'>Welcome to The React Quiz ! </h2>
        <p className='text-lg font-semibold text-center'>{questions.length} questions to test your React Mastery 🥳</p>
        <div className="text-center btn-container">
        <button onClick={() => dispatch({type: 'statusActive'})} className='px-8 py-2 rounded-full bg-slate-600 hover:bg-slate-700'>
            Let's Start 🔥🔥
        </button>
        </div>
    </div>
  )
}
