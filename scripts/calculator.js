// --- Calculator Variables ---
var displayValue = "0";
var firstNumber = null;
var operator = null;
var waitingForSecond = false;

var display = document.getElementById("calc-display");
var reaction = document.getElementById("calc-reaction");

// --- Update the display ---
function updateDisplay() {
    display.textContent = displayValue;
}

// --- Fun reactions based on the result ---
function showReaction(result) {
    var message = "";
    if (result === 0) {
        message = "🫥 Zero! Nothing to see here!";
    } else if (result === 42) {
        message = "🌌 The answer to everything!";
    } else if (result === 69) {
        message = "😏 Nice.";
    } else if (result === 404) {
        message = "🔍 Result not found... just kidding!";
    } else if (result < 0) {
        message = "🥶 Brr! That's a negative number!";
    } else if (result > 9999) {
        message = "🤯 Whoa, that's a BIG number!";
    } else if (result > 100) {
        message = "💪 Over 100! Impressive!";
    } else if (Number.isInteger(result)) {
        message = "✨ Nice and clean!";
    } else {
        message = "🤓 Ooh, decimals! Fancy!";
    }
    reaction.textContent = message;
    reaction.classList.remove("reaction-pop");
    // Trigger reflow to restart animation
    void reaction.offsetWidth;
    reaction.classList.add("reaction-pop");
}

// --- Calculate the result ---
function calculate(first, op, second) {
    if (op === "+") return first + second;
    if (op === "-") return first - second;
    if (op === "*") return first * second;
    if (op === "/") {
        if (second === 0) {
            reaction.textContent = "💥 Can't divide by zero! The universe would break!";
            reaction.classList.remove("reaction-pop");
            void reaction.offsetWidth;
            reaction.classList.add("reaction-pop");
            return null;
        }
        return first / second;
    }
    if (op === "%") return first % second;
    return second;
}

// --- Number button clicks ---
var numButtons = document.querySelectorAll(".calc-num");
for (var i = 0; i < numButtons.length; i++) {
    numButtons[i].addEventListener("click", function () {
        var num = this.getAttribute("data-num");

        if (waitingForSecond) {
            displayValue = num;
            waitingForSecond = false;
        } else {
            if (num === "." && displayValue.indexOf(".") !== -1) return;
            if (displayValue === "0" && num !== ".") {
                displayValue = num;
            } else {
                displayValue = displayValue + num;
            }
        }
        updateDisplay();
    });
}

// --- Operator button clicks ---
var opButtons = document.querySelectorAll(".calc-op");
for (var i = 0; i < opButtons.length; i++) {
    opButtons[i].addEventListener("click", function () {
        var nextOp = this.getAttribute("data-op");
        var current = parseFloat(displayValue);

        if (firstNumber !== null && !waitingForSecond) {
            var result = calculate(firstNumber, operator, current);
            if (result === null) {
                firstNumber = null;
                operator = null;
                displayValue = "0";
                updateDisplay();
                return;
            }
            displayValue = String(result);
            updateDisplay();
            firstNumber = result;
        } else {
            firstNumber = current;
        }

        operator = nextOp;
        waitingForSecond = true;
    });
}

// --- Equals button ---
document.getElementById("calc-equals").addEventListener("click", function () {
    if (firstNumber === null || operator === null) return;

    var second = parseFloat(displayValue);
    var result = calculate(firstNumber, operator, second);

    if (result === null) {
        displayValue = "0";
        firstNumber = null;
        operator = null;
        updateDisplay();
        return;
    }

    // Round to avoid floating point weirdness
    result = Math.round(result * 1000000000) / 1000000000;

    displayValue = String(result);
    updateDisplay();
    showReaction(result);

    firstNumber = null;
    operator = null;
    waitingForSecond = false;
});

// --- Clear button ---
document.getElementById("calc-clear").addEventListener("click", function () {
    displayValue = "0";
    firstNumber = null;
    operator = null;
    waitingForSecond = false;
    updateDisplay();
    reaction.textContent = "🧹 All clean! Fresh start!";
    reaction.classList.remove("reaction-pop");
    void reaction.offsetWidth;
    reaction.classList.add("reaction-pop");
});
