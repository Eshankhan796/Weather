// Constants
const searchForm = document.querySelector('.search-form');
const mainIcon = document.querySelector('.main-icon img');
const temperature = document.querySelector('.temperature');
const details = document.querySelector('.details');

// Function to update the UI with weather data
function updateUI(cityDetails, weather) {
  const dateTime = new Date(weather.LocalObservationDateTime);
  const hours = dateTime.getHours() % 12 || 12;
  const amOrPm = dateTime.getHours() >= 12 ? 'p.m.' : 'a.m.';
  const humanReadableTime = `${hours} ${amOrPm}`;
  const iconSrc = `Assets/Icons/${weather.WeatherIcon}.png`;

  mainIcon.setAttribute('src', iconSrc);

  temperature.innerHTML = `
    <p>
    <span>${weather.RealFeelTemperature.Metric.Value}
    </span>°${weather.RealFeelTemperature.Metric.Unit}
    </p>
    <p style="font-size: 20px;">
    <span style="font-size: 20px;">${weather.RealFeelTemperature.Imperial.Value}
    </span>°${weather.RealFeelTemperature.Imperial.Unit}
    </p>
    <p class="weather-status">${weather.WeatherText}
    </p>
  `;

  details.innerHTML = `
    <ion-icon name="locate-outline"></ion-icon>
    <p>Location: <span>${cityDetails.EnglishName}/${cityDetails.Country.EnglishName}</span></p>
    <hr>
    <ion-icon name="time"></ion-icon>
    <p>Time: <span>${humanReadableTime} ${weather.IsDayTime ? 'Day' : 'Night'}</span></p>
    <hr>
    <ion-icon name="water-outline"></ion-icon>
    <p>Humidity: <span>${weather.RelativeHumidity}%</span></p>
    <hr>
    <ion-icon name="leaf"></ion-icon>
    <p>Wind: <span>${weather.Wind.Direction.English} ${weather.Wind.Speed.Metric.Value} ${weather.Wind.Speed.Metric.Unit}</span></p>
    <hr>
    <ion-icon name="skull-outline"></ion-icon>
    <p>UV Index: <span>${weather.UVIndex} (${weather.UVIndexText})</span></p>
    <hr>
    <ion-icon name="eye"></ion-icon>
    <p>Visibility: <span>${weather.Visibility.Metric.Value} ${weather.Visibility.Metric.Unit}</span></p>
  `;
}

// Function to update city and weather data
async function updateCity(city) {
  try {
    const cityDetails = await getCity(city);
    const weather = await getWeather(cityDetails.Key);
    return { cityDetails, weather };
  } catch (error) {
    throw new Error(`Error: ${error.message}`);
  }
}

// Event listener for form submission
searchForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const city = searchForm.city.value.trim();
  try {
    const data = await updateCity(city);
    updateUI(data.cityDetails, data.weather);
  } catch (error) {
    alert(`"${city}" City Not Found. Sorry, Something Went Wrong.`);
  }
});