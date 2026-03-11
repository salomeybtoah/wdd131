// temples.js - Hamburger menu and footer functionality

// Get current year and last modified date for footer
document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    const currentYear = new Date().getFullYear();
    document.getElementById('currentyear').textContent = currentYear;
    
    // Set last modified date with specific format: MM/DD/YYYY HH:MM:SS
    const lastModified = new Date(document.lastModified);
    
    const year = lastModified.getFullYear();
    const month = String(lastModified.getMonth() + 1).padStart(2, '0');
    const day = String(lastModified.getDate()).padStart(2, '0');
    const hours = String(lastModified.getHours()).padStart(2, '0');
    const minutes = String(lastModified.getMinutes()).padStart(2, '0');
    const seconds = String(lastModified.getSeconds()).padStart(2, '0');
    
    const formattedDate = `Last Modification: ${month}/${day}/${year} ${hours}:${minutes}:${seconds}`;
    
    document.getElementById('lastModified').textContent = formattedDate;
    
    // Hamburger menu functionality
    setupHamburgerMenu();
});

function setupHamburgerMenu() {
    // Create hamburger button
    const header = document.querySelector('header');
    const nav = document.querySelector('nav');
    const navUl = document.querySelector('nav ul');
    
    // Create hamburger button element
    const hamburgerBtn = document.createElement('button');
    hamburgerBtn.id = 'hamburger-btn';
    hamburgerBtn.innerHTML = '☰'; // Hamburger icon
    hamburgerBtn.setAttribute('aria-label', 'Toggle navigation menu');
    
    // Insert hamburger button before the nav in the header
    header.insertBefore(hamburgerBtn, nav);
    
    // Add click event to toggle menu
    hamburgerBtn.addEventListener('click', () => {
        navUl.classList.toggle('show');
        
        // Toggle between hamburger and X icon
        if (navUl.classList.contains('show')) {
            hamburgerBtn.innerHTML = '✕'; // X icon when menu is open
        } else {
            hamburgerBtn.innerHTML = '☰'; // Hamburger icon when menu is closed
        }
    });
    
    // Handle window resize - hide hamburger on larger screens and ensure menu is visible
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 768) {
            navUl.classList.remove('show');
            navUl.style.display = 'flex'; // Ensure nav is visible on larger screens
            hamburgerBtn.style.display = 'none'; // Hide hamburger on larger screens
        } else {
            navUl.style.display = ''; // Reset to CSS default
            hamburgerBtn.style.display = 'block'; // Show hamburger on mobile
            // Reset to hamburger icon when resizing to mobile
            hamburgerBtn.innerHTML = '☰';
        }
    });
    
    // Initial check on page load
    if (window.innerWidth >= 768) {
        hamburgerBtn.style.display = 'none';
    } else {
        hamburgerBtn.style.display = 'block';
    }
}