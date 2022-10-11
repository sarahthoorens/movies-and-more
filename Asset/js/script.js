//  $(document).foundation();  // to be existed?
$("#search").on("click", (e) => {
    e.preventDefault();
    var searchValue = $("#searchInput").val();
    console.log("before");
    // document.location.replace("./index2_listing.html");
    console.log("after");
    //getGiphyApi(searchValue);
    getMovieApi(searchValue);
    
    getYouTubApi(searchValue);
    


});

function getGiphyApi(searchValue) {
    var apiKey = config.MY_GIPHY_API;

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
    console.log("here");
    var moveUrlByTitle = 'https://movie-database-alternative.p.rapidapi.com/?s=' + searchValue + '&r=json&page=1'

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': config.MY_MOVIE_API,
            'X-RapidAPI-Host': 'movie-database-alternative.p.rapidapi.com'
        }
    };

    // $("#movie-container").empty();//init is it right position to init?


    fetch(moveUrlByTitle, options)
        .then(response => response.json())
        .then((data) => {
            console.log(data);
            renderMovie(data);          

        })
        .catch(err => console.error(err));
}

// Renders movie to Page 2
function renderMovie(data) {

    for (let i = 0; i < 6; i++) {   //set iterate twice because of limited api access use. needed to change
        var id = data.Search[i].imdbID;
        var type = data.Search[i].Type;
        var title= data.Search[i].Title;
        var imgSrc=data.Search[i].Poster;

        console.log(data.Poster);
        var div = $("<div>").addClass("cell cell small-6 large-4 auto button");
        var img = $("<img>").attr({"src": imgSrc,"data-open":"movieModal"});
        div.append(img);
        var h3=$("<h3>").text(title);
        div.append(h3);
       
        $("#movie-result-container").append(div);
        
       

        // var movieByIdUrl = 'https://movie-database-alternative.p.rapidapi.com/?r=json&i=' + id;
        // // if (type === "movie") {   //need some filtering
        // fetch(movieByIdUrl, options)
        //     .then(response => response.json())
        //     .then((data) => {
        //         console.log("success");
        //         console.log(data);
        //         renderMovie(data);

        //     })
        //     .catch(err => console.error(err));

        //}



    }

 
    

}
function getYouTubApi(searchValue){
    var ApiKey = config.MY_YOUTUBE_API;
    var url = "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=3&q=" + searchValue + "&key=" + ApiKey;
    fetch(url)
        .then(response => response.json())
        .then((data) => {
            console.log("success");
            console.log(data);
            renderYouTubeModal(data);
            
        })
        .catch(err => console.error(err));

}
function renderYouTubeModal(data){
    
        $.each(data.items, function (i, value) {
            console.log(value);
            var channel = value.snippet.channelTitle;
            var videoURL = value.id.videoId;
            var videoTitle = value.snippet.title;
            var videoThumbnail = value.snippet.thumbnails.medium.url;
            $('#music-container').append('<li class="card"><a href="https://www.youtube.com/watch?v=' + videoURL + '" target="_blank"><div><img src="' + videoThumbnail + '"></div><article class="card-text"><small>' + channel + '</small><h1 class="video-title">' + videoTitle + '</h1></article></a></li>');
        });
    
    
}