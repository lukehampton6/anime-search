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
  getAnime();
  searchHistory.innerHTML = "";
  displayRecentSearches();
};

var displayRecentSearches = function () {
  for (i = 0; i < recentSearches.length; i++) {
    var searchItem = document.createElement("button");
    searchItem.textContent = recentSearches[i];
    searchItem.setAttribute("class", "button is-primary m-4 mb-0 search-item");
    searchHistory.appendChild(searchItem);
  }
};

// var clickSearchItem = function() {
//     if (recentSearches == 0) {
//       return;
//     } else {
//       document.querySelector('.search-item').addEventListener('click', function() {
//         var searchItemValue = document.querySelector('.search-item').innerHTML;
//         userInput = searchItemValue;
//         animeNameSearch();
//       });
//     };
//   };

//getAnime function will fetch the anime names/pictures from the api
var getAnime = function () {
  fetch("https://api.jikan.moe/v3/search/anime?q=" + userInput)
    .then(function (response) {
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
      console.log(response);
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
        "https://animechan.vercel.app/api/quotes/anime?title=" + userInput
      );
    })
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      console.log(response);
      var text = document.querySelector(".text");
      text.innerHTML +=
        '<div class="mt-3 pl-2 box has-background-link-dark has-text-light"><p class="is-italic">' +
        response[0].quote +
        '</p><p class="has-text-right">- ' +
        response[0].character +
        "</p></div>";
    });
};

// clickSearchItem();
displayRecentSearches();