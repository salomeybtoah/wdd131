// place.js

// Static values (must match HTML)
const temperature = 31;
const windSpeed = 12;

// Run when page loads
document.addEventListener('DOMContentLoaded', () => {
    setFooterInfo();
    displayWindChill();
});

/* FOOTER */
function setFooterInfo() {
    document.getElementById('currentyear').textContent = new Date().getFullYear();
    document.getElementById('lastModified').textContent =
        "Last Modification: " + document.lastModified;
}

/* WIND CHILL CALCULATION */
function calculateWindChill(temp, wind) {
    return 13.12 + (0.6215 * temp) - (11.37 * wind ** 0.16) + (0.3965 * temp * wind ** 0.16);
}

/* DISPLAY WIND CHILL */
function displayWindChill() {
    const windChillElement = document.getElementById("windchill");

    if (temperature <= 10 && windSpeed > 4.8) {
        const chill = calculateWindChill(temperature, windSpeed).toFixed(1);
        windChillElement.textContent = `${chill}°C`;
    } else {
        windChillElement.textContent = "N/A";
    }
}