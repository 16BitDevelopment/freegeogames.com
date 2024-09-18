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

    blackOverlay.addEventListener("click", function() {
        document.getElementById(tab).classList.remove("show");
        blackOverlay.classList.remove("show");
    });
}

function closeTab(tab) {
    document.getElementById(tab).classList.remove("show");

    blackOverlay.classList.remove("show");
}

//favourite games

const favouriteGamesList = document.getElementById("favourite-games");
const favouriteBtn = document.getElementById("favourite-btn") || null;

let allFavouriteGames = getFavouriteGames();
updateFavouriteGamesList();

const favouriteBtnHref = favouriteBtn.getAttribute("data-href");

updateFavouriteBtn();

function addFavouriteGame() {
    if (favouriteBtn.children[0].classList.contains("fa-solid")) {

        favouriteBtn.children[0].classList.remove("fa-solid");
        favouriteBtn.children[0].classList.add("fa-regular");

        removeFavouriteGame(isFavouriteGame(favouriteBtnHref));

        document.getElementById("favourites-notification").classList.remove("new");  

        return;
    }

    favouriteBtn.children[0].classList.remove("fa-regular");
    favouriteBtn.children[0].classList.add("fa-solid");

    const favouriteGame = favouriteBtnHref;
    allFavouriteGames.unshift(favouriteGame);
    updateFavouriteGamesList();
    saveFavouriteGames();

    document.getElementById("favourites-notification").classList.add("new");    
}

function isFavouriteGame(href) {
    let id;

    allFavouriteGames.forEach((game, gameIdx) => {
        if (game == href) {
            id = gameIdx;
        }
    });

    return id;
}

function updateFavouriteBtn() {
    favouriteBtn.children[0].classList.remove("fa-regular");
    favouriteBtn.children[0].classList.remove("fa-solid");

    if (isFavouriteGame(favouriteBtnHref) != undefined) {
        favouriteBtn.children[0].classList.add("fa-solid");
    } else {
        favouriteBtn.children[0].classList.add("fa-regular");
    }
}

function removeFavouriteGame(id) {
    allFavouriteGames = allFavouriteGames.filter((_, i) => i !== id);
    saveFavouriteGames();
    updateFavouriteGamesList();
    updateFavouriteBtn();
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
    let thumb = "thumbnails/" + game + ".png";
    let href = "play/" + game;
    if (window.location.href.indexOf("/play") != -1) {
        href = "/" + href;
        thumb = "/" + thumb;
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