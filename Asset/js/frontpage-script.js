const apiKey = '';
const url = ''
const movieInput = $('#input');
const searchBar = $('#searchBar');
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '0d66aff19dmsh524092da5aa051fp10c216jsn8b26997c98ec',
		'X-RapidAPI-Host': 'online-movie-database.p.rapidapi.com'
	}
};

searchBar.on('submit', function () {
    fetch(`https://online-movie-database.p.rapidapi.com/title/find?q=${movieInput}`, options)
	.then(response => response.json())
	.then(response => console.log(response))
	.catch(err => console.error(err));
})



