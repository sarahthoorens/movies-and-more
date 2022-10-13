
var searchValue="";
$("#search").on("click", (e) => {
    e.preventDefault();
    searchValue = $("#searchInput").val();
    
    getMovieApi(searchValue); 
    
});


//index2_listing.html when you click one of list of movies
$('#movie-result-container').on("click",".movieBox",(e)=>{
//$('.movieBox').on("click",(e)=>{
    e.preventDefault();   
    var selectedMovieBox_elm=$(e.target).parent(); //create .movieBox element
    var id = selectedMovieBox_elm[0].id;
    getMovieIDApi(id);
    console.log(searchValue);
    getGiphyApi(searchValue);
    getYouTubeApi(searchValue);
    
   
})
//When click history box
$('#movie-result-container').on("click",".historyBox",(e)=>{
    //$('.movieBox').on("click",(e)=>{
        e.preventDefault();   
        var selectedMovieBox_elm=$(e.target).parent(); //create .movieBox element
        searchValue = selectedMovieBox_elm[0].id;
        getMovieApi(searchValue); 
       
    })

function getMovieIDApi(id){
    var moveUrlByID="https://online-movie-database.p.rapidapi.com/title/get-overview-details?tconst="+id+"&currentCountry=US";
    
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': config.MY_MOVIE_API,
            'X-RapidAPI-Host': 'online-movie-database.p.rapidapi.com'
        }
    };
    
    fetch(moveUrlByID, options)
        .then(response => response.json())
        .then((data) => {
            console.log(data.title.title);
                    
            renderMovieModal(data);
                    
        })
        .catch(err => console.error(err));

        // if(searchHistory.some(e => e.title === searchValue))
        // if(searchHistory.some(e => e.s))
        
        //     const i = searchHistory.findIndex(e => e.title === searchValue)
        //     console.log("I didn't make api call");
        //     renderMovie(searchHistory[i].movieData);
        // }
        // else{
        //     console.log("Make new api call");
        //     fetch(moveUrlByID, options)
        //     .then(response => response.json())
        //     .then((data) => {
        //         console.log(data);
    
        //         var history={
        //             title : searchValue,
        //             movieData : data,
        //         }
                
        //         searchHistory.push(history);
        //         storeMovieTitleHistory();
        //         renderMovie(data);          
    
        //     })
        //     .catch(err => console.error(err));
        // }


}

var searchHistory=[]; //local storage for history
var movieIDHistory=[]; // local storage for movie search by id

function storeMovieIDResult(){
    // localStorage.setItem("movieIDHistory", JSON.stringify(movieIDHistory));
}

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
    $("#giphy-info").append('<h3><strong>GIPHY<strong></h3>');
   
   var div=$("<div>").addClass("grid-x grid-padding-x medium-up-4 large-up-6");

    $.each(params.data, function (i, value) {
        console.log(value);
        var gif = value.images.fixed_height.url;
        var gifURL = value.url;
        var gifTitle = value.title;
        div.append('<li class="card cell"><a href='+ gifURL + '" target="_blank"><div><img src="' + gif + '"></div></a></li>');
    });
    $("#giphy-info").append(div);
    


}
function storeMovieTitleHistory(){
    localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
}
function renderSearchHistory(){  ///first page for history


}
function init(){
    var storedHistory=JSON.parse(localStorage.getItem("searchHistory"));
    if(storedHistory !== null){
        searchHistory=storedHistory;
        /// display search history
        renderHistory(searchHistory);
        console.log("init");
    }
    
}
init();

function renderHistory(data){
    var cnt=0;
    console.log(data.length-1);
    for(let i=(data.length-1);i>=0;i--){  //get recent history first
        //max 6 history
        if(cnt<7){
            var title=data[i].movieData.results[0].title;  //title from API
            var searchValue=data[i].title;   //saved search value in local storage
            var id = data[i].movieData.results[0].id.slice(7,16);
            if(data[i].movieData.results[0].hasOwnProperty('image')){
                var imgSrc=data[i].movieData.results[0].image.url;
            }
            else{
                console.log("don't have url");
                break;
            }
            
            var div = $("<div>").addClass("cell small-6 large-4 auto button historyBox").attr("id" ,searchValue);
            var img = $("<img>").attr({"src": imgSrc,"alt":title});
            div.append(img);
    
            var h3=$("<h3>").text(title);
            div.append(h3);
           
            $("#movie-result-container").append(div);
            cnt++;
            
        }
        else{
            break;
        }

    }
}

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
            // if there is result
            if(data.hasOwnProperty("results")){
                
                var history={
                    title : searchValue,
                    movieData : data
                }
                
                searchHistory.push(history);
                storeMovieTitleHistory();
                renderMovie(data); 

            }
            else{
                console.log("no result!");
                renderMovie(data);
            }

                     

        })
        .catch(err => console.error(err));
    }

 }


    

// Renders movie to Page 2
function renderMovie(data) {

    $("#movie-result-container").empty(); //init
    //if there is result
    if(data.hasOwnProperty("results")){
        for (let i = 0; i < data.results.length; i++) { 
            var id = data.results[i].id.slice(7,16); // /title/tt1412608/  -> tt1412608 for use of searching the detail info.
            var type = data.results[i].titleType;
            var title= data.results[i].title;
            //Some data doesn't have poster url
            if(data.results[i].hasOwnProperty('image')){
                var imgSrc=data.results[i].image.url;
            }
            else{
                console.log("don't have url");
                break;
            }
           
            
            var div = $("<div>").addClass("cell small-6 large-4 auto button movieBox").attr("data-open","movieModal").attr("id" ,id);
            var img = $("<img>").attr({"src": imgSrc,"alt":title});
            div.append(img);
    
            var h3=$("<h3>").text(title);
            div.append(h3);
           
            $("#movie-result-container").append(div);
        }
    }
    else{
        var h2=$("<h2>").addClass("error").text("No results were found for your search");

        $("#movie-result-container").append(h2);

    }

    

}
function renderMovieModal(data){
    $("#movie-info").empty();//init
  
    var title=data.title.title;
    var imgSrc=data.title.image.url;
    var year=data.title.year;
    var genre=data.genre; //object
    //Some movie doesn't have plotSummary object, 
    if(data.hasOwnProperty("plotSummary")){
        var plot=data.plotSummary.text;
    }
    else if(data.hasOwnProperty("plotOutline")){
        var plot=data.plotOutline.text;
    }
    else{
        var plot="";

    }
    var rating=data.ratings.rating;
    var runTime=data.title.runningTimeInMinutes;
  


    $("#movie-info").append('<h3><strong>'+title+'</stgirong></h3><div class="media-object stacked-for-large"><div class="media-object-section"><div class="thumbnail"><img src='+imgSrc+'></div></div><div class="media-object-section main-section"><p>'+year+" - "+ runTime +"min - "+ rating+"/10</p><p>"+plot+'</p></div>')





}

function getYouTubeApi(searchValue){
    var ApiKey = config.MY_YOUTUBE_API;
    var url = "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=3&q=" + searchValue + "&key=" + ApiKey;
    console.log(url);
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

    $('#youtube-info').empty(); //init
    $("#youtube-info").append('<h3><strong>YouTube<strong></h3>').addClass("grid-x");

    $.each(data.items, function (i, value) {
        console.log(value);
        var channel = value.snippet.channelTitle;
        var videoURL = value.id.videoId;
        var videoTitle = value.snippet.title;
        var videoThumbnail = value.snippet.thumbnails.medium.url;
        $('#youtube-info').append('<li class="card"><a href="https://www.youtube.com/watch?v=' + videoURL + '" target="_blank"><div><img src="' + videoThumbnail + '"></div><article class="card-text"><small>' + channel + '</small><p class="video-title">' + videoTitle + '</p></article></a></li>');
    });
    
    
}