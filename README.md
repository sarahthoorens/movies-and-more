# Movies & More

Project Goal: Collaboratively build a front-end web application that helps with a need in the world.

Deployed Link: https://sarahthoorens.github.io/movies-and-more/ </br>
Deployed Date: 10/13/22

### Contributors
  Yeon Seo: https://github.com/rogseo</br>
  Cody Berry: https://github.com/Krimeas</br>
  Katherine Maddox: https://github.com/kmaddox2122</br>
  Sarah Thoorens: https://github.com/sarahthoorens


## Project Description

We created a space for the movie enthusiast and those who are movie-curious to search for a title and find fun and interesting information related to a movie. By pulling API's from Giphy.com and YouTube.com we added some fun to what would otherwise be a mundane IMDb search. Our site pulls the movie poster, plot and rating information from IMDb via Online Movie Database API and brings it together with movie-related GIFs and linked YouTube clips in one nifty modal.  

## Application functionality

When the main page loads, the user is presented with a header with the website title, a search box just below, and three movie posters from the user's most recent search (if applicable). When the user provides a title input, they're taken to a second html page displaying six related movie poster titles. The movie titles are subtly overlayed on the posters, and when the user clicks on poster, the related modal will pop out with movie information, a reel of up to five gifs and three snippets showing linked YouTube clips. The user can exit the modal and choose a different movie from the six titles or click the linked website title to return to the homepage for a new search. 

## Acceptance Criteria
- If you search a movie by title, you would get at most 6 results from movie API.
- You are presented with poster images of a movie that you search.
- You hover over the images, you can see the movie title and click to get more information in a pop-out modal.
- The modal includes movie details (runtime, release year, plot, poster image, title and rating), 3 YouTube thumbnails & links and and a carousel of 5 related gifs.
- Your search value is saved in local storage, it will render 3 movie posters from your last search on the home page.

</br>

## Project Requirements Provided
```
You and your group will use everything you’ve learned over the past six modules to create a real-world front-end application that you’ll be able to showcase to potential employers. The user story and acceptance criteria will depend on the project that you create, but your project must fulfil the following requirements:

* Use a CSS framework other than Bootstrap.

* Be deployed to GitHub Pages.

* Be interactive (i.e., accept and respond to user input).

* Use at least two [server-side APIs](https://coding-boot-camp.github.io/full-stack/apis/api-resources).

* Does not use alerts, confirms, or prompts (use modals).

* Use client-side storage to store persistent data.

* Be responsive.

* Have a polished UI.

* Have a clean repository that meets quality coding standards (file structure, naming conventions, follows best practices for class/id naming conventions, indentation, quality comments, etc.).

* Have a quality README (with unique name, description, technologies used, screenshot, and link to deployed application).
```



------------------------------------------------------------
#### Website Flow

<!-- first Image -->
![landing page](./Asset/images/landing1.jpeg)
</br>
<!-- Second Image -->
![landing page w/ comment](./Asset/images/landing2.jpeg)
</br>
<!-- Third Image -->
![populated poster page](./Asset/images/listing1.JPG)
</br>
<!-- Fourth Image -->
![populated poster page w/ comment](./Asset/images/listing2.JPG)
</br>
<!-- Fifth Image -->
![modal page](./Asset/images/modal1.JPG)
</br>
<!-- Sixth Image -->
![modal page w/ comment](./Asset/images/modal2.JPG)


------------------------------------------------------------

### Technologies used in this project were:
  1. HTML
  2. CSS
  3. VSCode
  4. Google Slides
  5. Foundation CSS
  6. Git bash for windows
  7. Chrome Web Browser & Dev Tools

------------------------------------------------------------

#### Additional Sources:
  1. Carousel for gifs - https://css-tricks.com/css-only-carousel/
  2. Movie API - Online Movie Database : https://rapidapi.com/apidojo/api/online-movie-database
  3. YouTube API - https://developers.google.com/youtube/v3
  4. Giphy API - https://developers.giphy.com/
  5. UTA Bootcamp previous homeworks/lecture materials.


 

Task details supplied by UT Austin Coding Bootcamp.

This code follows the MIT License!
