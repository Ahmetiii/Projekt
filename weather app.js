const apiKey = 'YOUR_API_KEY_HERE'; // Replace with your weather API key
const weatherInfoElement = document.getElementById('weather-info');

document.getElementById('search-button').addEventListener('click', () => {
    const city = document.getElementById('city-input').value;
    if (city) {
        fetchWeatherData(city);
    }
});

document.getElementById('locate-button').addEventListener('click', () => {
    navigator.geolocation.getCurrentPosition(position => {
        const { latitude, longitude } = position.coords;
        fetchWeatherDataByCoords(latitude, longitude);
    }, () => {
        alert('Unable to retrieve your location.');
    });
});

function fetchWeatherData(city) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                displayWeather(data);
            } else {
                alert('City not found!');
            }
        })
        .catch(error => console.error('Error fetching weather data:', error));
}

function fetchWeatherDataByCoords(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => {
            displayWeather(data);
        })
        .catch(error => console.error('Error fetching weather data:', error));
}

function displayWeather(data) {
    const { main, weather, name } = data;
    const weatherDescription = weather[0].description;
    const temperature = main.temp;

    weatherInfoElement.innerHTML = `
        <h2>Weather in ${name}</h2>
        <p>Temperature: ${temperature}°C</p>
        <p>Conditions: ${weatherDescription}</p>
    `;
}
