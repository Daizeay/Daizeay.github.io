/**
 * Name: Daisy Ibuoka
 * Date: 03.01.2025
 * CSC 372-01
 *
 * Handles admin login and session management.
 */

document.getElementById("login-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevents page reload

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    const loginStatus = document.getElementById("login-status");

    // ✅ Hardcoded Admin Credentials (Modify/Add More Admins if Needed)
    const adminAccounts = [
        { username: "admin1", password: "password123" },
        { username: "admin2", password: "adminpass" } // Add more admins if needed
    ];

    // ✅ Check if entered credentials match any admin account
    const adminExists = adminAccounts.find(admin => admin.username === username && admin.password === password);

    if (!adminExists) {
        loginStatus.style.color = "red";
        loginStatus.textContent = "❌ Invalid admin username or password!";
        return;
    }

    // ✅ Store session data to track admin login
    sessionStorage.setItem("isLoggedIn", "true");
    sessionStorage.setItem("currentAdmin", username);

    loginStatus.style.color = "limegreen";
    loginStatus.textContent = "✅ Login successful! Redirecting...";

    // ✅ Redirect to admin dashboard
    setTimeout(() => {
        window.location.href = "../admin/dashboard.html"; // Ensure this page exists
    }, 1500);
});
