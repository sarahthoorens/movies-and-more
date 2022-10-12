const apiKey = '';
const url = ''
const form = document.querySelector('form');
const movieInput = document.querySelector('.input-field')
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '0d66aff19dmsh524092da5aa051fp10c216jsn8b26997c98ec', //Sarah's Key
		'X-RapidAPI-Host': 'online-movie-database.p.rapidapi.com'
	}
};

form.onsubmit = function (e) {
	e.preventDefault();
	console.log('i was clicked')
    fetch(`https://online-movie-database.p.rapidapi.com/title/find?q=${movieInput.value}`, options)
	.then(function (response) {
		return response.json()
	  })
	   .then(function (data) {
		  console.log(data)

let { results, image, title, principals } = data;
console.log(title)
console.log(results)
console.log(image)
let moviePoster = document.querySelector('.searchHistoryContainer')
for (var i = 0; i < 4; i++) {
const searchHistoryContent = `
<div class="moviePoster-1 cell-small-4">
	<div class = "card">
		<div class = "card-section">
			<div class="centered-text">
				<h4>${results[i].title}</h4>
			</div>	
		<a href="<--link to modal-->"><img src="${results[i].image.url}" alt="${results[i].title} poster style="width:100%""></a>
	</div>
</div>
<div class="moviePoster-2 cell-small-4">
	<div class = "card">
		<div class = "card-section">
			<div class="centered-text">
				<h4>${results[i+1].title}</h4>
			</div>	
		<a href="<--link to modal-->"><img src="${results[i+1].image.url}" alt="${results[i+1].title} poster style="width:100%""></a>
	</div>
</div>
<div class="moviePoster-3 cell-small-4">
	<div class = "card">
		<div class = "card-section">
			<div class="centered-text">
				<h4>${results[i+2].title}</h4>
			</div>	
		<a href="<--link to modal-->"><img src="${results[i+2].image.url}" alt="${results[i+2].title} poster style="width:100%""></a>
	</div>
</div>
	`
moviePoster.innerHTML = searchHistoryContent;
}} )}

// onload.localStorage.getItem ('movieName')

// localStorage.setItem ('movieName', 'movieInput')



