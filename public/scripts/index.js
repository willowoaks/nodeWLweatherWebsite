const fetchData = (location) => {
    fetch(`./weather?address=${location}`).then ((response) => {
    response.json().then( ({error, ...data}) => {
        if(error) {
            // renderWeather(error, undefined)
            return renderWeather(error)
        }
        renderWeather(undefined, data)
    })
})
}

const renderWeather = (error, {description, feelslike, temperature, location}={}) => {
    const mainDiv = document.querySelector('.weatherUpdate')
    mainDiv.innerHTML=''
    const weatherDisplay = document.createElement('h4')
    if(error) {
        weatherDisplay.textContent = error
    } else {
        weatherDisplay.textContent = `It is currently ${description} and ${temperature} degrees here in ${location}. It feels like ${feelslike} degrees`
    }
    mainDiv.appendChild(weatherDisplay)
}

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

weatherForm.addEventListener('submit',(e) => {
    e.preventDefault()
    fetchData(search.value)
})