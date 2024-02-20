import React from 'react'

export default function NextButton({dispatch} : {dispatch: ({type} : {type:string}) => void}) {
  return (
    <button onClick={() => dispatch({type: 'nextQuestion'})} className='px-8 py-2 rounded-full bg-slate-600 hover:bg-slate-700'>
        Next
    </button>
  )
}
