import React, { useEffect, useState } from 'react'

export default function ProgressBar({answer, index, totalQuestions, points, totalPoints} : {answer:null| number; index: number; totalQuestions:number; points:number; totalPoints:number}) {

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
