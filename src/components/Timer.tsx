import React, { useEffect } from 'react'
import { useQuizz } from '../context/QuizzContext';

export default function Timer() {
  const {secondsRemaining, dispatch} = useQuizz();
    const mins = Math.floor(secondsRemaining/60) ;
    const seconds = secondsRemaining % 60;
    useEffect(() => {
        const id = setInterval(() => {
            dispatch({type: 'timeTick'})
        }, 1000)

        return (() =>  clearInterval(id))
    }, [dispatch])
  return (
    <div className='px-8 py-2 rounded-full timer-container bg-slate-600'>
        {mins < 10 && "0"}{mins} : {seconds < 10 && "0"}{seconds}
    </div>
  )
}
