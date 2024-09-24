// tabs

const navTabs = document.getElementsByClassName("box");
const blackOverlay = document.getElementById("black-overlay");
const navBtns = document.getElementById("nav-btns");
const hamburger = document.getElementById("hamburger-toggle");

blackOverlay.addEventListener("click", function() {
    for (let i = 0; i < navTabs.length; i += 1) {
        navTabs[i].classList.remove("show");
    }
    blackOverlay.classList.remove("show");

    Array.from(navBtns.children).forEach(el => {
        el.children[0].classList.remove("fa-solid");
        el.children[0].classList.add("fa-regular");
    });

    searchResults.classList.remove("active");
});

hamburger.addEventListener("click", () => {
    if (!hamburger.checked) {
        searchResults.classList.remove("active");
        searchResults.classList.remove("result");
        blackOverlay.classList.remove("show");

        for (let i = 0; i < navTabs.length; i += 1) {
            navTabs[i].classList.remove("show");
        }

        Array.from(navBtns.children).forEach(el => {
            el.children[0].classList.remove("fa-solid");
            el.children[0].classList.add("fa-regular");
        });
    }
});

function openTab(tab, btn) {
    searchResults.classList.remove("active");
    const tabActive = document.getElementById(tab).classList.contains("show");

    for (let i = 0; i < navTabs.length; i += 1) {
        navTabs[i].classList.remove("show");
    }

    if (!tabActive) {
        document.getElementById(tab).classList.toggle("show");
    }

    Array.from(navBtns.children).forEach(el => {
        el.children[0].classList.remove("fa-solid");
        el.children[0].classList.add("fa-regular");
    });

    btn.children[1].classList.remove("new");

    blackOverlay.classList.remove("show");

    if (document.getElementById(tab).classList.contains("show")) {
        blackOverlay.classList.add("show");

        btn.children[0].classList.toggle("fa-regular");
        btn.children[0].classList.toggle("fa-solid");
    }

    if (tab == "notifications") {
        updateNotifications();
    }
}

function closeTab(tab) {
    document.getElementById(tab).classList.remove("show");

    blackOverlay.classList.remove("show");

    Array.from(navBtns.children).forEach(el => {
        el.children[0].classList.remove("fa-solid");
        el.children[0].classList.add("fa-regular");
    });
}

//favourite games
const isHome = window.location.href.indexOf("/play") == -1;

const favouriteGamesList = document.getElementById("favourite-games");
const favouriteBtn = document.getElementById("favourite-btn") || null;

let allFavouriteGames = getFavouriteGames();
updateFavouriteGamesList();

let favouriteBtnHref = null;

if (!isHome) {
    favouriteBtnHref = favouriteBtn.getAttribute("data-href");
}

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
    if (isHome) {
        return;
    }

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
        href = "../../" + href;
        thumb = "../../" + thumb;
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

//notifications
const allNotifications = [
    ["star", "Welcome!", "Welcome to Free Geo Games! Browse around some games to get started."]
];

const notifictionsBox = document.getElementById("notifications-items");
const notifcationsIcon = document.getElementById("notifications-btn");
const notificationsLS = localStorage.getItem("notifications") || 0;

if (notificationsLS < allNotifications.length) {
     notifcationsIcon.children[1].classList.add("new");
}

loadNotifications();

function updateNotifications() {
    localStorage.setItem("notifications", allNotifications.length);
}

function loadNotifications() {
    allNotifications.forEach(item => {
        notifictionsBox.append(createItem(item))
    });
}

function createItem(itemInfo) {
    const item = document.createElement("div");
    item.classList.add("item");
    item.innerHTML = `
        <div class="icon">
            <i class="fa-solid fa-${itemInfo[0]}"></i>
        </div>
        <div class="text">
            <h1>${itemInfo[1]}</h1>
            <p>${itemInfo[2]}</p>
        </div>
    `;
    return item;
}