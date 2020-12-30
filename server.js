const express = require('express')
const request = require('request')
const path = require('path')
const app = express()

app.use('/', express.static(path.join(__dirname, 'static')))

app.get('/weather', (req, res) => {
    let city_name = req.query.city
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city_name}&units=metric&appid=593ea106b69652d9597656d60727e656`

    request(url, (error, response, body) => {
        let weather_json = JSON.parse(body)
        if (weather_json.cod == '404')
            res.send('failed')
        else {
            let weather = {
                icon: weather_json.weather[0].icon,
                description: weather_json.weather[0].main,
                city: weather_json.name,
                country: weather_json.sys.country,
                temp: weather_json.main.temp,
                min_temp: weather_json.main.temp_min,
                max_temp: weather_json.main.temp_max
            }
            res.send(weather)
        }
    })

})

app.listen(4444, () => {
    console.log('Server started at http://localhost:4444')
})