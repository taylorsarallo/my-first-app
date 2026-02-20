// Kick Counter - Baby Kick Tracking App

var currentView = "day";

function getToday() {
    var d = new Date();
    var year = d.getFullYear();
    var month = String(d.getMonth() + 1).padStart(2, "0");
    var day = String(d.getDate()).padStart(2, "0");
    return year + "-" + month + "-" + day;
}

function loadData() {
    var raw = localStorage.getItem("kickData");
    return raw ? JSON.parse(raw) : {};
}

function saveData(data) {
    localStorage.setItem("kickData", JSON.stringify(data));
}

function formatTime(timeStr) {
    var parts = timeStr.split(":");
    var h = parseInt(parts[0]);
    var m = parts[1];
    var s = parts[2];
    var ampm = h >= 12 ? "PM" : "AM";
    h = h % 12 || 12;
    return h + ":" + m + ":" + s + " " + ampm;
}

function getCurrentTime() {
    var d = new Date();
    var h = String(d.getHours()).padStart(2, "0");
    var m = String(d.getMinutes()).padStart(2, "0");
    var s = String(d.getSeconds()).padStart(2, "0");
    return h + ":" + m + ":" + s;
}

function updateTodayCount() {
    var data = loadData();
    var today = getToday();
    var count = data[today] ? data[today].length : 0;
    document.getElementById("kick-today-count").textContent = "Today: " + count + " kick" + (count === 1 ? "" : "s");
}

function showReaction(count) {
    var reaction = document.getElementById("kick-reaction");
    var messages = [
        "She's saying hello! 👋",
        "Little dancer! 💃",
        "So active today! 🌟",
        "Growing strong! 💪",
        "She loves you! 💕",
        "Tiny ninja moves! 🥷",
        "Aww, she's awake! 🌸",
        "Party in there! 🎉",
        "Future soccer star! ⚽",
        "She's stretching! 🤸"
    ];
    var msg = messages[Math.floor(Math.random() * messages.length)];
    if (count === 10) msg = "10 kicks! 🎀 You're doing amazing!";
    if (count === 25) msg = "25 kicks! 🎉 What an active baby!";
    if (count === 50) msg = "50 kicks! 🏆 Wow — she's a champ!";
    reaction.textContent = msg;
    reaction.classList.remove("kick-reaction-pop");
    void reaction.offsetWidth;
    reaction.classList.add("kick-reaction-pop");
}

function recordKick() {
    var data = loadData();
    var today = getToday();
    if (!data[today]) data[today] = [];
    data[today].push(getCurrentTime());
    saveData(data);

    var count = data[today].length;

    // Pulse the button
    var btn = document.getElementById("kick-btn");
    btn.classList.remove("kick-pulse");
    void btn.offsetWidth;
    btn.classList.add("kick-pulse");

    updateTodayCount();
    showReaction(count);
    refreshView();
}

function renderDayView() {
    var data = loadData();
    var today = getToday();
    var kicks = data[today] || [];
    var log = document.getElementById("kick-log");
    var noMsg = document.getElementById("no-kicks-msg");

    log.innerHTML = "";

    if (kicks.length === 0) {
        noMsg.style.display = "block";
        return;
    }
    noMsg.style.display = "none";

    for (var i = 0; i < kicks.length; i++) {
        var li = document.createElement("li");
        li.className = "kick-log-item kick-pop-in";
        li.innerHTML = "<span class='kick-num'>Kick #" + (i + 1) + "</span><span class='kick-time'>" + formatTime(kicks[i]) + "</span>";
        log.appendChild(li);
    }
}

function getWeekDates() {
    var today = new Date();
    var dayOfWeek = today.getDay(); // 0 = Sunday
    var dates = [];
    for (var i = 0; i < 7; i++) {
        var d = new Date(today);
        d.setDate(today.getDate() - dayOfWeek + i);
        var year = d.getFullYear();
        var month = String(d.getMonth() + 1).padStart(2, "0");
        var day = String(d.getDate()).padStart(2, "0");
        dates.push(year + "-" + month + "-" + day);
    }
    return dates;
}

function renderWeekView() {
    var data = loadData();
    var weekDates = getWeekDates();
    var dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    var grid = document.getElementById("week-grid");
    var today = getToday();

    grid.innerHTML = "";

    var maxKicks = 1;
    for (var i = 0; i < weekDates.length; i++) {
        var c = data[weekDates[i]] ? data[weekDates[i]].length : 0;
        if (c > maxKicks) maxKicks = c;
    }

    for (var i = 0; i < weekDates.length; i++) {
        var dateStr = weekDates[i];
        var kicks = data[dateStr] ? data[dateStr].length : 0;
        var barPct = Math.round((kicks / maxKicks) * 100);

        var row = document.createElement("div");
        row.className = "week-day-row" + (dateStr === today ? " week-today" : "");

        var label = document.createElement("span");
        label.className = "week-day-label";
        label.textContent = dayNames[i];

        var barWrap = document.createElement("div");
        barWrap.className = "week-bar-wrap";

        var bar = document.createElement("div");
        bar.className = "week-bar";
        bar.style.width = (kicks > 0 ? Math.max(barPct, 8) : 0) + "%";

        var count = document.createElement("span");
        count.className = "week-day-count";
        count.textContent = kicks + " kick" + (kicks === 1 ? "" : "s");

        barWrap.appendChild(bar);
        row.appendChild(label);
        row.appendChild(barWrap);
        row.appendChild(count);
        grid.appendChild(row);
    }
}

function renderMonthView() {
    var data = loadData();
    var now = new Date();
    var year = now.getFullYear();
    var month = now.getMonth();
    var today = getToday();

    var monthNames = ["January","February","March","April","May","June",
                      "July","August","September","October","November","December"];
    document.getElementById("month-title").textContent = monthNames[month] + " " + year;

    var grid = document.getElementById("month-grid");
    grid.innerHTML = "";

    // First day of month
    var firstDay = new Date(year, month, 1).getDay();
    var daysInMonth = new Date(year, month + 1, 0).getDate();

    // Empty cells before first day
    for (var i = 0; i < firstDay; i++) {
        var empty = document.createElement("div");
        empty.className = "month-cell month-cell-empty";
        grid.appendChild(empty);
    }

    for (var d = 1; d <= daysInMonth; d++) {
        var dateStr = year + "-" + String(month + 1).padStart(2, "0") + "-" + String(d).padStart(2, "0");
        var kicks = data[dateStr] ? data[dateStr].length : 0;

        var cell = document.createElement("div");
        cell.className = "month-cell" + (kicks > 0 ? " month-has-kicks" : "") + (dateStr === today ? " month-today" : "");

        var dayNum = document.createElement("span");
        dayNum.className = "month-day-num";
        dayNum.textContent = d;

        cell.appendChild(dayNum);

        if (kicks > 0) {
            var kickBadge = document.createElement("span");
            kickBadge.className = "month-kick-badge";
            kickBadge.textContent = kicks;
            cell.appendChild(kickBadge);
        }

        grid.appendChild(cell);
    }
}

function refreshView() {
    if (currentView === "day") renderDayView();
    else if (currentView === "week") renderWeekView();
    else if (currentView === "month") renderMonthView();
}

function showView(viewName) {
    currentView = viewName;
    var views = document.querySelectorAll(".kick-view");
    for (var i = 0; i < views.length; i++) {
        views[i].classList.add("kick-hidden");
    }
    document.getElementById("view-" + viewName).classList.remove("kick-hidden");

    var btns = document.querySelectorAll(".kick-view-btn");
    for (var i = 0; i < btns.length; i++) {
        btns[i].classList.remove("active");
        if (btns[i].getAttribute("data-view") === viewName) {
            btns[i].classList.add("active");
        }
    }

    refreshView();
}

function undoLastKick() {
    var data = loadData();
    var today = getToday();
    if (!data[today] || data[today].length === 0) return;
    data[today].pop();
    if (data[today].length === 0) delete data[today];
    saveData(data);
    updateTodayCount();
    refreshView();
}

function clearDay() {
    var data = loadData();
    var today = getToday();
    if (!data[today] || data[today].length === 0) return;
    if (!confirm("Clear all kicks for today?")) return;
    delete data[today];
    saveData(data);
    updateTodayCount();
    refreshView();
}

function updatePregnancyWeek() {
    // Known anchor: Feb 19, 2026 = 22 weeks & 6 days (160 days pregnant)
    var knownMs = Date.UTC(2026, 1, 19); // Feb 19, 2026 in UTC
    var knownDays = 160; // 22 * 7 + 6

    var now = new Date();
    var todayMs = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());

    var diffDays = Math.round((todayMs - knownMs) / (1000 * 60 * 60 * 24));
    var totalDays = knownDays + diffDays;

    var weeks = Math.floor(totalDays / 7);
    var days = totalDays % 7;

    var el = document.getElementById("pregnancy-week");
    if (totalDays >= 280) {
        el.textContent = "40 weeks — your due date!";
    } else {
        el.textContent = weeks + " weeks & " + days + " day" + (days === 1 ? "" : "s") + " pregnant";
    }

}

// Init
document.getElementById("kick-btn").addEventListener("click", recordKick);
document.getElementById("undo-btn").addEventListener("click", undoLastKick);
document.getElementById("clear-day-btn").addEventListener("click", clearDay);

var viewBtns = document.querySelectorAll(".kick-view-btn");
for (var i = 0; i < viewBtns.length; i++) {
    viewBtns[i].addEventListener("click", function() {
        showView(this.getAttribute("data-view"));
    });
}

updateTodayCount();
updatePregnancyWeek();
renderDayView();
