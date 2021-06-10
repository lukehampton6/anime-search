var enterBtn = document.querySelector(".button")
var userInput = '';
var apiUrl = "https://api.jikan.moe/v3/search/anime?q=naruto";
var animeList = document.querySelector("#animeList")

//when user clicks enter button, run animeNameSearch function
enterBtn.addEventListener("click", function() {
    animeNameSearch();
});

//animeNameSearch function will store users input and run getAnime function
var animeNameSearch = function() {
    //set users input to variable and trim any unwanted spaces
    userInput = document.querySelector(".input").value;
    userInput.trim();
    getAnime();
}

//display anime function will be for appending anime titles/pictures to new anime list div in html
var displayAnime = function(animesearch) {
    //text content should reset to blank after enter button is clicked and anime is displayed
    userInput.textContent=""
    //if anime isn't able to display it should return from function and say anime not found in div
    if(animesearch.length === 0) {
        animeList.textContent = "no anime found"
        return;
    }
    //beginning of for loop to list anime on page
    for(var i = 0; i < animesearch.length; i++) {

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
    })
};