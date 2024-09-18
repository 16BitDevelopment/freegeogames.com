const loadingScreen = document.getElementById("load-screen");
const activeGame = document.getElementById("active-game");
const fullscreenIcon = document.getElementById("fullscreen");

function gameLoaded() {
    loadingScreen.classList.add("loaded")
}

function fullscreen() {
    activeGame.classList.toggle("fullscreen");

    fullscreenIcon.classList.toggle("fa-maximize");
    fullscreenIcon.classList.toggle("fa-minimize");
}