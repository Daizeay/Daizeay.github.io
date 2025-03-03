/**
 * Name: Daisy Ibuoka
 * Date: 03.01.2025
 * CSC 372-01
 *
 * Handles user management in the admin panel.
 */

document.addEventListener("DOMContentLoaded", function () {
    // ✅ Ensure only logged-in admins can access this page
    if (!sessionStorage.getItem("isLoggedIn")) {
        alert("❌ Unauthorized! Redirecting to login...");
        window.location.href = "admin-login.html"; // Redirect to admin login
        return;
    }

    // ✅ Load users from localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const usersTable = document.getElementById("users-list");

    if (users.length === 0) {
        usersTable.innerHTML = "<tr><td colspan='3'>No users found.</td></tr>";
    } else {
        usersTable.innerHTML = users.map((user, index) => `
            <tr>
                <td>${user.username}</td>
                <td>${user.email || "N/A"}</td>
                <td>
                    <button onclick="deleteUser(${index})">❌ Delete</button>
                </td>
            </tr>
        `).join("");
    }
});

/**
 * ✅ Function to delete a user
 */
function deleteUser(index) {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    users.splice(index, 1);
    localStorage.setItem("users", JSON.stringify(users));
    alert("✅ User deleted successfully!");
    location.reload(); // Refresh the page
}

/**
 * ✅ Logout function
 */
function signOut() {
    sessionStorage.removeItem("isLoggedIn");
    sessionStorage.removeItem("currentAdmin");
    alert("✅ Successfully logged out.");
    window.location.href = "admin-login.html"; // Redirect to admin login page
}
