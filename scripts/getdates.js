// getdates.js - WDD 131 Dynamic Web Fundamentals

// Get the current year for the copyright
const currentYear = new Date().getFullYear();

// Update the copyright year in the footer's first paragraph
document.getElementById("currentyear").textContent = currentYear;

// Get the date the document was last modified
const lastModified = document.lastModified;

// Update the second paragraph with the last modified date
document.getElementById("lastModified").innerHTML = `Last Modification: ${lastModified}`;

// Optional: Console log to verify the script is working
console.log("Copyright Year:", currentYear);
console.log("Last Modified:", lastModified);