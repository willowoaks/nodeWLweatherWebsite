const request = require('postman-request')

const forecast = (long, lat, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=8f9da6930d826a28314f4139401280eb&query=${lat},${long}&units=f`
    request({url, json: true}, (error, {body}) => {
        if(error) {
            callback('Unable to connect to weather services',undefined)
        } else if(body.error) {
            callback('Unable to recognise location inputs - please try again',undefined)
        } else {
            callback(undefined,{
                temperature: body.current.temperature, 
                description: body.current.weather_descriptions[0],
                feelslike: body.current.feelslike,
                pressure: body.current.pressure
            }
    )
}})}

module.exports = {
    forecast: forecast
}