const loadingScreen = document.getElementById("load-screen");
const activeGame = document.getElementById("active-game");
const fullscreenIcon = document.getElementById("fullscreen");
const gameIframe = document.getElementById("game");

document.addEventListener("fullscreenchange", updateFullscreen);

function gameLoaded() {
    loadingScreen.classList.add("loaded");
}

function fullscreen() {
    if (document.fullscreenElement) {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) { /* Safari */
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { /* IE11 */
            document.msExitFullscreen();
        }
    } else {
        if (activeGame.requestFullscreen) {
            activeGame.requestFullscreen();
        } else if (activeGame.webkitRequestFullscreen) { /* Safari */
            activeGame.webkitRequestFullscreen();
        } else if (activeGame.msRequestFullscreen) { /* IE11 */
            activeGame.msRequestFullscreen();
        } else {
            updateFullscreen();
        }
    }
}

function updateFullscreen() {
    document.body.classList.toggle("noscroll");
    activeGame.classList.toggle("fullscreen");

    fullscreenIcon.classList.toggle("fa-maximize");
    fullscreenIcon.classList.toggle("fa-minimize");
}