let games = ["globle", "tradle", "travle", "flagle", "worldle", "statele", "globle-capitals"];

// load games

const gamesContainer = document.getElementById("load-games");

otherGames = Array.from(games);

for (let gameIdx = 0; gameIdx < 8; gameIdx += 1) {
    var game = otherGames[Math.floor(Math.random() * otherGames.length)];
    if (otherGames.length < 1) {
        break;
    }
    otherGames = filterArray(game, otherGames);
    if (window.location.href.indexOf(game) != -1) {
        gameIdx -= 1;
        continue;
    }
    gamesContainer.append(createGame(game));
}

function createGame(gameName) {
    const game = document.createElement("div");
    const realGameName = gameName.replace("-", " ")
    let page = "play/";
    let thumb = `thumbnails/${gameName}.png`;
    if (window.location.href.indexOf("/play") != -1) {
        page = "../";
        thumb = "../../" + thumb;
    }
    game.classList.add("game");
    game.innerHTML = `
        <div class="thumb">
            <a href="${page}${gameName}/">
                <img src="${thumb}" alt="Thumbnail">
            </a>
        </div>
        <div class="text">
            <h1>${realGameName}</h1>
        </div>
    `;

    return game;
}

function filterArray(str, array) {
    var output = [];
    array.forEach(val => {
        if (val != str) {
            output.push(val);
        }
    });

    return output;
}

// search bar

const searchBar = document.getElementById("search-bar");
const searchResults = document.getElementById("search-results");
let searchResultsList = []

searchBar.addEventListener("input", (evt) => {
    if (searchBar.value == "") {
        searchResults.classList.remove("active");

        blackOverlay.classList.remove("show");

        return;
    }

    for (let i = 0; i < navTabs.length; i += 1) {
        navTabs[i].classList.remove("show");
    }

    Array.from(navBtns.children).forEach(el => {
        el.children[0].classList.remove("fa-solid");
        el.children[0].classList.add("fa-regular");
    });

    blackOverlay.classList.add("show");

    searchResultsList = searchGames(searchBar.value.toLowerCase());
    createSearchResults(searchResultsList);

    searchResults.classList.add("active");
});

function searchGames(searchVal) {
    let gameResults = [];
    let tmpGames = Array.from(games);

    tmpGames.forEach(game => {
        if (game.startsWith(searchVal)) {
            gameResults.push(game);
            tmpGames = filterArray(game, tmpGames);
        }
    });

    tmpGames.forEach(game => {
        if (game.includes(searchVal)) {
            gameResults.push(game);
            tmpGames = filterArray(game, tmpGames);
        }
    });

    return gameResults;
}

function createSearchResults(results) {
    searchResults.innerHTML =  `
    <div class="no-results">
        <h1>No Results</h1>
        <i class="fa-solid fa-magnifying-glass"></i>
    </div>
    `;
    searchResults.classList.remove("result");

    Array.from(results).forEach((result) => {
        searchResults.append(createSearchResult(result));
        searchResults.classList.add("result");
    });
}

function createSearchResult(name) {
    const gameName = name.replace("-", " ")
    let thumb = "thumbnails/" + name + ".png";
    let href = "play/" + name;
    let isFavourite = "";
    if (window.location.href.indexOf("/play") != -1) {
        href = "../../" + href;
        thumb = "../../" + thumb;
    }

    allFavouriteGames.forEach((item) => {
        if (item == name) {
            isFavourite = "<p>&#183; In Favourites</p>";
        }
    });

    const game = document.createElement("a");
    game.classList.add("game");
    game.setAttribute("href", href);
    game.innerHTML =   `
        <div class="thumb">
            <img src="${thumb}" alt="Thumbnail">
        </div>
        <div class="text">
            <h1>${gameName}</h1>
            ${isFavourite}
        </div>
    `;

    return game;
}