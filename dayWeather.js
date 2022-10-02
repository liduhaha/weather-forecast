class GetData {


    fillIn(elem, url1, url2) {
        const cont = document.createElement("div");
        cont.classList.add("cont");
        const block = document.createElement("div");
        block.classList.add("block");
        
        fetch(url1)
            .then((response) => response.json())
            .then((json) => {
                block.innerHTML += `<div class="n-d">
                                    <div class="name">${json.name}</div>
                                    <div class="date">${this.getDate(json.timezone)}</div>
                                    </div>`

                block.innerHTML += `<img src="http://openweathermap.org/img/wn/${json.weather[0]['icon']}@2x.png" alt=${json.weather[0]["main"]}>`;
                
                block.innerHTML += `<div class="temp-cont">
                                    <div class="temp">${GetData.getTemp(json.main.temp)}</div>
                                    <div class="weather">${json.weather[0]["main"]}</div>
                                    <div class="weather-descr">${json.weather[0]["description"]}</div>
                                    </div>`;
            })
            
            cont.insertAdjacentElement('beforeend', block);
            cont.insertAdjacentElement('beforeend', WeekWeather.showWeekWeather(url2));

            elem.insertAdjacentElement('beforeend', cont);
            
            
            
    }

    
    getDate(timezone) {
        const today = new Date();
        let offset = today.getTimezoneOffset();
        const options = {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
        };
        
        today.setMinutes(today.getMinutes() + (timezone / 60 + offset));
        return `${today.toLocaleString('en-US', options)}<br> ${today.toLocaleTimeString()}`;
    }

    static getTemp(k) {
        return `${parseInt(k * 1.8 - 459.67)}F / ${parseInt((k - 273.15))}C`;
    }

}