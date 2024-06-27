import React from 'react'

function Maincomp({temp,condition,humidity,wind,feelsLike}) {
  return (
    <div className=' py-16 flex flex-wrap items-center justify-evenly  text-blue-600'>
        <div className=' text-white px-6 py-4 border border-white rounded-md'>
            <div className='flex'>
            <h1 className=' text-9xl'>{temp}</h1>
            <p className='mt-3 text-base'>°c</p>
            </div>
            <p className=' text-base text-center mt-2'>{condition}</p>
        </div>
        <div className='flex gap-3 flex-col px-6 py-4 border border-white rounded-md text-white'> 
                <p><i className="fa-solid fa-temperature-three-quarters"></i> Feels like : <span>{feelsLike} °c</span></p>
                <p><i className="fa-solid fa-droplet"></i> Humidity : <span>{humidity} </span>%</p>
                <p><i className="fa-solid fa-wind"></i> Wind : <span>{wind} km/h</span></p>
        </div>
    </div>
  )
}

export default Maincomp