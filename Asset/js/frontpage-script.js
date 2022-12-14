const apiKey = '';
const url = ''
const form = document.querySelector('form');
let movieInput = document.querySelector('.input-field');


form.onsubmit = function (e) {
	e.preventDefault();
	console.log('i was clicked');
	sessionStorage.setItem('searchValue', movieInput.value);
	console.log(movieInput.value);
	// init();
	getMovieApi(movieInput);
}

// save the user search input to an array and set in local storage 
let searchHistory = []
function getMovieApi(movieInput) {

	    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': config.MY_MOVIE_API,
            'X-RapidAPI-Host': 'online-movie-database.p.rapidapi.com'
	}
        };

	fetch(`https://online-movie-database.p.rapidapi.com/title/get-overview-details?tconst="${movieInput.value}"&currentCountry=US`, options)
		.then(response => response.json())
		.then(function (data) {
			console.log(data);
		if(data.hasOwnProperty("results")){
			var history = {
				title: movieInput.value,
				movieData: data
			}
			searchHistory.push(history);
			localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
		} else {
			console.log("no result!");
		
		}

		})
	// send user to relative html page with movie poster renderings
	window.location.href = ('./index2_listing.html');
}

let moviePoster = document.querySelector('.searchHistoryContainer');
let { movieData, results, image, title } = searchHistory;

function init() {
	// Get stored movie titles from localStorage
	let storedMovies = JSON.parse(localStorage.getItem('searchHistory'));

	// If movies were retrieved from localStorage, update the searchHistory array to it
	if (storedMovies !== null) {
		searchHistory = storedMovies;
		console.log(searchHistory);
	}
	else {
		console.log('no search history found');
	}

	let { movieData, results } = searchHistory;

	// Clear movie snippets before loading latest history
	moviePoster.innerHTML = "";

	let lastSearch = searchHistory[searchHistory.length - 1];
	// render movie posters of stored movies to the DOM
	if(searchHistory) { 
		for (var i = 0; i < 3; i++) {
		const searchHistoryContent = `
	  <div class="moviePoster-1 cell-small-4">
		  <div class = "card">
			  <div class = "card-section">
				  <div class="centered-text">
					  <h4>${lastSearch.movieData.results[0].title}</h4>
				  </div>	
			<img src="${lastSearch.movieData.results[0].image.url}" alt="${lastSearch.movieData.results[0].title} poster style="width:100%"">
		  </div>
			  </div>
	  </div>
	  <div class="moviePoster-2 cell-small-4">
		  <div class = "card">
			  <div class = "card-section">
				  <div class="centered-text">
					  <h4>${lastSearch.movieData.results[1].title}</h4>
				  </div>	
			 <img src="${lastSearch.movieData.results[1].image.url}" alt="${lastSearch.movieData.results[1].title} poster style="width:100%"">
		  </div>
			  </div>
	  </div>
	  <div class="moviePoster-3 cell-small-4">
		  <div class = "card">
			  <div class = "card-section">
				  <div class="centered-text">
					  <h4>${lastSearch.movieData.results[2].title}</h4>
				  </div>
			  <img src="${lastSearch.movieData.results[2].image.url}" alt="${lastSearch.movieData.results[2].title} poster style="width:100%"">
		  </div>
			  </div>
	  </div>
		  `;
		moviePoster.innerHTML = searchHistoryContent;
	} 
}

	}
init();
