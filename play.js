const loadingScreen = document.getElementById("load-screen");
const activeGame = document.getElementById("active-game");

function gameLoaded() {
    loadingScreen.classList.add("loaded")
}

function fullscreen() {
    activeGame.classList.toggle("fullscreen");
}