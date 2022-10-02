class WeekWeather{

    static showWeekWeather(url) {
        const block = document.createElement("div");
        block.classList.add("week-container");
        fetch(url)
            .then((r) => r.json())
            .then((j) => {
                block.innerHTML += `
                    <div class="week-day">${this.fillWeekDay(j, 1)}</div>
                    <div class="week-day">${this.fillWeekDay(j, 2)}</div>
                    <div class="week-day">${this.fillWeekDay(j, 3)}</div>
                    <div class="week-day">${this.fillWeekDay(j, 4)}</div>`
                console.log(j);
            })
        return block;
    }

    static fillWeekDay(json, day) {
        return `<div class="name-dayWeek">${this.getWeekDay(json, day)}</div>
                <div class="date-dayWeek">${this.getWeekDate(json, day)}</div>
                <div class="minTemp-dayWeek">Min: ${GetData.getTemp(this.getWeekDayMinTemp(json, day))}</div>
                <div class="maxTemp-dayWeek">Max: ${GetData.getTemp(this.getWeekDayMaxTemp(json, day))}</div>
                <img class="img-dayWeek" src="https://openweathermap.org/img/wn/${this.getWeekImg(json,day)}@2x.png" alt="${this.getWeekImg(json,day)}">
                <div class="weather-dayWeek">${this.getWeekDayWeather(json, day)}</div>`;
    }

    static getWeekDayWeather(json, day) {
        return json.list[(8 * day) + 4].weather[0].main;
    }

    static getWeekImg(json, day) {
        return json.list[(8 * day) + 4].weather[0].icon;
    }

    static getWeekDayMinTemp(json, day) {
        let iteration = 8 * day;
        let end = iteration + 7;
        let min = Number.POSITIVE_INFINITY;
        for (let i = iteration; i < end; i++) {
            if (json.list[i].main.temp < min )
                min = json.list[i].main.temp;
        }
        return min;
    }

    static getWeekDayMaxTemp(json, day) {
        let iteration = 8 * day;
        let end = iteration + 7;
        let max = Number.NEGATIVE_INFINITY;
        for (let i = iteration; i < end; i++) {
            if (json.list[i].main.temp > max ) 
                max = json.list[i].main.temp;
        }
        return max;
    }

    static getWeekDay(json, day) {
        let date = new Date(json.list[8 * day].dt * 1000);

        return date.toLocaleDateString('en-US', {weekday: 'long'})
    }

    static getWeekDate(json, day) {
        let date = new Date(json.list[8 * day].dt * 1000);
        const options = {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
        };
        return date.toLocaleDateString('en-US', options)
    }

}
