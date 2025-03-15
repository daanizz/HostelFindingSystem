// async function fetchReviews(hostelID) {
//     try {
//         const response = await fetch(`/reviews?hostelID=${hostelID}`, {
//             credentials: 'include', // Include cookies
//         });
//         const reviews = await response.json();

//         const todoItemsContainer = document.getElementById("todoItemsContainer");
//         todoItemsContainer.innerHTML = ''; // Clear existing reviews

//         // Fetch the logged-in user's ID (assuming it's stored in a meta tag or global variable)
//         const loggedInUserId = document.getElementById('userID').dataset.userId;

//         reviews.forEach(review => {
//             console.log(review); // Debugging: Log each review object

//             // Check if userID and timestamp exist
//             const userName = review.userID?.name || 'Unknown User';
//             const timestamp = review.timestamp ? new Date(review.timestamp).toLocaleString() : 'Unknown Date';

//             // Create the review container
//             const reviewElement = document.createElement("li");
//             reviewElement.classList.add("todo-item-container", "d-flex", "flex-column", "mb-3");
//             reviewElement.dataset.reviewId = review._id; // Add review ID to the element

//             // Create the review content
//             reviewElement.innerHTML = `
//                 <div class="user-details">
//                     By: ${userName} (${timestamp})
//                 </div>
//                 <div class="d-flex justify-content-between align-items-center">
//                     <label class="checkbox-label">${review.comment}</label>
//                     <div class="stars-container">
//                         ${'⭐'.repeat(review.rating)}
//                     </div>
//                 </div>
//             `;

//             // Add right-click event listener to the review element (only for the logged-in user's reviews)
//             if (review.userID._id === loggedInUserId) {
//                 console.log('Adding contextmenu event listener to review:', review._id);
//                 reviewElement.addEventListener('contextmenu', function(event) {
//                     event.preventDefault();
//                     showContextMenu(event, review._id);
//                 });
//             }

//             // Append the review to the container
//             todoItemsContainer.appendChild(reviewElement);
//         });
//     } catch (error) {
//         console.error('Error fetching reviews:', error);
//     }
// }


// function showContextMenu(event, reviewId) {
//     console.log('Context menu triggered for review:', reviewId); // Debugging

//     // Create the context menu
//     const contextMenu = document.createElement('div');
//     contextMenu.id = 'contextMenu'; // Add an ID for debugging
//     contextMenu.style.position = 'absolute';
//     contextMenu.style.left = `${event.clientX}px`;
//     contextMenu.style.top = `${event.clientY}px`;
//     contextMenu.style.backgroundColor = 'white';
//     contextMenu.style.border = '1px solid #ccc';
//     contextMenu.style.padding = '5px';
//     contextMenu.style.zIndex = '1000'; // Ensure it appears above other elements
//     contextMenu.style.display = 'block'; // Ensure it's visible
//     contextMenu.innerHTML = `<div onclick="deleteReview('${reviewId}')" style="cursor: pointer;">Delete</div>`;

//     // Append the context menu to the body
//     document.body.appendChild(contextMenu);
//     console.log('Context menu appended to DOM:', contextMenu); // Debugging

//     // Remove context menu on any click outside the menu
//     document.addEventListener('click', function(event) {
//         if (!contextMenu.contains(event.target)) {
//             console.log('Removing context menu from DOM'); // Debugging
//             document.body.removeChild(contextMenu);
//         }
//     }, { once: true });
// }

// // Function to delete review
// async function deleteReview(reviewId) {
//     try {
//         const response = await fetch(`/reviews/${reviewId}`, {
//             method: 'DELETE',
//             credentials: 'include', // Include cookies
//         });

//         if (response.ok) {
//             // Remove the review from the UI
//             const reviewElement = document.querySelector(`[data-review-id="${reviewId}"]`);
//             if (reviewElement) {
//                 reviewElement.remove();
//             }
//             alert('Review deleted successfully!');
//         } else {
//             const data = await response.json();
//             alert(data.error || 'Failed to delete review. Please try again.');
//         }
//     } catch (error) {
//         console.error('Error deleting review:', error);
//         alert('An error occurred. Please try again.');
//     }
// }

// Function to show delete confirmation modal
function showDeleteModal(reviewId) {
    const modal = document.getElementById('deleteModal');
    const confirmDeleteButton = document.getElementById('confirmDelete');
    const cancelDeleteButton = document.getElementById('cancelDelete');
  
    // Show the modal
    modal.style.display = 'flex';
  
    // Handle "Yes" button click
    confirmDeleteButton.onclick = () => {
      deleteReview(reviewId); // Call the delete function
      modal.style.display = 'none'; // Hide the modal
    };
  
    // Handle "No" button click
    cancelDeleteButton.onclick = () => {
      modal.style.display = 'none'; // Hide the modal
    };
  }
  
  // Function to delete review
  async function deleteReview(reviewId) {
    try {
      const response = await fetch(`/reviews/${reviewId}`, {
        method: 'DELETE',
        credentials: 'include', // Include cookies
      });
  
      if (response.ok) {
        // Remove the review from the UI
        const reviewElement = document.querySelector(`[data-review-id="${reviewId}"]`);
        if (reviewElement) {
          reviewElement.remove();
        }
        alert('Review deleted successfully!');
      } else {
        const data = await response.json();
        alert(data.error || 'Failed to delete review. Please try again.');
      }
    } catch (error) {
      console.error('Error deleting review:', error);
      alert('An error occurred. Please try again.');
    }
  }
  
  // Function to fetch and display reviews
  async function fetchReviews(hostelID) {
    try {
      const response = await fetch(`/reviews?hostelID=${hostelID}`, {
        credentials: 'include', // Include cookies
      });
      const reviews = await response.json();
  
      const todoItemsContainer = document.getElementById("todoItemsContainer");
      todoItemsContainer.innerHTML = ''; // Clear existing reviews
  
      // Fetch the logged-in user's ID
      const loggedInUserId = document.getElementById('userID').dataset.userId;
      console.log('Logged-in User ID:', loggedInUserId, 'Type:', typeof loggedInUserId); // Debugging
  
      reviews.forEach(review => {
        console.log('Review:', review); // Debugging: Log each review object
  
        // Check if userID and timestamp exist
        const userName = review.userID?.name || 'Unknown User';
        const timestamp = review.timestamp ? new Date(review.timestamp).toLocaleString() : 'Unknown Date';
  
        // Create the review container
        const reviewElement = document.createElement("li");
        reviewElement.classList.add("todo-item-container", "d-flex", "flex-column", "mb-3");
        reviewElement.dataset.reviewId = review._id; // Add review ID to the element
  
        // Create the review content
        reviewElement.innerHTML = `
          <div class="user-details">
            By: ${userName} (${timestamp})
          </div>
          <div class="d-flex justify-content-between align-items-center">
            <label class="checkbox-label">${review.comment}</label>
            <div class="stars-container">
              ${'⭐'.repeat(review.rating)}
            </div>
          </div>
        `;
  
        // Log review user ID and logged-in user ID for debugging
        console.log('Review User ID:', review.userID._id, 'Type:', typeof review.userID._id); // Debugging
        console.log('Logged-in User ID:', loggedInUserId, 'Type:', typeof loggedInUserId); // Debugging
  
        // Add right-click event listener to the review element (only for the logged-in user's reviews)
        if (review.userID._id.toString() === loggedInUserId) {
          console.log('Adding contextmenu event listener to review:', review._id); // Debugging
          reviewElement.addEventListener('contextmenu', function(event) {
            event.preventDefault(); // Prevent the default context menu
            showDeleteModal(review._id); // Show the delete confirmation modal
          });
        }
  
        // Append the review to the container
        todoItemsContainer.appendChild(reviewElement);
        console.log('Review element appended:', reviewElement); // Debugging
      });
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  }

// Function to handle review submission
async function submitReview(hostelID) {
    const userInputValue = document.getElementById("todoUserInput").value;
    const ratingValue = document.getElementById("ratingInput").value;

    if (!userInputValue || !ratingValue) {
        alert("Please fill out both the review and rating fields.");
        return;
    }

    try {
        const response = await fetch('/reviews', {
            method: 'POST',
            credentials: 'include', // Include cookies
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                hostelID: parseInt(hostelID, 10), // Ensure hostelID is a number
                rating: parseInt(ratingValue, 10), // Ensure rating is a number
                comment: userInputValue,
            }),
        });

        const data = await response.json();

        if (response.ok) {
            alert('Review submitted successfully!');
            document.getElementById("todoUserInput").value = ""; // Clear input
            document.getElementById("ratingInput").value = "1"; // Reset rating
            fetchReviews(hostelID); // Refresh the reviews list
        } else {
            alert(data.error || 'Failed to submit review. Please try again.');
        }
    } catch (error) {
        console.error('Error submitting review:', error);
        alert('An error occurred. Please try again.');
    }
}

// Initialize review functionality
function initializeReviews(hostelID) {
    document.getElementById('addTodoButton').onclick = () => submitReview(hostelID);
    document.addEventListener('DOMContentLoaded', () => fetchReviews(hostelID));
}