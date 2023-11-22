const apiKey = 'R7pXM0aMjHDnAHbBfPt6bjYbHeKguZ6G';
const SearchQuery = document.querySelector('.search-form');
const SearchInput = document.querySelector('.search-input');
const successCallback = (lat_lon) => {
  PreWeather(lat_lon);
};
const errorCallback = (errorMsge) => {
  alert("Can't get your Current location weather, please turn on the location")
}
window.onload = () => {
  getGeolocation()
};

function getGeolocation() {
  navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
}

function PreWeather(data) {
  const latitude = data.coords.latitude;
  const longitude = data.coords.longitude;
  console.log(latitude, longitude);
  const GeoURL = `http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${apiKey}&q=${latitude}%2C${longitude}&details=true&toplevel=true`;

  fetch(GeoURL)
    .then(res => res.json())
    .then(data => {
      weatherSearch(data);
    })
    .catch(err => {
      alert('Sorry error: ' + err)
    })
};


SearchQuery.addEventListener('submit', async (event) => {
  event.preventDefault()
  const searchValue = SearchInput.value.trim();
  const CityURL = `http://dataservice.accuweather.com/locations/v1/cities/search/?apikey=${apiKey}&q=${searchValue}`;

  fetch(CityURL)
    .then(res => res.json())
    .then(data => {
      const CityKey = data[0];
      weatherSearch(CityKey)
    })
    .catch(err => {
      alert('Sorry error: ' + err)
    })
});

function weatherSearch(City) {
  const weatherURL = `http://dataservice.accuweather.com/currentconditions/v1/${City.Key}?apikey=${apiKey}&details=true`
  const weatherIcon = document.querySelector('#weather-icon');
  const WeatherDetails = document.querySelector('.details')
  const TemperatureInfo = document.querySelector('.temperature')
  fetch(weatherURL)
    .then(res => res.json())
    .then(data => {
      const weather = data[0];
      const dateTime = new Date(weather.LocalObservationDateTime);
      const hours = dateTime.getHours() % 12 || 12;
      const amOrPm = dateTime.getHours() >= 12 ? 'p.m.' : 'a.m.';
      const humanReadableTime = `${hours} ${amOrPm}`;
      const WeatherIconSrc = `/Assets/Icons/${weather.WeatherIcon}.png`;
      weatherIcon.setAttribute('src', WeatherIconSrc);
      TemperatureInfo.innerHTML = `
      <p><span>${weather.Temperature.Metric.Value}</span>°${weather.Temperature.Metric.Unit}</p>
      <p style="font-size: 20px;">
      <span style="font-size: 20px;">${weather.Temperature.Imperial.Value}</span>°${weather.Temperature.Imperial.Unit}</p>
      <p class="weather-status">${weather.WeatherText}</p>
      `;
      WeatherDetails.innerHTML = `
      <ion-icon name="locate-outline"></ion-icon>
      <p>Location: <span>${City.EnglishName}/${City.Country.EnglishName}</span>
      </p>
      <hr>
      <ion-icon name="time"></ion-icon>
      <p>Time: <span>${humanReadableTime} ${weather.IsDayTime ? 'Day' : 'Night'}</span>
      </p>
      <hr>
      <ion-icon name="water-outline"></ion-icon>
      <p>humidity: <span>${weather.RelativeHumidity}&#x25;</span>
      </p>
      <hr>
      <ion-icon name="leaf"></ion-icon>
      <p>Wind: <span>${weather.Wind.Direction.English} ${weather.Wind.Speed.Metric.Value} ${weather.Wind.Speed.Metric.Unit}</span>
      </p>
      <hr>
      <ion-icon name="skull-outline"></ion-icon>
      <p>UV Index: <span>${weather.UVIndex} (${weather.UVIndexText})</span>
      </p>
      <hr>
      <ion-icon name="eye"></ion-icon>
      <p>Visibility: <span>${weather.Visibility.Metric.Value} ${weather.Visibility.Metric.Unit}</span>
      </p>`;
    })
    .catch(err => {
      alert('Sorry error: ' + err)
    })
};