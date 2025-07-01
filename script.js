const apiKey = "45e742746a171f721e8363a895b60cf1";
function displayWeather(data) {
  const weatherDiv = document.getElementById("weatherResult");
  weatherDiv.innerHTML = `
    <h2>${data.name}, ${data.sys.country}</h2>
    <p><strong>${data.weather[0].main}</strong> - ${data.weather[0].description}</p>
    <p>Temperature: ${data.main.temp}°C</p>
    <p>Wind: ${data.wind.speed} m/s</p>
    <p>Humidity: ${data.main.humidity}%</p>
  `;
}

function getWeatherByCity() {
  const city = document.getElementById("cityInput").value;
  if (!city) return alert("kakinada");
  
  fetch('https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${45e742746a171f721e8363a895b60cf1}')
    .then(res => res.json())
    .then(data => {
      if (data.cod === 200) displayWeather(data);
      else alert(data.message);
    })
    .catch(() => alert("Error fetching weather data."));
}

function getWeatherByLocation() {
  if (!navigator.geolocation) {
    alert("Geolocation is not supported by your browser.");
    return;
  }

  navigator.geolocation.getCurrentPosition(position => {
    const { latitude, longitude } = position.coords;

    fetch('https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${45e742746a171f721e8363a895b60cf1}')
      .then(res => res.json())
      .then(data => displayWeather(data))
      .catch(() => alert("Error fetching weather data."));
  });
}