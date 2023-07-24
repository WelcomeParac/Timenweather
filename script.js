function updateClock(cityId, offset) {
  const now = new Date();
  const utcOffset = offset * 60 * 60 * 1000; // Convert hours to milliseconds
  const cityTime = new Date(now.getTime() + utcOffset);
  const hours = cityTime.getUTCHours() % 12 || 12;
  const minutes = String(cityTime.getUTCMinutes()).padStart(2, '0');
  const amPm = cityTime.getUTCHours() >= 12 ? 'PM' : 'AM';
  const clockDiv = document.getElementById(cityId);
  clockDiv.textContent = `${hours}:${minutes} ${amPm}`;
}

// Function to update the user's local time
function updateUserLocationClock() {
  const now = new Date();
  const hours = now.getHours() % 12 || 12;
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const amPm = now.getHours() >= 12 ? 'PM' : 'AM';
  const clockDiv = document.getElementById('user-location');
  clockDiv.textContent = `${hours}:${minutes} ${amPm}`;
}

function highlightCity(city) {
  const cityElements = document.querySelectorAll('.clock');
  cityElements.forEach((element) => {
    const cityName = element.parentElement.textContent.trim();
    const cityDiv = element.parentElement;
    if (cityName.toLowerCase().includes(city.toLowerCase())) {
      cityDiv.classList.add('highlighted', 'zoomed', 'centered');
    } else {
      cityDiv.classList.add('faded');
    }
    setTimeout(() => {
      cityDiv.classList.remove('highlighted', 'faded', 'centered');
    }, 5000);
  });
}

function startClocks() {
  // Code for any initialization, if required
}

// Event listeners for city search
const searchButton = document.querySelector('.searchButton');
const searchInput = document.querySelector('.searchTerm');
const errorDiv = document.createElement('errorDiv');
errorDiv.textContent = '!Invalid search.';
errorDiv.style.display = 'none';
errorDiv.classList.add('error-message');

// Event handler for search button click
searchButton.addEventListener('click', () => {
  const searchTerm = searchInput.value.trim();
  if (searchTerm === '') {
    errorDiv.style.display = 'block';
    setTimeout(() => {
      errorDiv.style.display = 'none'; // Hide the error message after 3 seconds
    }, 3000);
    return;
  }

  highlightCity(searchTerm);
  errorDiv.style.display = 'none';
});

// Event handler for Enter key press in the search input field
searchInput.addEventListener('keyup', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault(); // Prevent default form submission behavior
    const searchTerm = searchInput.value.trim();
    if (searchTerm === '') {
      errorDiv.style.display = 'block';
      setTimeout(() => {
        errorDiv.style.display = 'none'; // Hide the error message after 3 seconds
      }, 3000);
      return;
    }

    highlightCity(searchTerm);
    errorDiv.style.display = 'none';
  }
});

// List of cities with their IDs and UTC offsets
const cities = [
  { id: 'new-york', offset: -4 },       // New York (UTC-4)
  { id: 'london', offset: 1 },          // London (UTC+1)
  { id: 'tokyo', offset: 9 },           // Tokyo (UTC+9)
  { id: 'paris', offset: 2 },           // Paris (UTC+2)
  { id: 'beijing', offset: 8 },         // Beijing (UTC+8)
  { id: 'sydney', offset: 10 },         // Sydney (UTC+10)
  { id: 'mexicocity', offset: -6 },     // Mexico City (UTC-6)
  { id: 'delhi', offset: -6.5 },        // Delhi (UTC-6.5)
  { id: 'hongkong', offset: 8 },        // Hong Kong (UTC+8)
  { id: 'moscow', offset: 3 },          // Moscow (UTC+3)
];

// Function to update all clocks every second
const updateAllClocks = () => {
  updateUserLocationClock();
  cities.forEach((city) => updateClock(city.id, city.offset));
};

updateAllClocks(); // Update the clocks immediately
setInterval(updateAllClocks, 1000); // Update the clocks every second (1000 ms)

// Function to handle city click (You can add specific behavior if needed)
function handleCityClick(cityName) {
  highlightCity(cityName);
}

// Start the clocks when the page is loaded
window.onload = () => {
  startClocks();

  // Add click event listeners to each major city clock
  const majorCityClocks = document.querySelectorAll('.clock');
  majorCityClocks.forEach((cityClock) => {
    cityClock.addEventListener('click', () => {
      // You can add any desired behavior when clicking the clock here
      // For example, open a new tab with more information about the city, etc.
    });
  });
};
