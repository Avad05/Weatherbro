import "./style.css";


const city = document.getElementById('city');
const submit = document.querySelector('.submit');
const current = document.querySelector('.current');
const next = document.querySelector('.next15');
const container1 = document.querySelector('.current_one');
const container2 = document.querySelector('.current_two');
const img = document.querySelector(".logo");


async function getWeather(name){
    if(!name.trim() || !name){
        alert("Enter a city name");
        return;
    }

    const api = 'U5EW32CQS23T7AYT84HR5TV39';
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${name}/next5days?unitGroup=us&key=${api}&elements=tempmax,tempmin,feelslike,conditions,icon,dew,humidity&iconSet=icons1`

    
    let user;
    let Data;
    let resolvedAddress;
    
       try{
         user = await fetch(url, {mode: 'cors'})
         if(user.status === 429){
            throw new Error ("rate limit exceeded, try later");
            }
         if(user.status === 404){
            throw new Error ("Match not found");
         }  
         if(user.status === 500){
            throw new Error ("Internal Error");
         } 
         if(user.status === 401){
            throw new Error ("Problem with API key");
         }
         if(!user.status === 200){
             throw new Error ("Bro What error is this");
         }
         Data = await user.json();
         console.log(Data);
    }catch(error){
        console.log("DATA not found:" + error);
    }

    const days = Data.days;

    resolvedAddress = Data.resolvedAddress;
    document.getElementById('place').textContent = resolvedAddress;
    days.forEach((days, index) => {
        const container = document.getElementById(`day${index}`);
        if(container){
            const  iconId = `${days.icon}`;
            console.log(iconId);
             img.src = `https://github.com/visualcrossing/WeatherIcons/tree/main/PNG/1st%20Set%20-%20Color/rain.png`;
            container.querySelector(".feelslike").textContent = `Feelslike${days.feelslike}`;
            container.querySelector(".condition").textContent = `${days.conditions}`;
        }
        
    });

    
}

submit.addEventListener('click', ()=>{
    const cityName = city.value;
    getWeather(cityName);
})

export default  getWeather;