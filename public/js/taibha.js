// Get the hostelID from the hidden element and convert it to a number
const hostelID = parseInt(document.getElementById('hostelID').dataset.hostelId, 10);

// Initialize review functionality from shared review.js
initializeReviews(hostelID);

// Tab functionality (specific to Taibha Hostel)
let aboutTab = document.getElementById("aboutTab");
let aboutButton = document.getElementById("aboutButton");
let timeToVisitTab = document.getElementById("timeToVisitTab");
let timeToVisitButton = document.getElementById("timeToVisitButton");
let attractionsTab = document.getElementById("attractionsTab");
let attractionsButton = document.getElementById("attractionsButton");

// Initially hide timeToVisitTab and attractionsTab
timeToVisitTab.classList.add("d-none");
attractionsTab.classList.add("d-none");

function about() {
    timeToVisitTab.classList.add("d-none");
    attractionsTab.classList.add("d-none");
    aboutTab.classList.remove("d-none");
    aboutButton.classList.add("selected-button");
    timeToVisitButton.classList.remove("selected-button");
    attractionsButton.classList.remove("selected-button");
    console.log("about is working");
}

function timeToVisit() {
    timeToVisitTab.classList.remove("d-none");
    aboutTab.classList.add("d-none");
    attractionsTab.classList.add("d-none");

    aboutButton.classList.add("button");
    aboutButton.classList.remove("selected-button");
    timeToVisitButton.classList.add("selected-button");
    attractionsButton.classList.add("button");
    attractionsButton.classList.remove("selected-button");
}

function attractions() {
    attractionsTab.classList.remove("d-none");
    aboutTab.classList.add("d-none");
    timeToVisitTab.classList.add("d-none");

    aboutButton.classList.add("button");
    aboutButton.classList.remove("selected-button");
    timeToVisitButton.classList.add("button");
    timeToVisitButton.classList.remove("selected-button");
    attractionsButton.classList.add("selected-button");
}