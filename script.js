function updateClock(cityId, offset) {
  const now = new Date();
  const utcOffset = offset * 60 * 60 * 1000; // Convert hours to milliseconds
  const cityTime = new Date(now.getTime() + utcOffset);
  const hours = cityTime.getUTCHours() % 12 || 12;
  const minutes = String(cityTime.getUTCMinutes()).padStart(2, '0');
  const seconds = String(cityTime.getUTCSeconds()).padStart(2, '0');
  const amPm = cityTime.getUTCHours() >= 12 ? 'PM' : 'AM';
  const clockDiv = document.getElementById(cityId);
  clockDiv.textContent = `${hours}:${minutes}:${seconds} ${amPm}`;
}

// Function to update the user's local time
function updateUserLocationClock() {
  const now = new Date();
  const hours = now.getHours() % 12 || 12;
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  const amPm = now.getHours() >= 12 ? 'PM' : 'AM';
  const clockDiv = document.getElementById('user-location');
  clockDiv.textContent = `${hours}:${minutes}:${seconds} ${amPm}`;
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






// Function to update all clocks every second
function startClocks() {

  
}


  const searchButton = document.querySelector('.searchButton');
  searchButton.addEventListener('click', () => {
    const searchTerm = document.querySelector('.searchTerm').value;
    highlightCity(searchTerm);
  });
  const searchInput = document.querySelector('.searchTerm');
  searchInput.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
      const searchTerm = searchInput.value;
      highlightCity(searchTerm);
    }
  });





  
  const cities = [
    { id: 'new-york', offset: -4 },       // New York (UTC-4)
    { id: 'london', offset: 1 },          // London (UTC+1)
    { id: 'tokyo', offset: 9 },           // Tokyo (UTC+9)
    { id: 'paris', offset: 2 },           // Paris (UTC+2)
    { id: 'beijing', offset: 8 },         // Beijing (UTC+8)
    { id: 'sydney', offset: 10 },         // Sydney (UTC+10)
    { id: 'mexicocity', offset: -6 },
    { id: 'delhi', offset: -6.5}     // Mexico City (UTC-5)
  ];


  const updateAllClocks = () => {
    updateUserLocationClock();
    cities.forEach((city) => updateClock(city.id, city.offset));
  };

  

  updateAllClocks(); // Update the clocks immediately
  setInterval(updateAllClocks, 1000); // Update the clocks every second (1000 ms)

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
