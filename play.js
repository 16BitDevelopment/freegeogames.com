const loadingScreen = document.getElementById("load-screen");
const activeGame = document.getElementById("active-game");
const fullscreenIcon = document.getElementById("fullscreen");
const gameIframe = document.getElementById("game");

function gameLoaded() {
    loadingScreen.classList.add("loaded");
}

function fullscreen() {
    alert("fullscreen() called");

    activeGame.classList.remove("mobile");
    activeGame.classList.remove("fullscreen");
    document.body.classList.remove("noscroll");

    fullscreenIcon.classList.add("fa-maximize");
    fullscreenIcon.classList.remove("fa-minimize");

    if (document.fullscreenElement) {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) { /* Safari */
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { /* IE11 */
            document.msExitFullscreen();
        }
    } else {
        activeGame.classList.add("fullscreen");
        document.body.classList.add("noscroll");

        fullscreenIcon.classList.add("fa-minimize");
        fullscreenIcon.classList.remove("fa-maximize");

        if (activeGame.requestFullscreen) {
            activeGame.requestFullscreen();
        } else if (activeGame.webkitRequestFullscreen) { /* Safari */
            activeGame.webkitRequestFullscreen();
        } else if (activeGame.msRequestFullscreen) { /* IE11 */
            activeGame.msRequestFullscreen();
        } else {
            //activeGame.classList.add("mobile");
            alert("mobile fullscreen");
        }
    }
}