// ✅ FOOTER YEAR
document.getElementById("year").textContent = new Date().getFullYear();


// ✅ WEATHER DATA (OBJECT + ARRAY)
const destinations = [
    {
        name: "Maldives",
        temp: 30,
        wind: 10
    },
    {
        name: "Kenya",
        temp: 28,
        wind: 12
    },
    {
        name: "Paris",
        temp: 20,
        wind: 8
    }
];


// ✅ WIND CHILL FUNCTION
function calculateWindChill(temp, wind) {
    if (temp <= 10 && wind > 4.8) {
        return (13.12 + 0.6215 * temp - 11.37 * Math.pow(wind, 0.16) + 0.3965 * temp * Math.pow(wind, 0.16)).toFixed(1);
    } else {
        return "N/A";
    }
}


// ✅ DISPLAY WEATHER (DOM)
destinations.forEach(place => {

    const tempEl = document.getElementById(`temp-${place.name.toLowerCase()}`);
    const windEl = document.getElementById(`wind-${place.name.toLowerCase()}`);
    const chillEl = document.getElementById(`chill-${place.name.toLowerCase()}`);

    if (tempEl && windEl && chillEl) {
        tempEl.textContent = `${place.temp}°C`;
        windEl.textContent = `${place.wind} km/h`;
        chillEl.textContent = calculateWindChill(place.temp, place.wind);
    }
});


// ✅ FORM FUNCTIONALITY
const form = document.getElementById("tripForm");

if (form) {
    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const name = document.getElementById("name").value;
        const destination = document.getElementById("destination").value;
        const date = document.getElementById("date").value;
        const people = document.getElementById("people").value;

        // OBJECT
        const trip = {
            name,
            destination,
            date,
            people
        };

        // LOCAL STORAGE
        localStorage.setItem("tripData", JSON.stringify(trip));

        // OUTPUT (TEMPLATE LITERAL)
        document.getElementById("result").innerHTML = `
            <p>✈️ ${name}, your trip to <strong>${destination}</strong> is planned for <strong>${date}</strong> with <strong>${people}</strong> people.</p>
        `;
    });
}


// ✅ LOAD SAVED DATA
const savedTrip = JSON.parse(localStorage.getItem("tripData"));

if (savedTrip && document.getElementById("result")) {
    document.getElementById("result").innerHTML = `
        <p>📌 Last trip: ${savedTrip.name} → ${savedTrip.destination} on ${savedTrip.date}</p>
    `;
}