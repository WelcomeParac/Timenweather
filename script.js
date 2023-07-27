function updateClock( cityId, offset ) {
	const now = new Date();
	const utcOffset = offset * 60 * 60 * 1000;
	const cityTime = new Date( now.getTime() + utcOffset );
	const hours = cityTime.getUTCHours() % 12 || 12;
	const minutes = String( cityTime.getUTCMinutes() ).padStart( 2, '0' );
	const amPm = cityTime.getUTCHours() >= 12 ? 'PM' : 'AM';
	const day = cityTime.getUTCDate();
	const month = cityTime.getUTCMonth() + 1;
	const clockDiv = document.getElementById( cityId );
	clockDiv.textContent = `${hours}:${minutes} ${amPm} / ${month}-${day}`;
}

function updateUserLocationClock() {
	const now = new Date();
	const hours = now.getHours() % 12 || 12;
	const minutes = String( now.getMinutes() ).padStart( 2, '0' );
	const amPm = now.getHours() >= 12 ? 'PM' : 'AM';
	const day = now.getDate();
	const month = now.getMonth() + 1;
	const year = now.getFullYear();
	const clockDiv = document.getElementById( 'user-location' );
	clockDiv.textContent = `You ➔ ${hours}:${minutes} ${amPm}  / ${month}-${day}-${year}`;
}

function highlightCity(city) {
  let isCityHighlighted = false;

  const cityElements = document.querySelectorAll('.cityname');
  cityElements.forEach((element) => {
    const cityName = element.textContent.trim();
    const cityDiv = element.parentElement;

    if (cityName.toLowerCase() === city.toLowerCase()) {
      cityDiv.classList.add('highlighted');
      isCityHighlighted = true;
      setTimeout(() => {
        cityDiv.classList.remove('highlighted');
      }, 3000);
    } else {
      cityDiv.classList.remove('highlighted');
    }
  });

  return isCityHighlighted;
}

function startClocks() {}
const searchButton = document.querySelector( '.searchButton' );
const searchInput = document.querySelector( '.searchTerm' );
const errorMessage = document.createElement( 'div' );
errorMessage.textContent = 'Please enter a city name!';
errorMessage.classList.add( 'error-message' );
errorMessage.style.display = 'none';
searchButton.parentNode.appendChild( errorMessage );
searchButton.addEventListener( 'click', () => {
	const searchTerm = searchInput.value.trim();
  const isCityHighlighted = highlightCity(searchTerm);
	if ( searchTerm === '' || !isCityHighlighted ) {
		showError();
		return;
	}
	highlightCity( searchTerm );
	hideError();
} );
searchInput.addEventListener( 'keyup', ( event ) => {
	if ( event.key === 'Enter' ) {
		event.preventDefault();
		const searchTerm = searchInput.value.trim();
    const isCityHighlighted = highlightCity(searchTerm);
		if ( searchTerm === '' || !isCityHighlighted ) {
			showError();
			return;
		}
		highlightCity( searchTerm );
		hideError();
	}
} );

function showError() {
	errorMessage.style.display = 'block';
}

function hideError() {
	errorMessage.style.display = 'none';
}
const cities = [ {
	id: 'new-york',
	offset: -4
}, {
	id: 'london',
	offset: 1
}, {
	id: 'tokyo',
	offset: 9
}, {
	id: 'paris',
	offset: 2
}, {
	id: 'beijing',
	offset: 8
}, {
	id: 'sydney',
	offset: 10
}, {
	id: 'mexicocity',
	offset: -6
}, {
	id: 'delhi',
	offset: -6.5
}, {
	id: 'hongkong',
	offset: 8
}, {
	id: 'moscow',
	offset: 3
}, {
	id: 'shanghai',
	offset: 8
}, {
	id: 'buenosaires',
	offset: -3
}, {
	id: 'mumbai',
	offset: 5.5
}, {
	id: 'istanbul',
	offset: 3
}, {
	id: 'manila',
	offset: 8
}, {
	id: 'lagos',
	offset: 1
}, {
	id: 'seoul',
	offset: 9
}, {
	id: 'saopaulo',
	offset: -3
}, {
	id: 'albasrah',
	offset: 3
}, {
	id: 'losangeles',
	offset: -7
}, {
	id: 'dhaka',
	offset: 6
}, {
	id: 'kiev',
	offset: 3
}, {
	id: 'chicago',
	offset: -5
}, {
	id: 'rome',
	offset: 2
}, {
	id: 'cairo',
	offset: 3
} ];
const updateAllClocks = () => {
	updateUserLocationClock();
	cities.forEach( ( city ) => updateClock( city.id, city.offset ) );
};
updateAllClocks();
setInterval( updateAllClocks, 1000 );

function handleCityClick( cityName ) {
	highlightCity( cityName );
}
window.onload = () => {
	startClocks();
	const majorCityClocks = document.querySelectorAll( '.clock' );
	majorCityClocks.forEach( ( cityClock ) => {
		cityClock.addEventListener( 'click', () => {} );
	} );
};
const cities2 = [ "newYork", "london", "tokyo", "paris", "beijing", "sydney", "mexicocity", "delhi",
	"hongkong", "moscow"
];
cities2.forEach( city => {
	try {
		const cityDiv = document.querySelector( `.${city}` );
		cityDiv.addEventListener( "click", () => {
			window.location.href = `./CityPages/${city}.html`;
		} );
	} catch ( error ) {
		console.error( `Error adding click event listener for ${city}: ${error.message}` );
	}
} );