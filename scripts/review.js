// ===============================
// ✅ REVIEW COUNTER (localStorage)
// ===============================

// get current count
let count = localStorage.getItem("reviewCount");

// if no count yet → start at 0
if (!count) {
    count = 0;
}

// increment
count++;

// save back
localStorage.setItem("reviewCount", count);

// display on page
document.getElementById("reviewCount").textContent = count;


// ===============================
// ✅ FOOTER YEAR
// ===============================
document.getElementById("year").textContent = new Date().getFullYear();