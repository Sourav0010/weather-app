import React from 'react'

function Header({place,time,searchCity,currentLocation}) {
  return (
    <div className='flex flex-wrap items-center justify-between bg-transparent py-4 px-3'>
        
        <div className='text-white max-sm:flex flex-wrap items-center justify-between max-sm:w-full'>
            <h1 className=' font-poppinsMedium text-4xl font-medium pb-2'>
                {place}
                </h1>
           <p className='font-poppinsRegular text-[12px]'>{time}</p>
        </div>

        <div className='flex items-center gap-2'>
            <div className='flex gap-2 border rounded-md border-white'>
              <input type="text" name="price" id="price" className=" text-white bg-transparent  px-2 py-2 rounded-md backdrop-blur-sm focus:ring-transparent focus-within:ring-transparent outline-none" placeholder="Enter Your city here"></input>
            <button 
            className='py-2 rounded-md px-4 text-black bg-white search' onClick={searchCity}>
              Search
            </button>
            </div>
            <button className=' py-2 rounded-md px-4 text-black bg-white' onClick={currentLocation}><i className="fa-solid fa-location-crosshairs"></i></button>
        </div>
    </div>
  )
}

export default Header