// REQUESTING API

var requestUrl = 'https://api.giphy.com/v1/gifs/trending?limit=5&api_key=wvV8XbpunUwtfHCUuAUptsJJmdb4yn01';

fetch(requestUrl)
  .then(function (response) {
    // console.log(response.json());
    return response.json();
  })
  .then(function (result) {
    console.log(result);
    console.log(result.data[0]);
    for (var i = 0; i < result.data.length; i++) {
        document.querySelector("#image" + i).setAttribute("src",result.data[i].images.original.url);
        console.log("for loop - api");
        console.log(result.data[i].images.original.url);
        console.log(result.data[i].title);
      }
  });

