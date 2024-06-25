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
    if(city.trim() === "") return;
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
   <div>
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
    <div className=' absolute bottom-1 text-white font-poppins-Regular flex items-center justify-center w-full'>
      <p>Made with love by 💓Sourav</p>
    </div>
   </div>
  )
}

export default App
