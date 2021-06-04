var enterBtn = document.querySelector(".button")
var userInput = document.querySelector(".input")
var apiUrl = "https://api.jikan.moe/v3/search/anime?q=naruto";
var animeName = userInput.value.trim();
var animeList = document.querySelector("#animeList")


//anime seach function will pull user info to get anime name
var animeNameSearch = function(event) {
    
    if(animeName) {
        getAnime(animeName);
        userInput.value = "";
    } else {
        return;
    }
}
//display anime function will be for appending anime titles/pictures to new anime list div in html
var displayAnime = function(animesearch) {
    userInput.textContent=""
    if(animesearch.length === 0) {
        animeList.textContent = "no anime found"
        return;
    }
    for(var i = 0; i < animesearch.length; i++) {

    }


}

//get anime function will fetch the anime names/pictures from the api
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