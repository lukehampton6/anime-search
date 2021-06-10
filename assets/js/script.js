var enterBtn = document.querySelector(".button");
var userInput = "";
var id = "";
var recentSearches = JSON.parse(localStorage.getItem("recentSearches")) || [];
var searchHistory = document.querySelector(".recent-searches");

//when user clicks enter button, run animeNameSearch function
enterBtn.addEventListener("click", function () {
  animeNameSearch();
});

//animeNameSearch function will store users input and run getAnime function
var animeNameSearch = function () {
  //set users input to variable and trim any unwanted spaces
  userInput = document.querySelector(".input").value;
  userInput.trim();
  recentSearches.push(userInput);
  recentSearches.splice(5);
  localStorage.setItem("recentSearches", JSON.stringify(recentSearches));
  getAnime(userInput);
  searchHistory.innerHTML = "";
  displayRecentSearches();
};

var displayRecentSearches = function () {
  for (i = 0; i < recentSearches.length; i++) {
    var searchItem = document.createElement("button");
    searchItem.textContent = recentSearches[i];
    searchItem.setAttribute("class", "button is-primary m-4 mb-0 search-item");
    searchHistory.appendChild(searchItem);
    searchItem.addEventListener('click', clickSearchItem);
}};

 var clickSearchItem = function(e) {
     if (recentSearches == 0) {
         console.log('test');
       return;
     } else {
         var searchItemValue = e.target.innerHTML;
         console.log(searchItemValue);
         getAnime(searchItemValue);
     };
   };

//getAnime function will fetch the anime names/pictures from the api
var getAnime = function (anime) {
  fetch("https://api.jikan.moe/v3/search/anime?q=" + anime)
    .then(function (response, anime) {
      return response.json();
    })
    .then(function(response) {
        id = response.results[0].mal_id
        return fetch('https://api.jikan.moe/v3/anime/'+ id);
    })
    .then(function(response) {
        return response.json();
    })
    .then(function (response) {
      var image = document.querySelector(".image");
      var text = document.querySelector(".text");
      image.innerHTML =
        '<img src="' +
        response.image_url +
        '" alt="Anime Cover Image"/>';
      text.innerHTML =
        '<h1 class="is-size-1 has-text-weight-bold">' +
        response.title +
        "</h1>";
      text.innerHTML +=
        '<h2 class="is-size-4">' +
        response.type +
        " | " +
        response.rating +
        "</h2>";
      text.innerHTML +=
        '<div class="mt-3 pl-2 box has-background-primary-light"><p>' +
        response.synopsis +
        "</p>";
      return fetch(
        "https://animechan.vercel.app/api/quotes/anime?title=" + anime
      );
    })
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      var text = document.querySelector(".text");
      text.innerHTML +=
        '<div class="mt-3 pl-2 box has-background-link-dark has-text-light"><p class="is-italic">' +
        response[0].quote +
        '</p><p class="has-text-right">- ' +
        response[0].character +
        "</p></div>";
    });
};

displayRecentSearches();
