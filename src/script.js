//get current date and time

function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
  let day = days[date.getDay()];

  console.log(date);
  return `Last updated ${formatHours(timestamp)} ${day}`;
}
function formatHours(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}

//convert to celcius/fahrenheit

function displayFahrenheit(event) {
  event.preventDefault();
  let currentTemp = document.querySelector("#current-temp");
  celciusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celciusTemperature * 9) / 5 + 32;
  currentTemp.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelcius(event) {
  event.preventDefault();
  celciusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let currentTemp = document.querySelector("#current-temp");
  currentTemp.innerHTML = Math.round(celciusTemperature);
}

let celciusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheit);

let celciusLink = document.querySelector("#celcius-link");
celciusLink.addEventListener("click", displayCelcius);

//display city + current (temp + icon + description + details + high/low + time)

function displayWeather(response) {
  celciusTemperature = response.data.main.temp;

  event.preventDefault();
  let currentTemp = document.querySelector("#current-temp");
  let tempResult = Math.round(celciusTemperature);
  currentTemp.innerHTML = tempResult;

  let cityHeading = document.querySelector("h1");
  cityHeading.innerHTML = response.data.name;
  console.log(response.data.main.temp_min);

  let currentHigh = document.querySelector("#current-high");
  let currentLow = document.querySelector("#current-low");
  currentHighValue = Math.round(response.data.main.temp_max);
  currentLowValue = Math.round(response.data.main.temp_min);
  currentHigh.innerHTML = `High: ${currentHighValue}°`;
  currentLow.innerHTML = `Low: ${currentLowValue}°`;

  let currentDescription = document.querySelector("#current-description");
  let description = response.data.weather[0].description;
  currentDescription.innerHTML = description.toLowerCase();
  console.log(response.data);

  let humidityElement = document.querySelector("#humidity");
  humidity = Math.round(response.data.main.humidity);
  humidityElement.innerHTML = `${humidity}%`;

  let windElement = document.querySelector("#wind");
  wind = Math.round(response.data.wind.speed);
  windElement.innerHTML = `${wind}km/h`;

  let dateElement = document.querySelector("#update-time");
  dateElement.innerHTML = formatDate(response.data.dt * 1000);

  let iconElement = document.querySelector("#current-icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

//display forecast (hours + icon + high/low)

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;

  for (let index = 0; index < 6; index++) {
    forecast = response.data.list[index];
    forecastElement.innerHTML += `
   <div class="col-2">
     <div class="forecast-hours">
        ${formatHours(forecast.dt * 1000)}
     </div>
     <img id="forecast-icon"
     src= "http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png"
     />
      <div class="future-highlows">
      <strong>${Math.round(forecast.main.temp_max)}°</strong>
      ${Math.round(forecast.main.temp_min)}°
     </div>
   </div>
  `;
  }
}

//search for city

function searchCity(city) {
  let units = "metric";
  let apiKey = "4630bdec4a9dba06ebc0c195b85646bc";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndpoint}?q=${city}&appid=${apiKey}&units=${units}`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayWeather);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-bar").value;
  searchCity(city);
}

let formCitySearch = document.querySelector("#search-form");
formCitySearch.addEventListener("submit", handleSubmit);

searchCity("Vancouver");

// geolocation

function showPosition(position) {
  console.log(position);
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiKey = "4630bdec4a9dba06ebc0c195b85646bc";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndpoint}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayWeather);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentLocation = document.querySelector("#current-location");
currentLocation.addEventListener("click", getCurrentPosition);
