const apiKey = '';
const url = ''
const form = document.querySelector('form');
let movieInput = document.querySelector('.input-field');



  
form.onsubmit = function (e) {
	e.preventDefault();
	console.log('i was clicked');
	sessionStorage.setItem('searchValue', movieInput.value)
	console.log(movieInput.value);
	init();
	getMovieApi(movieInput);
}
	
	// var moveUrlByID="https://online-movie-database.p.rapidapi.com/title/get-overview-details?tconst="+id+"&currentCountry=US";
    
    // const options = {
    //     method: 'GET',
    //     headers: {
    //         'X-RapidAPI-Key': config.MY_MOVIE_API,
    //         'X-RapidAPI-Host': 'online-movie-database.p.rapidapi.com'
    //     }
    // };
    
    // fetch(moveUrlByID, options)
    //     .then(response => response.json())
    //     .then((data) => {
    //         console.log(data);
    //         renderMovieModal(data);
    //         //storeMovieIDResult(data);
    //     })
    //     .catch(err => console.error(err));

	


// save the user search input to an array and set in local storage 
let searchHistory = []
function getMovieApi(movieInput) {
	
	const options = {
		method: 'GET',
		headers: {
			'X-RapidAPI-Key': '0d66aff19dmsh524092da5aa051fp10c216jsn8b26997c98ec',
			'X-RapidAPI-Host': 'online-movie-database.p.rapidapi.com'
		}
	};
	
	fetch(`https://online-movie-database.p.rapidapi.com/title/get-overview-details?tconst="${movieInput.value}"&currentCountry=US`, options)
	.then(response => response.json())
	 .then(function (data) {
            console.log(data);
            var history = {
                title : movieInput.value,
                movieData : data
            }
            searchHistory.push(history);
			localStorage.setItem('searchHistory', JSON.stringify(searchHistory))

        })
		window.location.href=('./index2_listing.html')
    }    

let moviePoster = document.querySelector('.searchHistoryContainer')
let {movieData, results, image, title } = searchHistory

function init() {
	// Get stored movie titles from localStorage
	let storedMovies = JSON.parse(localStorage.getItem('searchHistory'));
  
	// If movies were retrieved from localStorage, update the searchHistory array to it
	if (storedMovies !== null) {
	  searchHistory = storedMovies;
	  console.log(searchHistory);
	}
	else {  getMovieApi(movieInput);
	}

	let {movieData, results } = searchHistory;
  // render movie posters of stored movies to the DOM
	 // Clear movie snippets
	 moviePoster.innerHTML = "";
	 
	 let lastSearch = searchHistory[searchHistory.length - 1]
	 for (var i = 0; i < 3; i++) {  
		
	 const searchHistoryContent = `
	  <div class="moviePoster-1 cell-small-4">
		  <div class = "card">
			  <div class = "card-section">
				  <div class="centered-text">
					  <h4>${lastSearch.movieData.results[0].title}</h4>
				  </div>	
			  <a href="<!--link to modal-->"><img src="${lastSearch.movieData.results[0].image.url}" alt="${lastSearch.movieData.results[0].title} poster style="width:100%""></a>
		  </div>
			  </div>
	  </div>
	  <div class="moviePoster-2 cell-small-4">
		  <div class = "card">
			  <div class = "card-section">
				  <div class="centered-text">
					  <h4>${lastSearch.movieData.results[1].title}</h4>
				  </div>	
			  <a href="<!--link to modal-->"><img src="${lastSearch.movieData.results[1].image.url}" alt="${lastSearch.movieData.results[1].title} poster style="width:100%""></a>
		  </div>
			  </div>
	  </div>
	  <div class="moviePoster-3 cell-small-4">
		  <div class = "card">
			  <div class = "card-section">
				  <div class="centered-text">
					  <h4>${lastSearch.movieData.results[2].title}</h4>
				  </div>
			  <a href="<!--link to modal-->"><img src="${lastSearch.movieData.results[2].image.url}" alt="${lastSearch.movieData.results[2].title} poster style="width:100%""></a>
		  </div>
			  </div>
	  </div>
		  `
	moviePoster.innerHTML = searchHistoryContent;
	  }
  }
init();
