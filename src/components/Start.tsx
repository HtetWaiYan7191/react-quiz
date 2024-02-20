import React from 'react'

export default function Start({questions} : {questions: string[]}) {
  return (
    <div className='start-container *:mb-4'>
        <h2 className='text-3xl font-bold text-center'>Welcome to The React Quiz ! </h2>
        <p className='text-lg font-semibold text-center'>{questions.length} questions to test your React Mastery 🥳</p>
        <div className="btn-container text-center">
        <button className='bg-slate-600 px-8 py-2 rounded-full hover:bg-slate-700'>
            Let's Start 🔥🔥
        </button>
        </div>
    </div>
  )
}
