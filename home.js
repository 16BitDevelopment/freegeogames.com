const popularGames = document.getElementById("popular-games");
const dots = document.getElementById("active-game-display");

let activePopularGame = 1;

dotsInit();
updateActiveGame();

const popularGameLoop = setInterval(() => {
    activePopularGame += 1;
    updateActiveGame();
}, 5000);

function stopLoop() {
    clearInterval(popularGameLoop);
}

function dotsInit() {
    for(let i = 0; i < Array.from(popularGames.children).length; i += 1) {
        const el = document.createElement("div");
        el.classList.add("dot")
        dots.append(el);
    }
}

function updateActiveGame() {
    if (activePopularGame > Array.from(popularGames.children).length) {
        activePopularGame = 1
    } else if (activePopularGame < 1) {
        activePopularGame = Array.from(popularGames.children).length;
    }

    popularGames.setAttribute("data-active-game", activePopularGame);

    Array.from(popularGames.children).forEach((el) => {
        el.classList.remove("active");
    });
    popularGames.children[activePopularGame - 1].classList.add("active");

    Array.from(dots.children).forEach(dot => {
        dot.classList.remove("active");
    });
    dots.children[activePopularGame - 1].classList.add("active");
}