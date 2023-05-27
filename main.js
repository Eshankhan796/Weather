 // Const
 const searchInput = document.querySelector('form');
 const mainIcon = document.querySelector('.main-icon');
 const details = document.querySelector('.details');
 const temperature = document.querySelector('.temperature');
 const icon = document.querySelector('.main-icon img');
 // Getting the data for UI update
 const updateUI = (data) => {
   const { cityDetails, weather } = data;

   console.log(weather);
   console.log(cityDetails);

   // Time
   const time = `${weather.LocalObservationDateTime}`;
   const date = new Date(time);

   const day = date.getDate().toString().padStart(2, '0');
   const month = (date.getMonth() + 1).toString().padStart(2, '0');
   const year = date.getFullYear().toString();
   const hours = date.getHours().toString().padStart(2, '0');
   const minutes = date.getMinutes().toString().padStart(2, '0');
   const seconds = date.getSeconds().toString().padStart(2, '0');

   // Extract the timezone offset in hours and minutes
   const tzOffsetHours = Math.floor(Math.abs(date.getTimezoneOffset()) / 60);
   const tzOffsetMinutes = Math.abs(date.getTimezoneOffset()) % 60;
   const tzSign = date.getTimezoneOffset() < 0 ? "+" : "-";

   const tzFormatted = `${tzSign}${tzOffsetHours.toString().padStart(2, '0')}:${tzOffsetMinutes.toString().padStart(2, '0')}`;

   const output1 = `${day}/${month}/${year}`;

   // Icon update
   const IconSrc = `Assets/Icons/${weather.WeatherIcon}.png`;
   icon.setAttribute('src', IconSrc);
   // Day time or night time ?
   let timeSrc = weather.IsDayTime ? 'Day' : 'Night';

   // Temperature updateUI update 
   temperature.innerHTML = `
      <p><span>${weather.RealFeelTemperature.Metric.Value}</span>°${weather.RealFeelTemperature.Metric.Unit}</p><p class="weather-status">${weather.WeatherText}</p>
    `;
   // Other details update 
   details.innerHTML = `
    <ion-icon name="locate-outline"></ion-icon>
    <p>Location: <span>${cityDetails.EnglishName}/${cityDetails.Country.EnglishName}</span></p>
    <hr>
    <ion-icon name="time"></ion-icon><p> Time: <span>${timeSrc} ${output1}</span></p>
    <hr>
    <ion-icon name="water-outline"></ion-icon>
    <p>humidity: <span>${weather.RelativeHumidity}%</span></p>
    <hr>
    <ion-icon name="compass"></ion-icon>
    <p>Wind: <span>${weather.Wind.Direction.English} ${weather.Wind.Speed.Metric.Value} ${weather.Wind.Speed.Metric.Unit}</span></p>
    <hr/>
    <ion-icon name="skull-outline"></ion-icon>
    <p>UV Index: <span>${weather.UVIndex} (${weather.UVIndexText})</span></p>
    <hr>
    <ion-icon name="eye"></ion-icon>
    <p>visibility: <span>${weather.Visibility.Metric.Value} ${weather.Visibility.Metric.Unit}</span></p>
      `;
 }

 // Getting the input and weather data
 const updateCity = async (city) => {

   const cityDetails = await getCity(city);
   const weather = await getWeather(cityDetails.Key);

   return { cityDetails, weather };
 }

 // User input
 searchInput.addEventListener('submit', e => {
   e.preventDefault();

   const city = searchInput.city.value.trim();

   updateCity(city)
     .then(data => updateUI(data))
     .catch(err => {
       console.log(err);
       alert(`"${city}" City Not Found. Sorry, Something Went Worng.`);
     });
 });