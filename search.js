const searchBar = document.getElementById("search-bar");

searchBar.addEventListener("focus", (event) => {
    event.style.backgroundColor = "blue";
});