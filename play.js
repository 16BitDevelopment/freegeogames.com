const loadingScreen = document.getElementById("load-screen");
const activeGame = document.getElementById("active-game");
const fullscreenIcon = document.getElementById("fullscreen");
const gameIframe = document.getElementById("game");

if (window.location.href.indexOf("/play") != -1) {
    function waitForElement(selector, callback) {
        if (document.querySelector(selector)) {
          callback();
        } else {
          setTimeout(() => waitForElement(selector, callback), 500);
        }
    }
    
    waitForElement("#aswift_1", () => {
        gameIframe.style.setProperty("--ad-height", `${document.getElementById("aswift_1").offsetHeight}px`);
    });
}

function gameLoaded() {
    loadingScreen.classList.add("loaded");
}

document.addEventListener("fullscreenchange", updateFullscreen);

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