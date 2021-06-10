var enterBtn = document.querySelector(".button")
var userInput = '';
var recentSearches = JSON.parse(localStorage.getItem("recentSearches")) || [];

//when user clicks enter button, run animeNameSearch function
enterBtn.addEventListener("click", function() {
    animeNameSearch();
});

//animeNameSearch function will store users input and run getAnime function
var animeNameSearch = function() {
    //set users input to variable and trim any unwanted spaces
    userInput = document.querySelector(".input").value;
    userInput.trim();
    recentSearches.push(userInput);
    recentSearches.splice(5);
    localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
    getAnime();
    displayRecentSearches();
}

var displayRecentSearches = function() {
    for(i = 0; i < recentSearches.length; i++) {
        var searchHistory = document.querySelector('.recent-searches');
        var searchItem = document.createElement('button')
        searchItem.textContent = recentSearches[i];
        searchItem.setAttribute('class', 'button is-primary m-4 mb-0')
        searchHistory.appendChild(searchItem);
    }
}

//getAnime function will fetch the anime names/pictures from the api
var getAnime = function() {
    fetch('https://api.jikan.moe/v3/search/anime?q='+ userInput)
    .then(function(response){
        return response.json();
    })
    .then(function(response) {
        console.log(response);
        var image = document.querySelector('.image')
        var text = document.querySelector('.text')
        image.innerHTML = '<img src="'+ response.results[0].image_url +'" alt="Anime Cover Image"/>'
        text.innerHTML = '<h1 class="is-size-1 has-text-weight-bold">'+ response.results[0].title +'</h1>'
        text.innerHTML += '<h2 class="is-size-4">'+ response.results[0].type +' | '+ response.results[0].rated +'</h2>'
        text.innerHTML += '<div class="mt-3 pl-2 box has-background-primary-light"><p>'+ response.results[0].synopsis +'</p>'
        return fetch('https://animechan.vercel.app/api/quotes/anime?title='+ userInput)
    })
    .then(function(response) {
        return response.json();
    })
    .then(function(response) {
        console.log(response);
        var text = document.querySelector('.text')
        text.innerHTML += '<div class="mt-3 pl-2 box has-background-link-dark has-text-light"><p class="is-italic">'+ response[0].quote +'</p><p class="has-text-right">- '+ response[0].character +'</p></div>'
    })
};

