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
const dateTimeString = weather.LocalObservationDateTime;
const dateTime = new Date(dateTimeString);

// Extract the hours
const hours = dateTime.getHours();
const amOrPm = hours >= 12 ? "p.m." : "a.m.";

// Convert hours to 12-hour format
const hours12 = hours % 12 || 12;

// Construct the human-readable format
const humanReadableFormat = `${hours12} ${amOrPm}`;
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
    <ion-icon name="time"></ion-icon><p> Time: <span>${humanReadableFormat} ${timeSrc}</span></p>
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