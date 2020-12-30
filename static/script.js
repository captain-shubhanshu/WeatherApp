$(() => {
    let inp = $('#inp')
    let btn_1 = $('#btn-1')
    let btn_2 = $('#btn-2')
    let cards = $('#cards')

    function getCurrentDate() {
        let weekdays = ['SUN', 'MON', 'TUE', 'WED', 'THUR', 'FRI', 'SAT']
        let months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']

        let currentDate = new Date()
        let day = weekdays[currentDate.getDay()]
        let month = months[currentDate.getMonth()]
        let date = currentDate.getDate()
        let year = currentDate.getFullYear()
        let hours = currentDate.getHours()
        let minutes = currentDate.getMinutes()

        let period = 'AM'

        if (hours > 11) {
            period = 'PM'
            if (hours > 12) hours -= 12
        }
        else if (hours < 10) hours = '0' + hours

        if (minutes < 10) minutes = '0' + minutes

        return `${day} | ${month} ${date}, ${year} | ${hours}:${minutes}${period}`
    }

    btn_1.click(() => {
        let city = inp.val()
        str = ''
        $.get(`/weather?city=${city}`, (data) => {
            if (data == 'failed')
                alert('City does not exist!')
            else {
                str += `<div>
                            <section class="location">
                                <div class="city">${data.city}, ${data.country}</div>
                                <div class="date">${getCurrentDate()}</div>
                            </section>
                            <div class="current">
                                <img src="http://openweathermap.org/img/w/${data.icon}.png" alt="">
                                <div class="temp">${Math.round(data.temp)}<span>°C</span></div>
                                <div class="weather">${data.description}</div>
                                <div class="hi-low">Min: ${data.min_temp}ºC | Max: ${data.max_temp}ºC</div>
                            </div>
                        </div>`
            }
            cards.append(str)
            inp.val('')
        })
    })

    btn_2.click(() => {
        cards.children().remove()
    })
})