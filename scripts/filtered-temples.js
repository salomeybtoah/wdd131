document.addEventListener('DOMContentLoaded', () => {

    // =========================
    // FOOTER
    // =========================
    document.getElementById('currentyear').textContent = new Date().getFullYear();

    document.getElementById('lastModified').textContent =
        `Last Modified: ${document.lastModified}`;


    // =========================
    // HAMBURGER MENU (KEEP)
    // =========================
    const header = document.querySelector('header');
    const nav = document.querySelector('nav');
    const navUl = document.querySelector('nav ul');

    const hamburgerBtn = document.createElement('button');
    hamburgerBtn.id = 'hamburger-btn';
    hamburgerBtn.textContent = '☰';

    header.insertBefore(hamburgerBtn, nav);

    hamburgerBtn.addEventListener('click', () => {
        navUl.classList.toggle('show');
        hamburgerBtn.textContent = navUl.classList.contains('show') ? '✕' : '☰';
    });


    // =========================
    // TEMPLE ARRAY
    // =========================
    const temples = [
        {
            templeName: "Aba Nigeria",
            location: "Aba, Nigeria",
            dedicated: "2005, August, 7",
            area: 11500,
            imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
        },
        {
            templeName: "Manti Utah",
            location: "Manti, Utah, United States",
            dedicated: "1888, May, 21",
            area: 74792,
            imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
        },
        {
            templeName: "Payson Utah",
            location: "Payson, Utah, United States",
            dedicated: "2015, June, 7",
            area: 96630,
            imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
        },
        {
            templeName: "Yigo Guam",
            location: "Yigo, Guam",
            dedicated: "2020, May, 2",
            area: 6861,
            imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
        },
        {
            templeName: "Washington D.C.",
            location: "Kensington, Maryland, United States",
            dedicated: "1974, November, 19",
            area: 156558,
            imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
        },
        {
            templeName: "Lima Peru",
            location: "Lima, Peru",
            dedicated: "1986, January, 10",
            area: 9600,
            imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
        },
        {
            templeName: "Mexico City Mexico",
            location: "Mexico City, Mexico",
            dedicated: "1983, December, 2",
            area: 116642,
            imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
        },
        {
            templeName: "Accra Ghana",
            location: "Accra, Ghana",
            dedicated: "2004, January, 11",
            area: 17500,
          imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/accra-ghana-temple/accra-ghana-temple-13760-main.jpg"
        },
        {
            templeName: "Salt Lake Temple",
            location: "Salt Lake City, Utah",
            dedicated: "1893, April, 6",
            area: 253000,
          imageUrl: "https://assets.simpleviewinc.com/simpleview/image/upload/c_limit,h_1200,q_75,w_1200/v1/clients/saltlake/Salt_Lake_Temple_63061dd9-0544-45ce-8a0d-9261abf81c42.png"
        },
        {
            templeName: "Paris France Temple",
            location: "Paris, France",
            dedicated: "2017, May, 21",
            area: 44000,
           imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/paris-france-temple/paris-france-temple-2056-main.jpg"
        },
       {
    templeName: "Hong Kong China Temple",
    location: "Hong Kong, China",
    dedicated: "1996, May, 26",
    area: 21000,
    imageUrl: "https://newsroom.churchofjesuschrist.org/media/960x1280/CWD_37462AA1-9BFB-3FD4-E053-CB02630A3B9A.jpg"
},
{
    templeName: "London England Temple",
    location: "London, England",
    dedicated: "1958, September, 7",
    area: 42652,
    imageUrl: "https://newsroom.churchofjesuschrist.org/media/orig/London-England-Temple1a.jpg"
}

    ];


    // =========================
    // DISPLAY FUNCTION
    // =========================
    const container = document.querySelector('.cards'); // ✅ FIXED

    function displayTemples(templeList) {
        container.innerHTML = "";

        templeList.forEach(temple => {

            const card = document.createElement('div');
            card.classList.add('card');

            card.innerHTML = `
                <img src="${temple.imageUrl}" alt="${temple.templeName}" loading="lazy">
                <h3>${temple.templeName}</h3>
                <p><strong>Location:</strong> ${temple.location}</p>
                <p><strong>Dedicated:</strong> ${temple.dedicated}</p>
                <p><strong>Area:</strong> ${temple.area.toLocaleString()} sq ft</p>
            `;

            container.appendChild(card);
        });
    }


    // =========================
    // FILTER FUNCTIONS
    // =========================
    function getYear(dateString) {
        return parseInt(dateString.split(",")[0]);
    }

    function showAll() {
        displayTemples(temples);
    }

    function showOld() {
        displayTemples(temples.filter(t => getYear(t.dedicated) < 1900));
    }

    function showNew() {
        displayTemples(temples.filter(t => getYear(t.dedicated) > 2000));
    }

    function showLarge() {
        displayTemples(temples.filter(t => t.area > 90000));
    }

    function showSmall() {
        displayTemples(temples.filter(t => t.area < 10000));
    }


    // =========================
    // NAV EVENTS (IMPORTANT FIX)
    // =========================
    document.getElementById('home').addEventListener('click', (e) => {
        e.preventDefault();
        showAll();
    });

    document.getElementById('old').addEventListener('click', (e) => {
        e.preventDefault();
        showOld();
    });

    document.getElementById('new').addEventListener('click', (e) => {
        e.preventDefault();
        showNew();
    });

    document.getElementById('large').addEventListener('click', (e) => {
        e.preventDefault();
        showLarge();
    });

    document.getElementById('small').addEventListener('click', (e) => {
        e.preventDefault();
        showSmall();
    });


    // =========================
    // INITIAL LOAD
    // =========================
    showAll();

});

function displayTemples(templeList) {
    container.innerHTML = "";
    
    templeList.forEach(temple => {
        const card = document.createElement('div');
        card.classList.add('card');
        
        card.innerHTML = `
            <img src="${temple.imageUrl}" alt="${temple.templeName}" loading="lazy" onerror="this.src='https://via.placeholder.com/400x250?text=Image+Not+Available'">
            <h3>${temple.templeName}</h3>
            <p><strong>Location:</strong> ${temple.location}</p>
            <p><strong>Dedicated:</strong> ${temple.dedicated}</p>
            <p><strong>Area:</strong> ${temple.area.toLocaleString()} sq ft</p>
        `;
        
        container.appendChild(card);
    });
}