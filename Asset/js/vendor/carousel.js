// var imageUrl = 
// "https://www.geeksforgeeks.org/wp-content/uploads/jquery-banner-768x256.png";
//   $(".carousel__slide").css("background-image", "url(" + imageUrl + ")");
//   console.log("carousel slide");
//   check('carousel__slide');


//   function check(x) {
//     elements = document.getElementsByClassName(x);
//     for (var i = 0; i < elements.length; i++) {
//         elements[i].style.backgroundImage= "url('https://giphy.com/gifs/excited-birthday-yeah-yoJC2GnSClbPOkV0eA')";
//     // console.log("for loop");
//     }
//     // console.log("check function");
// }

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

