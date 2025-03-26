let register_btn = document.querySelector(".Register-btn");
let login_btn = document.querySelector(".Login-btn");
let form = document.querySelector(".From-box");

register_btn.addEventListener("click", () => {
  form.classList.add("change-form");
});

login_btn.addEventListener("click", () => {
  form.classList.remove("change-form");
});

// Function to handle label animation
function setupInputLabels() {
  // Get all input boxes
  const inputBoxes = document.querySelectorAll('.input-box');
  
  inputBoxes.forEach(box => {
    const input = box.querySelector('input');
    const label = box.querySelector('label');
    const icon = box.querySelector('ion-icon');
    
    // Check initially if input has value
    if (input.value) {
      label.style.transform = "translateY(-25px)";
    }
    
    // Add event listeners
    input.addEventListener('focus', () => {
      label.style.transform = "translateY(-25px)";
    });
    
    input.addEventListener('blur', () => {
      if (!input.value) {
        label.style.transform = "";
      }
    });
    
    input.addEventListener('input', () => {
      if (input.value) {
        label.style.transform = "translateY(-25px)";
      } else {
        label.style.transform = "";
      }
    });
  });
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", setupInputLabels);