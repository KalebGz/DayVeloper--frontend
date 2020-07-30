
class Weather{
    
    constructor(tempK, description, feels_like, sunrise, sunset ){
        this.tempK = tempK // Temprature in Kelvin
        this.tempC = Math.round((tempK - 273.15) * 9/5 + 32)
        this.description = description
        this.feels_like = Math.round((feels_like - 273.15) * 9/5 + 32)
        this.sunrise =  new Date(sunrise*1000)
        this.sunset = new Date(sunset*1000)
    }

    render(){
        let weatherPanel = qs('div.weather')

        const temp = ce('H1')
        temp.innerText= `Temprature: ${this.tempC}°F`

        const feelsLike = ce('H2')
        feelsLike.innerText= `Feels like: ${this.feels_like}°F`

        const desc = ce('H2')
        desc.innerText= `Description: ${this.description}`

        const sunrise = ce('H3')
        sunrise.innerText= `Sunrise: ${this.normalizeTime(this.sunrise)}`

        const sunset = ce('H3')
        sunset.innerText= `Sunrise: ${this.normalizeTime(this.sunset)}`

        weatherPanel.append(temp, feelsLike, desc, sunrise, sunset)
    }

    normalizeTime(date){
        let hour = date.getHours() % 12
        let minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` :  date.getMinutes()
        let suffix = date.getHours() > 12 ? 'PM' : 'AM'
        return `${hour}:${minutes} ${suffix}`
    }
}


document.addEventListener('DOMContentLoaded', () => {
    
    const userUrl = 'http://localhost:3000/api/v1/users/1'
    function fetchUser(){
        fetch(userUrl)
        .then(res => res.json())
        .then(user => {
            fetchWeather(user.location)
        })
    }

    function fetchWeather( zip_code){

        let weatherUrl = `http://api.openweathermap.org/data/2.5/weather?zip=${zip_code},us&appid=ab302d3ff4c37a2f4de433477399b4e3`

        fetch(weatherUrl)
        .then(res => res.json())
        .then(weatherObj => {
            debugger
            obj = new Weather(weatherObj.main.temp,weatherObj.weather[0].description, weatherObj.main.feels_like, weatherObj.sys.sunrise, weatherObj.sys.sunset)
            console.log(weatherObj)
            obj.render()
        })
    }

    /* Function calls */
    fetchUser()

})

/* Macro functions */
function ce(ele){
    return document.createElement(ele)
}

function qs(ele){
    return document.querySelector(ele)
}

// 