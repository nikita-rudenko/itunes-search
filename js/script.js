const searchbtn = document.querySelector('#search-btn');
const searchInput = document.querySelector('#search-input');
const searchResults = document.querySelector('#search-results');
const mainInfo = document.getElementsByClassName('main-info');

searchbtn.addEventListener('click', findSong);

function findSong() {
	const searchQuery = searchInput.value.replace(/\s/gi, '+');
	const url = `https://itunes.apple.com/search?term=${searchQuery}&limit=10&entity=musicTrack`;

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

	json.results.forEach((item, key) => {
		searchResults.innerHTML += `<div id="item${key}" class="search-result container 
    ${key % 2 === 0 ? 'has-background-light' : ''} 
    rounded">
  <div class="main-info columns is-vcentered">
    <div class="column has-text-centered is-2">
      <img src=${item.artworkUrl100} alt="cover">
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
  <div class="additional-info">
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
  </div>
</div>
</div>`;
	});

	for (let i = 0; i < mainInfo.length; i++) {
		mainInfo[i].addEventListener('click', togglePanel);
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
