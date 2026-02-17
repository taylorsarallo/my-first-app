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
