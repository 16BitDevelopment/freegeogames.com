const loadingScreen = document.getElementById("load-screen");
const activeGame = document.getElementById("active-game");
const fullscreenIcon = document.getElementById("fullscreen");
const gameIframe = document.getElementById("game");

gameIframe.onscroll = function() {
    alert(4323)
}

function gameLoaded() {
    loadingScreen.classList.add("loaded");
}

function fullscreen() {
    document.body.classList.toggle("noscroll");
    activeGame.classList.toggle("fullscreen");

    fullscreenIcon.classList.toggle("fa-maximize");
    fullscreenIcon.classList.toggle("fa-minimize");
}