import { useEffect, useState } from 'react'
import { Header,Maincomp } from './Components';
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
      update(data);
    })
  },[searchCity])

  function update(data){
      setPlace(data.location.name);
      setCondition(data.current.condition.text);
      setHumidity(data.current.humidity);
      setTemp(data.current.temp_c);
      setWind(data.current.wind_kph);
      setTime(formatterDate(data.location.localtime));
      setFeelsLike(data.current.feelslike_c);
  }
  
  function currentLocation(){
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition((position) => {
        let lat = position.coords.latitude;
        let long = position.coords.longitude;
        url = `https://api.weatherapi.com/v1/current.json?key=44213ba3436a4f91b08112436242406&q=${lat},${long}&aqi=yes`;
        fetch(url)
        .then(res => res.json())
        .then(data => {
          update(data);
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
      update(data);
    })
  }

  return (
   <div>
    <Header place={place} searchCity={searchCity} currentLocation={currentLocation} time={time}/>

    <Maincomp temp={temp} condition={condition} feelsLike={feelsLike} humidity={humidity} wind={wind}/>
    
    <div className=' absolute bottom-1 text-white font-poppins-Regular flex items-center justify-center w-full'>
      <p>Made with love by 💓Sourav</p>
    </div>
   </div>
  )
}

export default App
