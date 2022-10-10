//  $(document).foundation();  // to be existed?
$("#search").on("click", (e) => {
    e.preventDefault();
    console.log(e);
    var searchValue = $("#searchInput").val();
    console.log(searchValue);
    getGiphyApi(searchValue);
    getMovieApi(searchValue);
    getYouTubApi(searchValue);


});

function getGiphyApi(searchValue) {
    var apiKey = "hf3SGj0CbnYvhzUwTN9wT4A4r5NeyuR5";

    var requestUrl = "https://api.giphy.com/v1/gifs/search?q=" + searchValue + "&limit=5&api_key=" + apiKey;
    console.log(requestUrl);
    fetch(requestUrl)
        .then((response) => response.json())
        .then((params) => {
            console.log(params);
            renderGiphy(params);
        });
}
function renderGiphy(params) {

    $("#giphy-container").empty();//init
    var header = $("<h1>").text("GIPHY >").attr("font-weight", "500").addClass("cell");
    $("#giphy-container").append(header);


    for (i = 0; i < params.data.length; i++) {

        var card = $("<div>").addClass("card gif-box cell auto").attr("id", "gif-" + i);;
        var card_div = $("<div>").addClass("card-section");
        var rating = $("<h6>");
        var gifObj = params.data[i];
        var gif = gifObj.images;
        var img = $("<img>").attr({
            // "width": "200px",
            src: gif.fixed_height.url,
            // "data-animate": gif.fixed_height.url,
            // "data-still": gif.fixed_height_still.url,
            // "data-state": "animate",
            class: "gif"
        });



        rating.text("Rating: " + gifObj.rating);
        card_div.append(img, rating);
        card.append(card_div);
        $("#giphy-container").append(card);
    }


}

function getMovieApi(searchValue) {
    var moveUrlByTitle = 'https://movie-database-alternative.p.rapidapi.com/?s=' + searchValue + '&r=json&page=1'

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'e9d115ede6msh9a9b8592434a878p12c4dejsnde0b73ead6fc',
            'X-RapidAPI-Host': 'movie-database-alternative.p.rapidapi.com'
        }
    };

    $("#movie-container").empty();//init is it right position to init?


    fetch(moveUrlByTitle, options)
        .then(response => response.json())
        .then((data) => {
            console.log(data);
            for (let i = 0; i < 2; i++) {   //set iterate twice because of limited api access use. needed to change
                var id = data.Search[i].imdbID;
                var type = data.Search[i].type;
                var movieByIdUrl = 'https://movie-database-alternative.p.rapidapi.com/?r=json&i=' + id;
                console.log(movieByIdUrl);
               
                // if (type === "movie") {   //need some filtering
                fetch(movieByIdUrl, options)
                    .then(response => response.json())
                    .then((data) => {
                        console.log("success");
                        console.log(data);
                        renderMovie(data);

                    })
                    .catch(err => console.error(err));

                //}



            }


        })
        .catch(err => console.error(err));
}
function renderMovie(data) {
 
    var imgSrc = data.Poster;
    console.log(data.Poster);
    var div = $("<div>").addClass("cell auto movie-box");
    var img = $("<img>").attr("src", imgSrc);
    div.append(img);
    $("#movie-container").append(div);

}
function getYouTubApi(searchValue){
    var ApiKey="AIzaSyAQOKHTETAoq0GtKMM4jrvTljYDqGbdsRY";
}