const API_KEY = "a3c015a0ccf14ea79fd34138260606";

async function getWeather() {
    const city = document.getElementById("city").value.trim();

    if (city === "") {
        alert("Enter a location");
        return;
    }

    const url = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${encodeURIComponent(city)}&aqi=yes`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.error) {
            document.getElementById("weatherData").innerHTML =
                `<h2>${data.error.message}</h2>`;
            return;
        }

        document.getElementById("weatherData").innerHTML = `
            <div class="weather-header">

                <h2>${data.location.name}, ${data.location.country}</h2>

                <img src="https:${data.current.condition.icon}" alt="Weather icon">

                <h1>${data.current.temp_c}°C</h1>

                <h3>${data.current.condition.text}</h3>

            </div>

            <div class="grid">

                <div class="card">
                    <h3>Feels Like</h3>
                    <p>${data.current.feelslike_c} °C</p>
                </div>

                <div class="card">
                    <h3>Humidity</h3>
                    <p>${data.current.humidity}%</p>
                </div>

                <div class="card">
                    <h3>Wind Speed</h3>
                    <p>${data.current.wind_kph} km/h</p>
                </div>

                <div class="card">
                    <h3>Pressure</h3>
                    <p>${data.current.pressure_mb} mb</p>
                </div>

                <div class="card">
                    <h3>UV Index</h3>
                    <p>${data.current.uv}</p>
                </div>

                <div class="card">
                    <h3>Visibility</h3>
                    <p>${data.current.vis_km} km</p>
                </div>

                <div class="card">
                    <h3>Air Quality (PM2.5)</h3>
                    <p>${data.current.air_quality.pm2_5.toFixed(2)}</p>
                </div>

                <div class="card">
                    <h3>Air Quality (PM10)</h3>
                    <p>${data.current.air_quality.pm10.toFixed(2)}</p>
                </div>

                <div class="card">
                    <h3>CO</h3>
                    <p>${data.current.air_quality.co.toFixed(2)}</p>
                </div>

                <div class="card">
                    <h3>NO₂</h3>
                    <p>${data.current.air_quality.no2.toFixed(2)}</p>
                </div>

                <div class="card">
                    <h3>O₃</h3>
                    <p>${data.current.air_quality.o3.toFixed(2)}</p>
                </div>

                <div class="card">
                    <h3>Last Updated</h3>
                    <p>${data.current.last_updated}</p>
                </div>

            </div>
        `;

    } catch (error) {
        document.getElementById("weatherData").innerHTML =
            "<h2>Failed to fetch weather data.</h2>";

        console.error("Error fetching weather data:", error);
    }
};