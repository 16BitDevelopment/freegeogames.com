const loadingScreen = document.getElementById("load-screen");
const activeGame = document.getElementById("active-game");
const fullscreenIcon = document.getElementById("fullscreen");
const gameIframe = document.getElementById("game");

function gameLoaded() {
    loadingScreen.classList.add("loaded");
}

function fullscreen() {
    if (document.fullscreenElement) {
        document.exitFullscreen();
    } else {
        activeGame.requestFullscreen();
    }
}

document.addEventListener("fullscreenchange", () => {
    document.body.classList.toggle("noscroll");
    activeGame.classList.toggle("fullscreen");

    fullscreenIcon.classList.toggle("fa-maximize");
    fullscreenIcon.classList.toggle("fa-minimize");
});