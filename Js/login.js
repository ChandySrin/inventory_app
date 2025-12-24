
// Function to handle user login validation
function userLogin() {
    // Get form elements
    const username = document.getElementById("username");
    const email = document.getElementById("email");
    const password = document.getElementById("password");

    // Get error message elements
    const usernameError = document.getElementById("usernameError");
    const emailError = document.getElementById("emailError");
    const passwordError = document.getElementById("passwordError");

    // Reset error states
    usernameError.style.display = "none";
    emailError.style.display = "none";
    passwordError.style.display = "none";

    username.classList.remove("error", "shake");
    email.classList.remove("error", "shake");
    password.classList.remove("error", "shake");

    let valid = true;

    // Validate username
    if (username.value.trim() === "") {
        usernameError.style.display = "block";
        username.classList.add("error", "shake");
        valid = false;
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value)) {
        emailError.style.display = "block";
        email.classList.add("error", "shake");
        valid = false;
    }

    // Validate password
    if (password.value.length < 6) {
        passwordError.style.display = "block";
        password.classList.add("error", "shake");
        valid = false;
    }

    // If valid, proceed to dashboard
    if (valid) {
        // Save username to localStorage
        localStorage.setItem("username", username.value);
        // Redirect to dashboard
        window.location.href = "dashboard.html";
    }

    return false; // Prevent form submission
}

// Function to toggle password visibility
function togglePassword() {
    const passwordField = document.getElementById("password");
    passwordField.type = passwordField.type === "password" ? "text" : "password";
}
