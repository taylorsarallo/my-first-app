document.getElementById("greeting-btn").addEventListener("click", function () {
    alert("Hello! Welcome to my first web app!");
});

document.getElementById("fact-btn").addEventListener("click", function () {
    alert("Fun fact: The first website ever created is still online since 1991!");
});

document.getElementById("joke-btn").addEventListener("click", function () {
    alert("Why do programmers prefer dark mode? Because light attracts bugs!");
});

document.getElementById("surprise-btn").addEventListener("click", function () {
    var colors = ["#e94560", "#0f3460", "#16813d", "#f0c000", "#e91e90", "#00bcd4", "#ff5722"];
    for (var i = 0; i < 100; i++) {
        var confetti = document.createElement("div");
        confetti.classList.add("confetti");
        confetti.style.left = Math.random() * 100 + "vw";
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.width = Math.random() * 10 + 5 + "px";
        confetti.style.height = Math.random() * 10 + 5 + "px";
        confetti.style.borderRadius = Math.random() > 0.5 ? "50%" : "0";
        confetti.style.animation = "confetti-fall " + (Math.random() * 2 + 1.5) + "s ease-out forwards";
        confetti.style.animationDelay = Math.random() * 0.5 + "s";
        document.body.appendChild(confetti);
        setTimeout(function (el) {
            el.remove();
        }, 4000, confetti);
    }
});

document.getElementById("explain-btn").addEventListener("click", function () {
    alert(
        "How this JavaScript code works:\n\n" +
        "1. document.getElementById() - Finds a button on the page by its unique ID.\n\n" +
        "2. .addEventListener(\"click\", function) - Attaches a listener that waits for you to click the button.\n\n" +
        "3. function () { ... } - This is the code that runs when the click happens.\n\n" +
        "4. alert() - Opens this popup box with a message!\n\n" +
        "In short: Find the button -> Listen for a click -> Run a function -> Show an alert!"
    );
});
