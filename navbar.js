// tabs

const navTabs = document.getElementsByClassName("box");
const blackOverlay = document.getElementById("black-overlay");

function openTab(tab, btn) {
    const tabActive = document.getElementById(tab).classList.contains("show");

    for (let i = 0; i < navTabs.length; i += 1) {
        navTabs[i].classList.remove("show");
    }

    if (!tabActive) {
        document.getElementById(tab).classList.toggle("show");
    }

    btn.children[1].classList.remove("new");

    blackOverlay.classList.remove("show");

    if (document.getElementById(tab).classList.contains("show")) {
        blackOverlay.classList.add("show");
    }
}

function closeTab(tab) {
    document.getElementById(tab).classList.remove("show");

    blackOverlay.classList.remove("show");
}

//favourite games

const favouriteGamesList = document.getElementById("favourite-games");

let allFavouriteGames = getFavouriteGames();
updateFavouriteGamesList();

function addFavouriteGame(thumb, href) {
    const favouriteGameObj = {
        thumbnail: thumb,
        link: href
    };
    allFavouriteGames.unshift(favouriteGameObj);
    updateFavouriteGamesList();
    saveFavouriteGames();

    document.getElementById("favourites-notification").classList.add("new");
}

function removeFavouriteGame(id) {
    allFavouriteGames = allFavouriteGames.filter((_, i) => i !== id);
    saveFavouriteGames();
    updateFavouriteGamesList();
}

function updateFavouriteGamesList() {
    favouriteGamesList.innerHTML = `
        <div class="empty-text">
            <h1>Sorry, No Favourite Games Yet.</h1>
            <i class="fa-solid fa-cloud"></i>
        </div>
    `;
    favouriteGamesList.classList.add("empty");

   allFavouriteGames.forEach((game, gameIdx) => {
        favouriteGamesList.append(createFavouriteGame(game, gameIdx));
        favouriteGamesList.classList.remove("empty");
    });
}

function createFavouriteGame(game, gameIdx) {
    const thumb = "/thumbnails/" + game.thumbnail;
    let href = "play/" + game.link;
    if (window.location.href.indexOf("/play") != -1) {
        href = "/" + href;
    }

    const favouriteGame = document.createElement("div");
    favouriteGame.className = "game";                                       
    favouriteGame.id = `game${gameIdx + 1}`
    favouriteGame.innerHTML = `
        <a class="thumbnail" href="${href}">
            <img src="${thumb}" alt="Thumbnail">
        </a>
        <div class="delete" onclick="removeFavouriteGame(${gameIdx})">
            <i class="fa-solid fa-trash"></i>
        </div>
    `;

    return favouriteGame;
}

function saveFavouriteGames() {
    const favouriteGamesJson = JSON.stringify(allFavouriteGames);
    localStorage.setItem("favouriteGames", favouriteGamesJson);
}

function getFavouriteGames() {
    const favouriteGames = localStorage.getItem("favouriteGames") || "[]";
    return JSON.parse(favouriteGames);
}