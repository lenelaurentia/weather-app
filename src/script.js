//Get current date and time

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

  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let month = months[date.getMonth()];
  console.log(date);
  return `${hours}:${minutes} ${day}, ${month}`;
}

//convert to celcius/fahrenheit
function convertToFahrenheit(event) {
  event.preventDefault();
  let currentTemp = document.querySelector("#current-temp");
  let temperature = currentTemp.innerHTML;
  temperature = Number(temperature);
  currentTemp.innerHTML = Math.round((temperature * 9) / 5 + 32);
}
let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

function convertToCelcius(event) {
  event.preventDefault();
  let currentTemp = document.querySelector("#current-temp");
  let temperature = currentTemp.innerHTML;
  temperature = Number(temperature);
  currentTemp.innerHTML = Math.round(((temperature - 32) * 5) / 9);
}
let celciusLink = document.querySelector("#celcius-link");
celciusLink.addEventListener("click", convertToCelcius);

//display current temp + city + high/low
function displayWeather(response) {
  event.preventDefault();
  let currentTemp = document.querySelector("#current-temp");
  let tempResult = Math.round(response.data.main.temp);
  currentTemp.innerHTML = `${tempResult}°`;

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

  let dateElement = document.querySelector("#current-date-time");
  dateElement.innerHTML = formatDate(response.data.dt * 1000);

  let iconElement = document.querySelector("#current-icon");
  iconElement.setAttribute(
    "src",
    "http://openweathermap.org/img/wn/10d@2x.png"
  );
}

//search for city data

function searchCity(city) {
  let units = "metric";
  let apiKey = "4630bdec4a9dba06ebc0c195b85646bc";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndpoint}?q=${city}&appid=${apiKey}&units=${units}`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-bar").value;
  searchCity(city);
}

// Geolocation

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

let formCitySearch = document.querySelector("#form-city-search");
formCitySearch.addEventListener("submit", handleSubmit);

let currentLocation = document.querySelector("#current-location");
currentLocation.addEventListener("click", getCurrentPosition);
