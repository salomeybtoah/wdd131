/// temples.js - Fully optimized version
document.addEventListener('DOMContentLoaded', () => {
    // --- FOOTER ---
    const yearSpan = document.getElementById('currentyear');
    const lastModifiedP = document.getElementById('lastModified');

    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    if (lastModifiedP) {
        const lastMod = new Date(document.lastModified);
        lastModifiedP.textContent = `Last Modification: ${lastMod.toLocaleString()}`;
    }

    // --- NAVIGATION MENU (Mobile + Desktop) ---
    const header = document.querySelector('header');
    const nav = document.querySelector('nav');
    const navUl = nav?.querySelector('ul');

    if (!header || !nav || !navUl) return;

    // Create hamburger button (only once)
    const hamburgerBtn = document.createElement('button');
    hamburgerBtn.id = 'hamburger-btn';
    hamburgerBtn.setAttribute('aria-label', 'Toggle navigation menu');
    hamburgerBtn.innerHTML = '☰';
    header.insertBefore(hamburgerBtn, nav);

    // Function to toggle menu visibility
    const toggleMenu = () => {
        navUl.classList.toggle('show');
        hamburgerBtn.innerHTML = navUl.classList.contains('show') ? '✕' : '☰';
    };

    // Click event for hamburger
    hamburgerBtn.addEventListener('click', toggleMenu);

    // Handle window resize with debounce
    let resizeTimer;
    const handleResize = () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            if (window.innerWidth >= 768) {
                // Desktop view: show menu, hide hamburger
                navUl.classList.remove('show');
                hamburgerBtn.style.display = 'none';
                navUl.style.display = 'flex';
            } else {
                // Mobile view: hide menu by default, show hamburger
                hamburgerBtn.style.display = 'block';
                navUl.style.display = '';
                hamburgerBtn.innerHTML = '☰';
            }
        }, 100);
    };

    // Run on load and on resize
    handleResize();
    window.addEventListener('resize', handleResize);
});