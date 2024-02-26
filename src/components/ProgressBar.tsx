import React from 'react'
import { useQuizz } from '../context/QuizzContext';

export default function ProgressBar() {
  const {answer, index, questions, points, totalPoints} = useQuizz();
  const totalQuestions = questions.length;
  return (
    <div className='progress-bar-container w-[50%] mx-auto'>
        <progress max={totalQuestions} value={index + Number(answer !== null)} className='w-full'></progress>
        <div className="flex justify-between question-points">
            <h2>Question {index+1}/{totalQuestions}</h2>
            <h2>{points} / {totalPoints} </h2>
        </div>
    </div>
  )
}
