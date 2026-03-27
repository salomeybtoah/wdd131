document.addEventListener('DOMContentLoaded', () => {

    // =========================
    // FOOTER
    // =========================
    const currentYearElement = document.getElementById('currentyear');
    const lastModifiedElement = document.getElementById('lastModified');
    
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }
    if (lastModifiedElement) {
        lastModifiedElement.textContent = `Last Modified: ${document.lastModified}`;
    }

    // =========================
    // HAMBURGER MENU
    // =========================
    const header = document.querySelector('header');
    const nav = document.querySelector('nav');
    const navUl = document.querySelector('nav ul');

    if (header && nav && navUl) {
        const hamburgerBtn = document.createElement('button');
        hamburgerBtn.id = 'hamburger-btn';
        hamburgerBtn.textContent = '☰';
        hamburgerBtn.setAttribute('aria-label', 'Menu');
        header.insertBefore(hamburgerBtn, nav);

        hamburgerBtn.addEventListener('click', () => {
            navUl.classList.toggle('show');
            hamburgerBtn.textContent = navUl.classList.contains('show') ? '✕' : '☰';
            hamburgerBtn.setAttribute('aria-expanded', navUl.classList.contains('show'));
        });
    }

    // =========================
    // TEMPLE ARRAY (ALL WORKING IMAGES)
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
            templeName: "Paris France Temple",
            location: "Paris, France",
            dedicated: "2017, May, 21",
            area: 44000,
            imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/paris-france-temple/paris-france-temple-2056-main.jpg"
        },
        {
            templeName: "London England Temple",
            location: "London, England",
            dedicated: "1958, September, 7",
            area: 42652,
            imageUrl: "https://newsroom.churchofjesuschrist.org/media/orig/London-England-Temple1a.jpg"
        },
    ];

    // =========================
    // OPTIMIZED DISPLAY FUNCTION WITH IMPROVED ERROR HANDLING
    // =========================
    const container = document.querySelector('.cards');
    
    // Track failed images to avoid repeated attempts
    const failedImages = new Set();
    
    // Function to get fallback image
    function getFallbackImage(templeName) {
        const encodedName = encodeURIComponent(templeName);
        return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='250'%3E%3Crect width='100%25' height='100%25' fill='%2334495e'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='white' font-family='sans-serif' font-size='14'%3E${encodedName}%0AImage Unavailable%3C/text%3E%3C/svg%3E`;
    }
    
    function displayTemples(templeList) {
        // Check if container exists
        if (!container) {
            console.error('Container .cards not found');
            return;
        }
        
        // Clear container efficiently
        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }
        
        // Use DocumentFragment to reduce reflows
        const fragment = document.createDocumentFragment();
        
        templeList.forEach((temple, index) => {
            const card = document.createElement('div');
            card.classList.add('card');
            
            // Create image with optimized loading
            const img = document.createElement('img');
            img.src = temple.imageUrl;
            img.alt = temple.templeName;
            img.width = 400;
            img.height = 250;
            
            // Optimize loading strategy
            if (index === 0) {
                img.setAttribute('fetchpriority', 'high');
            } else {
                img.loading = 'lazy';
                img.decoding = 'async';
            }
            
            // Improved error handling with specific fallbacks
            img.onerror = function() {
                // Prevent infinite error loops
                if (failedImages.has(temple.templeName)) return;
                failedImages.add(temple.templeName);
                
                // Try alternative URLs for specific temples
                const altUrls = {
                    "Salt Lake Temple": "https://churchofjesuschristtemples.org/assets/img/temples/salt-lake-temple/salt-lake-temple-1387-main.jpg",
                    "Hong Kong China Temple": "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/hong-kong-china/400x250/hong-kong-china-temple-lds-1053098-wallpaper.jpg",
                    "London England Temple": "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/london-england/400x250/london-england-temple-lds-1046412-wallpaper.jpg"
                };
                
                if (altUrls[temple.templeName]) {
                    this.src = altUrls[temple.templeName];
                    return;
                }
                
                // Generic fallback with temple name
                this.src = getFallbackImage(temple.templeName);
                this.onerror = null; // Prevent infinite loop
            };
            
            // Create text elements efficiently
            const title = document.createElement('h3');
            title.textContent = temple.templeName;
            
            const location = document.createElement('p');
            location.innerHTML = `<strong>Location:</strong> ${temple.location}`;
            
            const dedicated = document.createElement('p');
            dedicated.innerHTML = `<strong>Dedicated:</strong> ${temple.dedicated}`;
            
            const area = document.createElement('p');
            area.innerHTML = `<strong>Area:</strong> ${temple.area.toLocaleString()} sq ft`;
            
            // Assemble card
            card.appendChild(img);
            card.appendChild(title);
            card.appendChild(location);
            card.appendChild(dedicated);
            card.appendChild(area);
            
            fragment.appendChild(card);
        });
        
        // Single DOM update
        container.appendChild(fragment);
    }

    // =========================
    // OPTIMIZED FILTER FUNCTIONS
    // =========================
    function getYear(dateString) {
        if (!dateString) return 0;
        return parseInt(dateString.split(",")[0]);
    }
    
    // Cache filter results to avoid recalculation
    let cachedFilters = {};
    
    function getFilteredTemples(filterType) {
        if (cachedFilters[filterType]) {
            return cachedFilters[filterType];
        }
        
        let result;
        switch(filterType) {
            case 'old':
                result = temples.filter(t => getYear(t.dedicated) < 1900);
                break;
            case 'new':
                result = temples.filter(t => getYear(t.dedicated) > 2000);
                break;
            case 'large':
                result = temples.filter(t => t.area > 90000);
                break;
            case 'small':
                result = temples.filter(t => t.area < 10000);
                break;
            default:
                result = [...temples]; // Return a copy to avoid mutation
        }
        
        cachedFilters[filterType] = result;
        return result;
    }
    
    // Debounce function to prevent excessive re-renders
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    const debouncedDisplay = debounce((filterType) => {
        displayTemples(getFilteredTemples(filterType));
    }, 100);
    
    // =========================
    // NAV EVENTS WITH PREVENT DEFAULT
    // =========================
    function handleNavClick(e, filterType) {
        e.preventDefault();
        e.stopPropagation();
        debouncedDisplay(filterType);
        
        // Update active state in navigation
        document.querySelectorAll('nav ul li a').forEach(link => {
            link.classList.remove('active');
        });
        if (e.currentTarget) {
            e.currentTarget.classList.add('active');
        }
    }
    
    // Add event listeners with proper error handling
    const navLinks = {
        'home': null,
        'old': 'old',
        'new': 'new',
        'large': 'large',
        'small': 'small'
    };
    
    Object.entries(navLinks).forEach(([id, filterType]) => {
        const element = document.getElementById(id);
        if (element) {
            // Remove any existing listeners by cloning and replacing
            const newElement = element.cloneNode(true);
            element.parentNode.replaceChild(newElement, element);
            newElement.addEventListener('click', (e) => handleNavClick(e, filterType));
        } else {
            console.warn(`Navigation element with id "${id}" not found`);
        }
    });
    
    // =========================
    // INITIAL LOAD
    // =========================
    displayTemples(temples);
    
    // =========================
    // CLEANUP FUNCTION (optional)
    // =========================
    window.addEventListener('beforeunload', () => {
        // Clear cache on page unload
        cachedFilters = {};
        failedImages.clear();
    });
});

function handleNavClick(e, filterType) {
    e.preventDefault();
    e.stopPropagation();
    debouncedDisplay(filterType);
    
    // Update active state in navigation - ADD NULL CHECK
    const navLinks = document.querySelectorAll('nav ul li a');
    if (navLinks && navLinks.length > 0) {
        navLinks.forEach(link => {
            link.classList.remove('active');
        });
    }
    
    if (e.currentTarget) {
        e.currentTarget.classList.add('active');
    }
}