 // Function to update the clock for a given city
 function updateClock(cityId, offset) {
    const now = new Date(); // Get the current date and time
    const utcTime = now.getTime() + (now.getTimezoneOffset() * 60000); // Convert to UTC time
    const cityTime = new Date(utcTime + (offset * 3600000)); // Calculate city time based on offset

    const hours = cityTime.getHours() % 12 || 12; // Convert to 12-hour format
    const minutes = String(cityTime.getMinutes()).padStart(2, '0'); // Add leading zero if needed
    const seconds = String(cityTime.getSeconds()).padStart(2, '0'); // Add leading zero if needed

    const amPm = cityTime.getHours() >= 12 ? 'PM' : 'AM'; // Determine AM or PM

    const clockDiv = document.getElementById(cityId);
    clockDiv.textContent = `${hours}:${minutes}:${seconds} ${amPm}`;
  }

  // Function to update the user's local time
  function updateUserLocationClock() {
    const now = new Date(); // Get the current date and time

    const hours = now.getHours() % 12 || 12; // Convert to 12-hour format
    const minutes = String(now.getMinutes()).padStart(2, '0'); // Add leading zero if needed
    const seconds = String(now.getSeconds()).padStart(2, '0'); // Add leading zero if needed

    const amPm = now.getHours() >= 12 ? 'PM' : 'AM'; // Determine AM or PM

    const clockDiv = document.getElementById('user-location');
    clockDiv.textContent = `${hours}:${minutes}:${seconds} ${amPm}`;
  }

  // Function to update all clocks every second
  function startClocks() {
    updateUserLocationClock(); // Update the user's location clock immediately
    updateClock('new-york', -4); // New York (UTC-4)
    updateClock('london', 1);    // London (UTC+1)
    updateClock('tokyo', 9);     // Tokyo (UTC+9)
    setInterval(() => {
      updateUserLocationClock();
      updateClock('new-york', -4);
      updateClock('london', 1);
      updateClock('tokyo', 9);
    }, 1000); // Update the clocks every second (1000 ms)
  }

 
  // Start the clocks when the page is loaded
  window.onload = startClocks;