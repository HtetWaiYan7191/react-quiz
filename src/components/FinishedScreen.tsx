import React from 'react'

export default function FinishedScreen({points, highScore, totalPoints} : {points: number; totalPoints: number; highScore:number}) {
    const percentage =  (100 * points) / totalPoints;
    let emoji;
    if(percentage === 100 ) emoji = "🏆";
    if(percentage >= 80 && percentage < 100) emoji = "🥳"
    if(percentage >= 60 && percentage < 80) emoji = "🥈"
    if(percentage >=40 && percentage < 60) emoji = "🤨"
    if(percentage > 0 && percentage < 40) emoji = "🥲"
    if(percentage === 0) emoji = "🤦"
  return (
    <div className='finished-screen w-[70%] mx-auto'>
        <p className='px-5 py-3 mb-4 text-xl text-center rounded-full bg-sky-800'>{emoji} You scored {points} out of {totalPoints} points ({Math.ceil(percentage)} %)</p>
        <p className='text-center'>(Highscore: {highScore} points)</p>
    </div>
  )
}
