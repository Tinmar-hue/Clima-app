let container = document.getElementById("container");
let searchForm = document.getElementById("search_submit");
let searchInput = document.getElementById("search_input");
let temparatureDegrees = document.getElementById("degreeNumber");
let weatherIcon= document.getElementById("weatherIcon");
let temperatureDescription = document.getElementById("description");
let timezone = document.getElementById("timezone");
let date = document.getElementById("date");
let min = document.getElementById("min");
let max = document.getElementById("max");

const displayBackgroundImage = (obj)=>{
    console.log(obj.list[4].dt);
    let dateSpanish = new Date(obj.list[4].dt*1000).toLocaleString("es-ES", {
        timeStyle: "short",
        dateStyle: "long"
    });
    console.log(dateSpanish)
    date.textContent = `${dateSpanish}`
    const dayHour = new Date(obj.list[4].dt*1000).getHours();
    console.log(dayHour);
    if(dayHour > 6 && dayHour < 18){
        container.classList.remove("night");
        container.classList.add("day");
    }else{
        container.classList.remove("day");
        container.classList.add("night");
    }
}

const displayData = (obj)=>{
    console.log(obj);
    temparatureDegrees.textContent = Math.floor(obj.list[0].main.temp);
    timezone.textContent = obj.list[0].name;
    const icon = obj.list[0].weather[0].icon;
    weatherIcon.innerHTML = `<img src='icons/${icon}.png'></img>`;
    min.textContent = Math.floor(obj.list[0].main.temp_min);
    max.textContent = Math.floor(obj.list[0].main.temp_max);
    temperatureDescription.textContent = obj.list[0].weather[0].description;
    date.textContent = new Date(obj.list[4].dt*1000).toLocaleString("es-ar", {
        timeStyle: "short",
        dateStyle: "long"
    });
}

const getWeatherData = async(city)=>{
    const res = await fetch(`https://community-open-weather-map.p.rapidapi.com/find?q=${city}&units=metric&lang=sp`, {
        "headers": {
            "x-rapidapi-key": "b824759257mshc32220ce502df2dp11ee78jsn0077e51251ad",
            "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com"
        }});
        const data = await res.json();
    displayBackgroundImage(data); 
    displayData(data);
}

searchForm.addEventListener("submit", e=>{
    e.preventDefault();
    getWeatherData(searchInput.value)
})

window.onload = ()=>{
    getWeatherData("Buenos Aires");
}