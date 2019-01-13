const searchInput = document.querySelector('#search-input');
const searchbtn = document.querySelector('#search-btn');
const searchResults = document.querySelector('#search-results');
const resultHeader = document.getElementsByClassName('main-info');
const categories = document.getElementById('categories');
const noResults = document.getElementById('no-results');

searchbtn.addEventListener('click', findSong);
searchInput.addEventListener('keypress', e => {
	if (e.keyCode == 13) {
		e.preventDefault();
		searchbtn.click();
	}
});

function findSong() {
	const searchQuery = searchInput.value.replace(/\s/gi, '+');
	const url = `https://itunes.apple.com/search?term=${searchQuery}&country=US&limit=10&entity=musicTrack`;

	fetch(url)
		.then(function(response) {
			if (response.status !== 200) {
				console.log(response.status);
				return;
			}
			return response.json();
		})
		.then(json => showResults(json));
}

function showResults(json) {
	searchResults.innerHTML = '';

	if (json.resultCount !== 0) {
		categories.classList.remove('no-display');
		noResults.classList.add('no-display');
	} else {
		noResults.classList.remove('no-display');
		categories.classList.add('no-display');
	}

	json.results.forEach((item, key) => {
		searchResults.innerHTML += `
    <div id="item${key}" 
    class="search-result container 
    ${key % 2 === 0 ? 'has-background-light' : ''} 
    rounded">
  <div class="main-info columns is-vcentered">
    <div class="column has-text-centered is-2">
      <img class="artwork has-background-grey" src=${
				item.artworkUrl100
			} alt="cover">
    </div>
    <div class="column">
      ${item.artistName}
    </div>
    <div class="column">
      ${item.trackName}
    </div>
    <div class="column">
      ${item.collectionName}
    </div>
    <div class="column">
      ${item.primaryGenreName}
    </div>
    <div class="column has-text-centered is-1">
      <span class="tag is-rounded is-large has-background-dark has-text-white"></span>
    </div>
  </div>
  <div class="result-details">
    <h2 class="is-size-4">${item.artistName} - ${item.trackName} 
    <span><i class="fas fa-music"></i></span> </h2>
    <div class="columns">
      <div class="column">
        <ul class="search-item">
          <li>
            <p><strong>Collection:</strong> ${item.collectionName}</p>
          </li>
          <li>
            <p><strong>Track Count:</strong> ${item.trackCount}</p>
          </li>
          <li>
            <p><strong>Price:</strong> ${item.collectionPrice} USD</p>
          </li>
        </ul>
      </div>
      <div class="column">
        <ul class="search-item">
          <li>
            <strong>Track duration:</strong> 
            ${millisToMinutesAndSeconds(item.trackTimeMillis)} min
          </li>
          <li><strong>Track price:</strong> ${item.trackPrice} USD</li>
        </ul>
      </div>
    </div>
  </div>`;
	});

	for (let i = 0; i < resultHeader.length; i++) {
		resultHeader[i].addEventListener('click', togglePanel);
	}
}

function togglePanel() {
	let active = document.querySelector('.active');
	let show = document.querySelector('.show');
	const panel = this.nextElementSibling;

	if (active == this && show == panel) {
		this.classList.remove('active');
		panel.classList.remove('show');
	} else if (show && active) {
		show.classList.remove('show');
		active.classList.remove('active');
		this.classList.toggle('active');
		panel.classList.toggle('show');
	} else {
		this.classList.toggle('active');
		panel.classList.toggle('show');
	}
}

function millisToMinutesAndSeconds(millis) {
	const minutes = Math.floor(millis / 60000);
	const seconds = ((millis % 60000) / 1000).toFixed(0);
	return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
}
