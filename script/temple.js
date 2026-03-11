// temples.js - Optimized version

// Use a single DOMContentLoaded listener with optimized code
document.addEventListener('DOMContentLoaded', function() {
    // --- FOOTER UPDATES (lightweight) ---
    const currentYearSpan = document.getElementById('currentyear');
    const lastModifiedP = document.getElementById('lastModified');
    
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }
    
    if (lastModifiedP) {
        const lastMod = new Date(document.lastModified);
        // Use Intl.DateTimeFormat for better performance than multiple padStart calls
        const formatter = new Intl.DateTimeFormat('en-US', {
            month: '2-digit',
            day: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        });
        
        // Format: MM/DD/YYYY HH:MM:SS
        const parts = formatter.formatToParts(lastMod);
        const dateObj = {};
        parts.forEach(part => dateObj[part.type] = part.value);
        
        const formattedDate = `Last Modification: ${dateObj.month}/${dateObj.day}/${dateObj.year} ${dateObj.hour}:${dateObj.minute}:${dateObj.second}`;
        lastModifiedP.textContent = formattedDate;
    }
    
    // --- HAMBURGER MENU (only setup on mobile) ---
    // Only run hamburger code if we're actually on mobile
    if (window.innerWidth < 768) {
        setupMobileHamburger();
    }
});

// Simplified hamburger setup - only runs on mobile
function setupMobileHamburger() {
    const header = document.querySelector('header');
    const nav = document.querySelector('nav');
    const navUl = document.querySelector('nav ul');
    
    if (!header || !nav || !navUl) return;
    
    // Create button once
    const hamburgerBtn = document.createElement('button');
    hamburgerBtn.id = 'hamburger-btn';
    hamburgerBtn.innerHTML = '☰';
    hamburgerBtn.setAttribute('aria-label', 'Toggle navigation menu');
    header.insertBefore(hamburgerBtn, nav);
    
    // Click handler
    hamburgerBtn.addEventListener('click', function() {
        navUl.classList.toggle('show');
        this.innerHTML = navUl.classList.contains('show') ? '✕' : '☰';
    });
    
    // Simple resize handler
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            if (window.innerWidth >= 768) {
                navUl.classList.remove('show');
                navUl.style.display = 'flex';
                hamburgerBtn.style.display = 'none';
            } else {
                navUl.style.display = '';
                hamburgerBtn.style.display = 'block';
                hamburgerBtn.innerHTML = '☰';
            }
        }, 100); // Debounce resize events
    });
    
    // Initial display
    hamburgerBtn.style.display = 'block';
}

// Remove the window.innerWidth check that was running twice