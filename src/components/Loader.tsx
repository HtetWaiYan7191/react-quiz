import React from 'react'

export default function Loader() {
  return (
    <div className='flex justify-center my-8 loading-container'>
        <div className="loader"></div>
        <p>Loading questions...</p>
    </div>
  )
}
