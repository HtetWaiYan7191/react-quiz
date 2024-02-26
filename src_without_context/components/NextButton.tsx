import React from 'react'

export default function NextButton({dispatch, index, questionsLength} : {dispatch: ({type} : {type:string}) => void;  index:number; questionsLength:number}) {
  return (
    <>
        {
      index === questionsLength - 1 ? (
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
