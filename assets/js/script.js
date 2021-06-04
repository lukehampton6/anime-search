var enterBtn = document.querySelector(".button")
var userInput = document.querySelector(".input")
var apiUrl = "https://api.jikan.moe/v3/search/anime?q=naruto";
var animeName = userInput.value.trim();
var animeList = document.querySelector("#animeList")

var animeNameSearch = function(event) {
    
    if(animeName) {
        getAnime(animeName);
        userInput.value = "";
    } else {
        return;
    }
}

var displayAnime = function(animesearch) {
    userInput.textContent=""
    if(animesearch.length === 0) {
        animeList.textContent = "no anime found"
        return;
    }
    for(var i = 0; i < animesearch.length; i++) {

    }


}

var getAnime = function(anime) {
    fetch(apiUrl)
    .then(function(response){
        if(response.ok) {
            response.json().then(function(data){
                displayAnime(data, anime)
            })
        }
    })
}

enterBtn.addEventListener("submit", animeNameSearch())