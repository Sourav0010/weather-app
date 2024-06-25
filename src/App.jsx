import { useEffect, useState } from 'react'
function App() {
  let [place,setPlace] = useState('Bengaluru');
  let url  = `https://api.weatherapi.com/v1/current.json?key=44213ba3436a4f91b08112436242406&q=${place}&aqi=yes`;
  let [condition,setCondition] = useState("");
  let [humidity,setHumidity] = useState("");
  let [temp,setTemp] = useState("");
  let [wind,setWind] = useState("");
  let [time,setTime] = useState("");
  let [feelsLike,setFeelsLike] = useState("");
  useEffect(() => {
    fetch(url)
    .then(res => res.json())
    .then(data => {
      setPlace(data.location.name);
      setCondition(data.current.condition.text);
      setHumidity(data.current.humidity);
      setTemp(data.current.temp_c);
      setWind(data.current.wind_kph);
      setTime(formatterDate(data.location.localtime));
      setFeelsLike(data.current.feelslike_c);
    })
  },[searchCity])


  function currentLocation(){
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition((position) => {
        let lat = position.coords.latitude;
        let long = position.coords.longitude;
        url = `https://api.weatherapi.com/v1/current.json?key=44213ba3436a4f91b08112436242406&q=${lat},${long}&aqi=yes`;
        fetch(url)
        .then(res => res.json())
        .then(data => {
          setPlace(data.location.name);
          setCondition(data.current.condition.text);
          setHumidity(data.current.humidity);
          setTemp(data.current.temp_c);
          setWind(data.current.wind_kph);
          setTime(formatterDate(data.location.localtime));
          setFeelsLike(data.current.feelslike_c);
        })
      })
    }
  }

  function formatterDate(date){
    let d = date.split(" ")
    let da = d[0].split("-");
    da = da.reverse();
    return da.join('/') + " | " + d[1];
  }

  function searchCity(){
    let city = document.getElementById('price').value;
    setPlace(city);
    url  = `https://api.weatherapi.com/v1/current.json?key=44213ba3436a4f91b08112436242406&q=${city}&aqi=yes`;
    fetch(url)
    .then(res => res.json())
    .then(data => {
      setPlace(data.location.name);
      setCondition(data.current.condition.text);
      setHumidity(data.current.humidity);
      setTemp(data.current.temp_c);
      setWind(data.current.wind_kph);
      setTime(formatterDate(data.location.localtime));
      setFeelsLike(data.current.feelslike_c);
    })
  }

  return (
   <>
    <div className='flex flex-wrap items-center justify-between bg-transparent mx-5 my-3'>
        <div className='text-blue-700'>
            <h1 className=' text-4xl font-medium pb-2'>
                <i className="fa-solid fa-location-dot"></i>
                <span> </span> {place}
                </h1>
           <p>{time}</p>
        </div>
        <div className='flex items-center gap-2'>
            <input type="text" name="price" id="price" className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-blue-300 placeholder:text-gray-400 text-blue-600 focus:ring-blue-400 sm:text-sm sm:leading-6" placeholder="Enter Your city here"></input>
            <button 
            className=' text-blue-700 bg-blue-50  hover:bg-blue-100 py-2 px-4 rounded-md rounded-sm search' onClick={searchCity}>
              Search
            </button>
            <button className=' text-blue-700 bg-blue-50  hover:bg-blue-100 py-2 px-4 rounded-md rounded-sm' onClick={currentLocation}><i className="fa-solid fa-location-crosshairs"></i></button>
        </div>
    </div>
    <div className=' py-16 flex flex-wrap items-center justify-evenly  text-blue-600'>
        <div className=' text-blue-600'>
            <div className='flex'>
            <h1 className=' text-9xl'>{temp}</h1>
            <p className='mt-3 text-base'>°c</p>
            </div>
            <p className=' text-sm text-center mt-2'>{condition}</p>
        </div>
        <div className='flex gap-3 flex-col'> 
                <p><i className="fa-solid fa-temperature-three-quarters"></i> Feels like : <span>{feelsLike} °c</span></p>
                <p><i className="fa-solid fa-droplet"></i> Humidity : <span>{humidity} </span>%</p>
                <p><i className="fa-solid fa-wind"></i> Wind : <span>{wind} km/h</span></p>
        </div>
    </div>
   </>
  )
}

export default App
