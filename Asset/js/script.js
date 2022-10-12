//  $(document).foundation();  // to be existed?
var searchValue="";
$("#search").on("click", (e) => {
    e.preventDefault();
    searchValue = $("#searchInput").val();
    
    //getGiphyApi(searchValue);
    getMovieApi(searchValue); 
    //getYouTubApi(searchValue);
    


});


//index2_listing.html when you click one of list of movies
$('#movie-result-container').on("click",".movieBox",(e)=>{
//$('.movieBox').on("click",(e)=>{
    e.preventDefault();   
    var selectedMovieBox_elm=$(e.target).parent(); //create .movieBox element
    console.log(selectedMovieBox_elm[0].id);

    getGiphyApi(searchValue);
    getYouTubApi(searchValue);
   
})

function getMovieIDApi(){

}
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

function renderGiphy(params) { ///Carousel will be added

    $("#giphy-info").empty();//init
    $("#giphy-info").append('<h3><strong>GIPHY<strong></h3>').addClass("grid-x");

    $.each(params.data, function (i, value) {
        console.log(value);
        var gif = value.images.fixed_height.url;
        var gifURL = value.url;
        var gifTitle = value.title;
        $('#giphy-info').append('<li class="card cell"><a href='+ gifURL + '" target="_blank"><div><img src="' + gif + '"></div><article class="card-text"><p class="video-title">' + gifTitle + '</p></article></a></li>');
    });



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

    var moveUrlByTitle="https://online-movie-database.p.rapidapi.com/title/v2/find?title="+searchValue+"&titleType=movie&limit=6"
    
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': config.MY_MOVIE_API,
            'X-RapidAPI-Host': 'online-movie-database.p.rapidapi.com'  //movie API Changed
        }
    };
   
     //if there is history, don't call API
     //check localstorage
    if(searchHistory.some(e => e.title === searchValue)){
        const i = searchHistory.findIndex(e => e.title === searchValue)
        console.log("I didn't make api call");
        renderMovie(searchHistory[i].movieData);
    }
    else{
        console.log("Make new api call");
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
    }

 }


    

// Renders movie to Page 2
function renderMovie(data) {

    for (let i = 0; i < data.results.length; i++) { 
        var id = data.results[i].id.slice(7,16); // /title/tt1412608/  -> tt1412608 for use of searching the detail info.
        var type = data.results[i].titleType;
        var title= data.results[i].title;
        // if(data.results[i].image.hasOwnProperty(url)){
            var imgSrc=data.results[i].image.url;
        // }
        // else{
        //     var imgSrc=""
        // }
        

        //console.log(data.Poster);
        var div = $("<div>").addClass("cell small-6 large-4 auto button movieBox").attr("data-open","movieModal").attr("id" ,id);
        var img = $("<img>").attr({"src": imgSrc,"alt":title});
        div.append(img);

        var h3=$("<h3>").text(title);
        div.append(h3);
       
        $("#movie-result-container").append(div);
        

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
            $('#youtube-info').append('<li class="card"><a href="https://www.youtube.com/watch?v=' + videoURL + '" target="_blank"><div><img src="' + videoThumbnail + '"></div><article class="card-text"><small>' + channel + '</small><p class="video-title">' + videoTitle + '</p></article></a></li>');
        });
    
    
}