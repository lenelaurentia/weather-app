//Get current date and time

function formatDate(rightNow) {
  let hours = rightNow.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = rightNow.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
  let day = days[rightNow.getDay()];
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
  let month = months[rightNow.getMonth()];
  let date = rightNow.getDate();
  return `${hours}:${minutes} ${day}, ${month} ${date} `;
}
let currentDateTime = document.querySelector("#current-date-time");
let now = new Date();
currentDateTime.innerHTML = formatDate(now);

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

//display current temperature + city + high/low
function displayWeather(response) {
  event.preventDefault();
  let currentTemp = document.querySelector("#current-temp");
  let tempResult = Math.round(response.data.main.temp);
  currentTemp.innerHTML = `${tempResult}°`;
  let cityHeading = document.querySelector("h1");
  cityHeading.innerHTML = response.data.name;
  let currentHighLow = document.querySelector("#current-highlow");
  let currentHigh = Math.round(response.data.main.temp_max);
  let currentLow = Math.round(response.data.main.temp_min);
  currentHighLow.innerHTML = `${currentHigh}° / ${currentLow}°`;
  let currentDescription = document.querySelector("#current-description");
  let description = response.data.weather[0].description;
  currentDescription.innerHTML = description.toLowerCase();
  console.log(response.data);
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
