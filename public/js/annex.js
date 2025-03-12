// Tab functionality
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

// Review and Rating functionality
let todoItemsContainer = document.getElementById("todoItemsContainer");
let addTodoButton = document.getElementById("addTodoButton");

// Sample todo list
let todoList = [
  {
    text: "Best Hostel ever",
    rating: 5,
    uniqueNo: 1
  },
  {
    text: "Unlimited wifi 24X7",
    rating: 4,
    uniqueNo: 2
  },
  {
    text: "Toilets used be better",
    rating: 3,
    uniqueNo: 3
  }
];

let todosCount = todoList.length;

// Function to create and append a new review with stars
function createAndAppendTodo(todo) {
    let todoElement = document.createElement("li");
    todoElement.classList.add("todo-item-container", "d-flex", "flex-row");
    todoElement.id = 'todo' + todo.uniqueNo;
    todoItemsContainer.appendChild(todoElement);

    let labelContainer = document.createElement("div");
    labelContainer.classList.add("label-container", "d-flex", "flex-row");
    todoElement.appendChild(labelContainer);

    // Display the review text
    let labelElement = document.createElement("label");
    labelElement.classList.add("checkbox-label");
    labelElement.textContent = todo.text; // Display review text
    labelContainer.appendChild(labelElement);

    // Display stars based on the rating
    let starsContainer = document.createElement("div");
    starsContainer.classList.add("stars-container");
    for (let i = 0; i < todo.rating; i++) {
        let starIcon = document.createElement("span");
        starIcon.textContent = "⭐"; // Star icon
        starsContainer.appendChild(starIcon);
    }
    labelContainer.appendChild(starsContainer);
}

// Render existing reviews
for (let todo of todoList) {
    createAndAppendTodo(todo);
}

// Add new review and rating
addTodoButton.onclick = function () {
    let userInputElement = document.getElementById("todoUserInput");
    let ratingInputElement = document.getElementById("ratingInput");

    let userInputValue = userInputElement.value;
    let ratingValue = ratingInputElement.value;

    if (userInputValue === "") {
        alert("Please write a review before adding.");
        return;
    }

    if (ratingValue === "") {
        alert("Please select a rating.");
        return;
    }

    todosCount = todosCount + 1;

    let newTodo = {
        text: userInputValue,
        rating: ratingValue,
        uniqueNo: todosCount
    };

    createAndAppendTodo(newTodo);

    // Clear input fields
    userInputElement.value = "";
    ratingInputElement.value = "1"; // Reset rating to default
};

// Delete functionality
// Create a context menu
const contextMenu = document.createElement("div");
contextMenu.classList.add("context-menu");
contextMenu.innerHTML = `
    <ul>
        <li id="deleteReview">Delete</li>
    </ul>
`;
document.body.appendChild(contextMenu);

// Track the currently selected review
let selectedReview = null;

// Show context menu on right-click
todoItemsContainer.addEventListener("contextmenu", (e) => {
    e.preventDefault(); // Prevent the default right-click menu

    // Find the closest review item
    const reviewItem = e.target.closest(".todo-item-container");
    if (!reviewItem) return; // Exit if not clicking on a review

    selectedReview = reviewItem; // Store the selected review

    // Position the context menu at the mouse pointer
    contextMenu.style.display = "block";
    contextMenu.style.left = `${e.pageX}px`;
    contextMenu.style.top = `${e.pageY}px`;
});

// Hide context menu when clicking outside
document.addEventListener("click", () => {
    contextMenu.style.display = "none";
});

// Handle delete option
document.getElementById("deleteReview").addEventListener("click", () => {
    if (selectedReview) {
        selectedReview.remove(); // Remove the review from the DOM
        selectedReview = null; // Reset the selected review
    }
});