function updateClock(cityId, offset) {
    const now = new Date();
    const utcOffset = offset * 60 * 60 * 1000;
    const cityTime = new Date(now.getTime() + utcOffset);
    const hours = cityTime.getUTCHours() % 12 || 12;
    const minutes = String(cityTime.getUTCMinutes()).padStart(2, '0');
    const amPm = cityTime.getUTCHours() >= 12 ? 'PM' : 'AM';
    const day = cityTime.getUTCDate();
    const month = cityTime.getUTCMonth();
    const year = now.getFullYear() % 100;
    const clockDiv = document.getElementById(cityId);
    clockDiv.innerHTML = `${hours}:${minutes} ${amPm}`;
}

const citiesClock = [
   { id: 'london', offset: 1 },
   { id: 'new-york', offset: -4 },
   { id: 'tokyo', offset: 9 },
   { id: 'paris', offset: 2 },
   { id: 'delhi', offset: 5.5 },
   // Add more cities here...
];

const citiesWeather = [
   { newyork: 5128581 },
   { london: 2643743 },
   { tokyo: 1850147 },
   { paris: 2968815 },
   { delhi: 1273294 },
   // Add more cities here...
];

const updateAllClocks = () => {
    citiesClock.forEach((city) => updateClock(city.id, city.offset));
};

updateAllClocks();
setInterval(updateAllClocks, 1000);

document.addEventListener("DOMContentLoaded", () => {
    // Replace YOUR_API_KEY with your actual API key
    const apiKey = "73c11661dfe2af21a525ea61ab77dcc1";

    // Function to update the weather value in the HTML
    function updateWeatherInHtml(city, weatherData) {
        const temperatureInFahrenheit = Math.round(weatherData.main.temp);

        // Update temperature for the specified city
        const degreesElement = document.getElementById(`${city}degrees`);
        degreesElement.textContent = `${temperatureInFahrenheit}°F`;
    }

    // Function to make an API call for a city
    function fetchWeatherData(cityObj) {
        const cityKey = Object.keys(cityObj)[0];
        const cityId = cityObj[cityKey];
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?id=${cityId}&appid=${apiKey}&units=imperial`;

        return fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                // Handle the data returned by the API for each city
                updateWeatherInHtml(cityKey, data);
            })
            .catch(error => {
                // Handle any errors that occurred during the API call
                console.error(`Error fetching data for ${cityKey}:`, error);
            });
    }

    // Making the API calls for all cities using Promise.all()
    const apiCalls = citiesWeather.map(fetchWeatherData);

    // Execute all API calls and update the HTML when all responses are received
    Promise.all(apiCalls)
        .then(() => {
            console.log("All API calls completed.");
        })
        .catch(error => {
            console.error("Error with API calls:", error);
        });
});