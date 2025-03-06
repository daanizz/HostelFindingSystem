// client-side JavaScript (form transitions)
document.addEventListener("DOMContentLoaded", function () {
    let register_btn = document.querySelector(".Register-btn");
    let login_btn = document.querySelector(".Login-btn");
    let form = document.querySelector(".From-box");

    // When "Register" button is clicked, show the Registration form
    register_btn.addEventListener("click", () => {
        form.classList.add("change-form");
    });

    // When "Login" button is clicked, show the Login form
    login_btn.addEventListener("click", () => {
        form.classList.remove("change-form");
    });
});
