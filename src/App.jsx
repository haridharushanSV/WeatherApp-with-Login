import { useEffect, useState } from 'react'
import './App.css'
// images
import searchi from './assets/searchi.png';
import rain from './assets/rain.png';
import cloud from './assets/cloud.png';
import snow from './assets/snow.png';
import wind from './assets/wind.png';
import sun from './assets/sun.png';
import humidity from './assets/humidity.png';
import clear from './assets/clear.png';
import sungif from './assets/sungif.gif';
import moongif from './assets/moongif.gif';
import raingif from './assets/raingif.gif';
import cloudgif from './assets/cloudgif.gif';
import snowgif from './assets/snowgif.gif';
import bg from './assets/bg.jpg';
import bg1 from './assets/bg.gif';

// Git => Haridharushan_sv


const Weatherdetails=({icon,temp,city,country,lat,lon,humiditypercent,windspeed,Text,pressure,desc}) => {
  return(
    <>
    <div className="image">
      <img src={icon} height='70px'/></div>
      <div className="des">{desc}</div>
    <div className="temp">{temp}°C</div>
    <div className="region">{city}</div>
    <div className="country">{country}</div>
    <div className="latlon">
    <div>
      <span className='lat'>Latitude</span>
      <span>{lat}</span>
    </div>
    <div>
      <span className='log'>Longitude</span>
      <span>{lon}</span>
    </div>
    <div>
      <span className='pres'>pressure</span>
      <span>{pressure}</span>
    </div>
    </div>
    <div className="data-container">
      <div className="ele">
        <img src={humidity} height='40px' className='icon' />
        <div className="data">
          <div className="humidity-percent">{humiditypercent}%
            <div className="text">Humidity</div>
          </div>
        </div>
      </div>
      <div className="ele">
        <img src={wind} height='40px' className='icon' />
        <div className="data">
          <div className="wind-percent">{windspeed} km/h
            <div className="text">WindSpeed</div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}
function App() {

  const[ desc ,setdesc] = useState("");
  const[ text ,setText] = useState("chennai");
  const[ icon ,setIcon] = useState(snow);
  const[ temp ,settemp] = useState(0);
  const[ pressure ,setpressure] = useState(0);
  const[ city ,setcity] = useState("Chennai");
  const[ country ,setcountry] = useState("India");
  const[ lat ,setlat] = useState(0);
  const[ lon ,setlon] = useState(0);
  const[ humiditypercent ,sethumiditypercent] = useState(10);
  const[ windspeed ,setwindspeed] = useState(60);
  const[ cityNotFound, setcityNotFound] =useState(false);
  const[ loading, setLoading] =useState(false);
  
  const weathercodepic ={
     "01d": sungif,
     "01n": moongif,
    "03d": cloudgif,
    "03n": cloudgif,
    "04n": cloudgif,
    "02n": cloudgif,
    "09d": raingif,
    "09n": raingif,
    "10d": raingif,
    "10n": raingif,
    "13d": snowgif,
    "13n": snowgif,
  };
  const search= async () =>{
    setLoading(true);
    let api_key = "b90bc9c5ac687d1faf500d6ddaffe3b3";
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${api_key}&units=metric`;
   try{
          let res=await fetch(url);
          let data=await res.json();
          if(data.cod=="404")
            {
              alert("City Not Found");
              console.error("city not found")
              setcityNotFound(true);
              setLoading(false)
              return;
            }
      sethumiditypercent(data.main.humidity) ;   
      setwindspeed(data.wind.speed);
      setlat(data.coord.lat);
      setlon(data.coord.lon);
      settemp(Math.floor(data.main.temp));
      setcountry(data.sys.country);
      setcity(data.name);
      setpressure(data.main.pressure)
      setdesc(data.weather[0].description);
      const weathericon =data.weather[0].icon;
      setIcon(weathercodepic [weathericon]|| cloudgif);
      setcityNotFound(false);
   }catch(error){
     console.error("An error occured:",error.message);
   }finally{
       setLoading(false)
   }
  };
  const citylist = (e) => {
   setText(e.target.value);
  };

const handleKeyDown = (e) => {
   if(e.key =="Enter"){
    search();
   }
  };
  useEffect(function () { search();},[]);
  return (
      <>
        <div className='container'>
        <div className="input-container">
          <input type='text' className='cityInput' placeholder='Search city' onChange={citylist}
          value={text} onKeyDown={handleKeyDown}/>
          <div className="search-icon" onClick={() => search()}>
            <img src={searchi} height='40px'/>
          </div>
        </div>
         <Weatherdetails temp={temp} icon={icon} city={city} desc={desc} country={country} lat={lat} lon={lon} pressure={pressure} humiditypercent={humiditypercent} windspeed={windspeed}/>
      </div>
      
      </>
  )
}

export default App
