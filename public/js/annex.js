// // Get the hostelID from the hidden element and convert it to a number
// const hostelID = parseInt(document.getElementById('hostelID').dataset.hostelId, 10);

// // Initialize review functionality from shared review.js
// initializeReviews(hostelID);

// // Tab functionality (specific to Annex Hostel)
// let aboutTab = document.getElementById("aboutTab");
// let aboutButton = document.getElementById("aboutButton");
// let timeToVisitTab = document.getElementById("timeToVisitTab");
// let timeToVisitButton = document.getElementById("timeToVisitButton");
// let attractionsTab = document.getElementById("attractionsTab");
// let attractionsButton = document.getElementById("attractionsButton");

// // Initially hide timeToVisitTab and attractionsTab
// timeToVisitTab.classList.add("d-none");
// attractionsTab.classList.add("d-none");

// function about() {
//     timeToVisitTab.classList.add("d-none");
//     attractionsTab.classList.add("d-none");
//     aboutTab.classList.remove("d-none");
//     aboutButton.classList.add("selected-button");
//     timeToVisitButton.classList.remove("selected-button");
//     attractionsButton.classList.remove("selected-button");
//     console.log("about is working");
// }

// function timeToVisit() {
//     timeToVisitTab.classList.remove("d-none");
//     aboutTab.classList.add("d-none");
//     attractionsTab.classList.add("d-none");

//     aboutButton.classList.add("button");
//     aboutButton.classList.remove("selected-button");
//     timeToVisitButton.classList.add("selected-button");
//     attractionsButton.classList.add("button");
//     attractionsButton.classList.remove("selected-button");
// }

// function attractions() {
//     attractionsTab.classList.remove("d-none");
//     aboutTab.classList.add("d-none");
//     timeToVisitTab.classList.add("d-none");

//     aboutButton.classList.add("button");
//     aboutButton.classList.remove("selected-button");
//     timeToVisitButton.classList.add("button");
//     timeToVisitButton.classList.remove("selected-button");
//     attractionsButton.classList.add("selected-button");
// }

// Get the hostelID from the hidden element
const hostelID = parseInt(document.getElementById('hostelID').dataset.hostelId, 10);

// Initialize review functionality from shared review.js
initializeReviews(hostelID);


document.addEventListener('DOMContentLoaded', function() {
    // Tab switching code remains the same...
    
    // Initialize carousel only once
    if (typeof jQuery !== 'undefined') {
        // Initialize with default options
        $('#carouselExampleIndicators').carousel({
            interval: 5000,  // 5 seconds between slides
            pause: 'hover',  // Pause on hover
            wrap: true       // Loop continuously
        });

        // Debugging - log carousel events
        $('#carouselExampleIndicators')
            .on('slide.bs.carousel', function(e) {
                console.log('Sliding from slide ' + e.from + ' to ' + e.to);
            })
            .on('slid.bs.carousel', function(e) {
                console.log('Slide completed to ' + e.to);
            });
    } else {
        console.error('jQuery is not loaded - carousel functionality may not work');
    }
});



// Wait for DOM to be fully loaded - combine all DOM-ready code in one listener
document.addEventListener('DOMContentLoaded', function() {
    // Tab elements
    const aboutTab = document.getElementById("aboutTab");
    const aboutButton = document.getElementById("aboutButton");
    const timeToVisitTab = document.getElementById("timeToVisitTab");
    const timeToVisitButton = document.getElementById("timeToVisitButton");
    const attractionsTab = document.getElementById("attractionsTab");
    const attractionsButton = document.getElementById("attractionsButton");
    

    

    

    // Function to switch tabs
    function switchTab(activeTab, activeButton) {
        // Hide all tabs
        aboutTab.classList.add("d-none");
        timeToVisitTab.classList.add("d-none");
        attractionsTab.classList.add("d-none");
        
        // Show active tab
        activeTab.classList.remove("d-none");
        
        // Reset all button styles
        aboutButton.classList.remove("selected-button");
        timeToVisitButton.classList.remove("selected-button");
        attractionsButton.classList.remove("selected-button");
        
        aboutButton.classList.add("button");
        timeToVisitButton.classList.add("button");
        attractionsButton.classList.add("button");
        
        // Set active button style
        activeButton.classList.remove("button");
        activeButton.classList.add("selected-button");
    }
    
    // Set up event listeners for tab buttons
    aboutButton.addEventListener("click", function() {
        switchTab(aboutTab, aboutButton);
    });
    
    timeToVisitButton.addEventListener("click", function() {
        switchTab(timeToVisitTab, timeToVisitButton);
    });
    
    attractionsButton.addEventListener("click", function() {
        switchTab(attractionsTab, attractionsButton);
    });
    
    // Initialize with About tab shown by default
    switchTab(aboutTab, aboutButton);
    
    // Initialize Bootstrap carousel with jQuery
    // Make sure jQuery is available before using it
    if (typeof jQuery !== 'undefined') {
        // Initialize the carousel with more options for better control
        $('#carouselExampleIndicators').carousel({
            interval: 5000,  // Time between automatic slides (5 seconds)
            pause: 'hover',  // Pause on mouse hover
            wrap: true       // Continuous looping
        });
        
        // Debug: Log carousel events
        $('#carouselExampleIndicators').on('slide.bs.carousel', function(e) {
            console.log('Sliding from slide ' + e.from + ' to ' + e.to);
        });
        
        // Manual control handlers with event prevention
        $('.carousel-control-prev').on('click', function(e) {
            e.preventDefault();
            $('#carouselExampleIndicators').carousel('prev');
            console.log('Previous button clicked');
        });
        
        $('.carousel-control-next').on('click', function(e) {
            e.preventDefault();
            $('#carouselExampleIndicators').carousel('next');
            console.log('Next button clicked');
        });

        $('.carousel').carousel({
            interval: 3000, // 3 seconds between slides
            pause: "hover", // pause on hover
            wrap: true // loop continuously
        });
        
        // Debugging - log carousel events
        $('.carousel').on('slide.bs.carousel', function (e) {
            console.log('Sliding from ' + e.from + ' to ' + e.to);
        });

        
    } else {
        console.error('jQuery is not loaded - carousel functionality may not work');
    }
});