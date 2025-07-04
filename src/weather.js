import "./style.css";



const city = document.getElementById('city');
const submit = document.querySelector('.submit');
const current = document.querySelector('.current');
const next = document.querySelector('.next15');
const container1 = document.querySelector('.current_one');
const container2 = document.querySelector('.current_two');
const img = document.querySelector(".logo");
const slider = document.querySelector(".slider");
const degree = document.getElementById('degree');
const api = 'U5EW32CQS23T7AYT84HR5TV39';

window.addEventListener('DOMContentLoaded', () =>{
    const name = localStorage.getItem("name");
    const degrees = localStorage.getItem("degrees");
    const unit = localStorage.getItem("unit");

    if(name && degrees && unit){
       getWeather(name, degrees, unit);
    }
    else{
       getWeather("Mumbai", "uk", "°C");
    }
});


function setWeather(name, degrees, unit){
      localStorage.setItem("name", name);
      localStorage.setItem("degrees", degrees);
      localStorage.setItem("unit", unit);

      getWeather(name, degrees, unit);
}



async function getWeather(name, degrees, unit){
    if(!name.trim() || !name){
        alert("Enter a city name");
        return;
    }

   
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${name}/next8days?unitGroup=${degrees}&key=${api}&elements=tempmax,tempmin,feelslike,conditions,icon,dew,humidity,windspeed,cloudcover,datetime&iconSet=icons1`

    
    let user;
    let Data;
    let resolvedAddress;
    
       try{
         user = await fetch(url, {mode: 'cors'})
         if(!user.ok){
            throw new Error (`HTTP: Error ${user.status}`);
         }
       
         Data = await user.json();
         console.log(Data);
    }catch(error){
        console.log("DATA not found:" + error);
    }
   
let days;    
if(Data && Data.days){
days = Data.days;
}
else{
    alert("Enter Valid City, State, Country");
    return;
}

/* const days = Data.days;*/
    resolvedAddress = Data.resolvedAddress;
    document.getElementById('place').textContent = resolvedAddress;
    days.forEach((days, index) => {
        const container = document.getElementById(`day${index}`);
        if(container){

            if(index === 0){
            const  iconId = `${days.icon}`;
            console.log(iconId);
             img.src = require(`./asset/icons/${iconId}.png`);
            container.querySelector(".feelslike").textContent = `${days.feelslike}${unit}`;
            container.querySelector(".condition").textContent = `${days.conditions}`;
            container.querySelector(".minValue").textContent = `${days.tempmin}${unit}`;
            container.querySelector(".maxValue").textContent = `${days.tempmax}${unit}`;
            container.querySelector(".visibility").textContent = `${days.dew}%`;
            container.querySelector(".wind").textContent = `${days.windspeed}m/s`;
            container.querySelector(".humidity").textContent = `${days.humidity}%`;
            container.querySelector(".cloudyness").textContent = `${days.cloudcover}%`;
          /*  container.querySelector(".date").textContent = `${days.datetime}`*/
           }
           else{
           container.querySelector(".date").textContent = `${days.datetime}`;
           const  iconId = `${days.icon}`;
             container.querySelector(".icon").src = require(`./asset/icons/${iconId}.png`);
           container.querySelector(".feels").textContent = `${days.feelslike}${unit}`;
           }
        }

        
        }
        
    );
  

    
}

submit.addEventListener('click', ()=>{
    const cityName = city.value;
    let country = "uk";
    let units = "°C";
    setWeather(cityName, country, units);
})

degree.addEventListener('click', () => {
    if(degree.textContent === "°F"){
        degree.textContent = "°C";
        const cityName = city.value;       
        let country = "uk";
        let units = "°C";
        getWeather(cityName, country, units);

    }
    else{
        degree.textContent = "°F";
        const cityName = city.value;
        let country = "us";
        let units = "°F"
        getWeather(cityName, country, units);
    }
});



export default  getWeather;
