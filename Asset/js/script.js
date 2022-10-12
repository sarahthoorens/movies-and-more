//  $(document).foundation();  // to be existed?
$("#search").on("click", (e) => {
    e.preventDefault();
    var searchValue = $("#searchInput").val();
    
    //getGiphyApi(searchValue);
    getMovieApi(searchValue); 
    getYouTubApi(searchValue);
    


});
var searchHistory=[]; //localstorage for history

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
function storeMovieTitleHistory(){
    localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
}
function renderSearchHistory(){


}
function init(){
    var storedHistory=JSON.parse(localStorage.getItem("searchHistory"));
    if(storedHistory !== null){
        searchHistory=storedHistory;
    }
}
init();

function getMovieApi(searchValue) {

    // var moveUrlByTitle = 'https://movie-database-alternative.p.rapidapi.com/?s=' + searchValue + '&r=json&page=1'
    var moveUrlByTitle="https://online-movie-database.p.rapidapi.com/title/v2/find?title="+searchValue+"&titleType=movie&limit=6"
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': config.MY_MOVIE_API,
            'X-RapidAPI-Host': 'online-movie-database.p.rapidapi.com'  //movie API Changed
        }
    };
    console.log(moveUrlByTitle);

    fetch(moveUrlByTitle, options)
        .then(response => response.json())
        .then((data) => {
            console.log(data);
            var history={
                title : searchValue,
                movieData : data
            }
            
            searchHistory.push(history);
            storeMovieTitleHistory();
            renderMovie(data);          

        })
        .catch(err => console.error(err));
    
     //if there is history, don't call API
     //check localstorage
    // if(searchHistory.filter(e => e.title === searchValue.length>0)){
    //     const i = searchHistory.findIndex(e => e.title === searchHistory)
    //     console.log("here exist");
    //     renderMovie(searchHistory[i].movieData);
    // }
    // else{
    //     fetch(moveUrlByTitle, options)
    //     .then(response => response.json())
    //     .then((data) => {
    //         console.log(data);
    //         var history={
    //             title : searchValue,
    //             movieData : data
    //         }
            
    //         searchHistory.push(history);
    //         storeMovieTitleHistory();
    //         renderMovie(data);          

    //     })
    //     .catch(err => console.error(err));
    // }

 }


    

// Renders movie to Page 2
function renderMovie(data) {

    for (let i = 0; i < data.results.length; i++) { 
        var id = data.results[i].id.slice(7,16); // /title/tt1412608/  -> tt1412608 for use of searching the detail info.
        var type = data.results[i].titleType;
        var title= data.results[i].title;
        var imgSrc=data.results[i].image.url;

        console.log(data.Poster);
        var div = $("<div>").addClass("cell small-6 large-4 auto button movieBox");
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