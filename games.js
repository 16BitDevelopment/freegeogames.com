const gamesContainer = document.getElementById("load-games");

let games = ["hello", "tradle", "hi", "globle"];

for (let gameIdx = 0; gameIdx < 8; gameIdx += 1) {
    var game = games[Math.floor(Math.random() * games.length)];
    games = filterArray(game, games);
    if (window.location.href.indexOf(game) != -1) {
        continue;
    }
    gamesContainer.append(createGame(game));
}

function createGame(gameName) {
    const game = document.createElement("div");
    game.classList.add("game");
    game.innerHTML = `
        <div class="thumb">
            <a href="../${gameName}/">
                <img src="../../thumbnails/${gameName}.png" alt="Thumbnail">
            </a>
        </div>
        <div class="text">
            <h1>${gameName}</h1>
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