// --- Variables ---
var myName = "Taylor Sarallo";
var favoriteFood = "Pasta";
var hobby = "Coding";

// --- Display them on the page ---
document.getElementById("name-value").textContent = myName;
document.getElementById("food-value").textContent = favoriteFood;
document.getElementById("hobby-value").textContent = hobby;

// --- Flip animation on click ---
var cards = document.querySelectorAll(".info-card");
for (var i = 0; i < cards.length; i++) {
    cards[i].addEventListener("click", function () {
        this.classList.toggle("flipped");
    });
}

// --- Weather Background Loop ---
var weatherTypes = [
    { name: "sunny", label: "☀️ Sunny" },
    { name: "rainy", label: "🌧️ Rainy" },
    { name: "snowy", label: "❄️ Snowy" }
];
var weatherIndex = 0;
var weatherParticles = [];

function clearParticles() {
    for (var i = 0; i < weatherParticles.length; i++) {
        weatherParticles[i].remove();
    }
    weatherParticles = [];
}

function spawnRain() {
    for (var i = 0; i < 60; i++) {
        var drop = document.createElement("div");
        drop.classList.add("weather-particle", "raindrop");
        drop.style.left = Math.random() * 100 + "vw";
        drop.style.height = (Math.random() * 15 + 10) + "px";
        drop.style.animationDuration = (Math.random() * 0.5 + 0.4) + "s";
        drop.style.animationDelay = (Math.random() * 2) + "s";
        document.body.appendChild(drop);
        weatherParticles.push(drop);
    }
}

function spawnSnow() {
    for (var i = 0; i < 40; i++) {
        var flake = document.createElement("div");
        flake.classList.add("weather-particle", "snowflake");
        flake.textContent = "❄";
        flake.style.left = Math.random() * 100 + "vw";
        flake.style.fontSize = (Math.random() * 1 + 0.6) + "rem";
        flake.style.opacity = Math.random() * 0.6 + 0.4;
        flake.style.animationDuration = (Math.random() * 3 + 3) + "s";
        flake.style.animationDelay = (Math.random() * 3) + "s";
        document.body.appendChild(flake);
        weatherParticles.push(flake);
    }
}

function setWeather() {
    var weather = weatherTypes[weatherIndex];
    var body = document.body;
    var label = document.getElementById("weather-label");

    // Remove old weather classes
    for (var i = 0; i < weatherTypes.length; i++) {
        body.classList.remove("weather-" + weatherTypes[i].name);
    }

    // Add new weather class
    body.classList.add("weather-" + weather.name);
    label.textContent = weather.label;

    // Clear old particles and spawn new ones
    clearParticles();
    if (weather.name === "rainy") {
        spawnRain();
    } else if (weather.name === "snowy") {
        spawnSnow();
    }

    // Move to next weather, loop back to 0
    weatherIndex = (weatherIndex + 1) % weatherTypes.length;
}

// Start the first weather and loop every 5 seconds
setWeather();
setInterval(setWeather, 5000);

// --- Cat Quiz ---
function spawnEmojis(emoji) {
    for (var i = 0; i < 40; i++) {
        var el = document.createElement("div");
        el.classList.add("falling-emoji");
        el.textContent = emoji;
        el.style.left = Math.random() * 100 + "vw";
        el.style.fontSize = (Math.random() * 2 + 1.5) + "rem";
        el.style.animationDuration = (Math.random() * 2 + 2) + "s";
        el.style.animationDelay = (Math.random() * 1.5) + "s";
        document.body.appendChild(el);
        setTimeout(function (e) { e.remove(); }, 5000, el);
    }
}

document.getElementById("yes-btn").addEventListener("click", function () {
    spawnEmojis("🐱");
});

document.getElementById("no-btn").addEventListener("click", function () {
    spawnEmojis("😢");
});

// --- Cat Parade Array ---
var coloredCats = [
    { emoji: "🐱", name: "Orange Tabby" },
    { emoji: "🐈", name: "Walking Cat" },
    { emoji: "🐈‍⬛", name: "Black Cat" },
    { emoji: "😺", name: "Happy Cat" },
    { emoji: "😸", name: "Grinning Cat" },
    { emoji: "😻", name: "Love Cat" },
    { emoji: "😼", name: "Smirking Cat" },
    { emoji: "🙀", name: "Shocked Cat" },
    { emoji: "😿", name: "Sad Cat" },
    { emoji: "😾", name: "Grumpy Cat" }
];
var catParadeIndex = 0;

function showNextCat() {
    var paradeDisplay = document.getElementById("cat-parade");
    var paradeName = document.getElementById("cat-parade-name");
    var cat = coloredCats[catParadeIndex];

    paradeDisplay.textContent = cat.emoji;
    paradeName.textContent = cat.name;

    catParadeIndex = (catParadeIndex + 1) % coloredCats.length;
}

showNextCat();
setInterval(showNextCat, 1500);

// --- Kitty Functions ---
function playWithYarn() {
    var kitty = document.getElementById("kitty-display");
    var status = document.getElementById("kitty-status");
    kitty.textContent = "🐱🧶";
    kitty.classList.remove("sleeping");
    kitty.classList.add("playing");
    status.textContent = "Kitty is playing with yarn! 🎉";
}

function sleepKitty() {
    var kitty = document.getElementById("kitty-display");
    var status = document.getElementById("kitty-status");
    kitty.textContent = "😺💤";
    kitty.classList.remove("playing");
    kitty.classList.add("sleeping");
    status.textContent = "Shhh... kitty is sleeping... 🌙";
}

document.getElementById("play-btn").addEventListener("click", playWithYarn);
document.getElementById("sleep-btn").addEventListener("click", sleepKitty);

// --- Mad Libs ---
var storyTemplates = [
    function (adj, noun, verb, animal, place) {
        return "One " + adj + " morning, a " + animal + " found a magical " + noun + " in " + place + ". It " + verb + " around wildly until the " + noun + " started glowing. The " + animal + " became the most " + adj + " hero " + place + " had ever seen!";
    },
    function (adj, noun, verb, animal, place) {
        return "A " + adj + " " + animal + " " + verb + " all the way to " + place + " just to find the perfect " + noun + ". When it got there, the " + noun + " " + verb + " right back! The " + adj + " " + animal + " couldn't believe its eyes!";
    },
    function (adj, noun, verb, animal, place) {
        return "In " + place + ", there lived a " + adj + " " + animal + " who loved to collect " + noun + "s. One day it " + verb + " so hard that all the " + noun + "s flew into the sky! Now everyone in " + place + " calls it the " + adj + " " + noun + " storm!";
    }
];

document.getElementById("madlibs-btn").addEventListener("click", function () {
    var adjective = document.getElementById("ml-adjective").value.trim();
    var noun = document.getElementById("ml-noun").value.trim();
    var verb = document.getElementById("ml-verb").value.trim();
    var animal = document.getElementById("ml-animal").value.trim();
    var place = document.getElementById("ml-place").value.trim();

    if (!adjective || !noun || !verb || !animal || !place) {
        alert("Please fill in all the words first!");
        return;
    }

    // Pick a random story template
    var randomIndex = Math.floor(Math.random() * storyTemplates.length);
    var story = storyTemplates[randomIndex](adjective, noun, verb, animal, place);

    // Highlight the user's words in the story
    var words = [adjective, noun, animal, place, verb];
    var storyHTML = story;
    for (var i = 0; i < words.length; i++) {
        var regex = new RegExp(words[i], "gi");
        storyHTML = storyHTML.replace(regex, '<span class="highlight">' + words[i] + '</span>');
    }

    var storyDiv = document.getElementById("madlibs-story");
    storyDiv.innerHTML = storyHTML;
    storyDiv.classList.add("visible");
});
