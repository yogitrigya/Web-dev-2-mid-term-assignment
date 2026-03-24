const API_KEY='0133cc5316757ac730cc46ae342334e4'
const form=document.querySelector('#weatherForm')
const weatherInfo=document.querySelector('.info')
const weatherHistory=document.querySelector('.history')
const searchhistory=JSON.parse(localStorage.getItem('searchHistory')) || []
const searchHistory=[]
form.addEventListener('submit', async(event)=>{
    event.preventDefault()
    const searchedCity=city.value
    getData(searchedCity)

})
async function getData(City){
    if(City){
        try{

    const response=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${City}&appid=${API_KEY}`)
    const data=await response.json()
if(data.cod===200){
    console.log(data)
    weatherInfo.innerHTML=`
        <h3>Weather in ${data.name}</h3>
        <p>City: ${data.name}</p>
        <p>Temperature: ${(data.main.temp-273.15).toFixed(1)} °C</p>
        <p>Weather: ${data.weather[0].main}</p>
        <p>Humidity: ${data.main.humidity} %</p>
        <p>Wind Speed: ${data.wind.speed} m/s</p>
    `
    if(!searchHistory.includes(City)){
        searchHistory.push(City)
        localStorage.setItem('searchHistory', JSON.stringify(searchHistory))
        displaySearchHistory()
    }
}else{
    weatherInfo.innerHTML=`
    <h3>Weather Info</h3>
    <p>City not found. Please check the city name and try again.</p>
`
}

}catch(error){
     console.log(error)
       
}

    }
}


function displaySearchHistory(){
    weatherHistory.innerHTML=''
    const history=JSON.parse(localStorage.getItem('searchHistory')) 
    history.forEach(city=>{
        const li=document.createElement('button')
        li.textContent=city
        li.addEventListener('click',()=>{getData(city)})
        weatherHistory.appendChild(li)


    })
}

displaySearchHistory()
