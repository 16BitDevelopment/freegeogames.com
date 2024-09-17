let activeGame = localStorage.getItem("activeGame");

function playGame() {
    let page = "play";

    if (!isHome()) {
        page = "/" + page;
    }

    window.location.href = page;
}

function home() {
    let page = "/";

    if (!isHome()) {
        page = ".." + page;
    }
    window.location.href = page;
}

function isHome() {
    return window.location.href.indexOf("/play") == -1;
}