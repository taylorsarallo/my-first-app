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
