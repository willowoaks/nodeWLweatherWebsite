const hbs = require('hbs');
const path = require('path')
const express = require('express')
const {geoCode} = require('./utils/geocode')
const {forecast} = require('./utils/forecast')

const app = express()

//Path directory
const public = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//Deploy handlebars
app.set('views', viewsPath);
hbs.registerPartials(partialsPath)
app.set('view engine', 'hbs');


//Setup pubic directory
app.use(express.static(public))

//Process request and responses

app.get('/',(request, response) => {
    response.render('index', {
        title: 'Weather App',
        description: 'Whats it like today?',
        button: 'Click me',
        name: 'Will Leong'
    })
})

app.get('/about', (request, response) => {
    response.render('about',{
        title: 'About me',
        description: 'These are our beginnings',
        image: './public/images/Picture 1.png',
        name: 'Will Leong'
    })
})

app.get('/help',(request, response) => {
    response.render('help',{
        title: 'Give us a shout and we will give you a hand',
        description: 'We are your friends',
        name: 'Will Leong'
    })
})

app.get('/weather',(request, response) => {
    if(!request.query.address) {
        return response.send({
            error: 'no address provided'
        })
    }
    geoCode(request.query.address,(error,{longitude, latitude, location}={}) => {
        if(error) {
            return response.send({
                error
            })}
        forecast(longitude, latitude, (error, {temperature, description, feelslike}) => {
            if(error) {
                return response.send({
                    error
                })
            }
            response.send({
                location,
                temperature,
                description,
                feelslike,
           })
        })
    })
})

app.get('/help/*',(request, response) => {
    response.render('404',{
        error: 'Help article not found',
        name: 'Will Leong'
    })
})

app.get('*',(request, response) => {
    response.render('404',{
        error: '404: Page not found',
        name: 'Will Leong'
    })
})

app.listen(3100, () => {
    console.log('Host 3100 is now live')
}) 



