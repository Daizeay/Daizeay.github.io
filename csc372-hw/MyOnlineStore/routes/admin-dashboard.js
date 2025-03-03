/**
 * Name: Daisy Ibuoka
 * Date: 03.01.2025
 * CSC 372-01
 *
 * Handles admin dashboard data and session management.
 */

document.addEventListener("DOMContentLoaded", function () {
    // ✅ Ensure only logged-in admins can access this page
    if (!sessionStorage.getItem("isLoggedIn")) {
        alert("❌ Unauthorized! Redirecting to login...");
        window.location.href = "admin-login.html"; // Redirect to admin login
        return;
    }

    // ✅ Get stored products and users from localStorage
    const products = JSON.parse(localStorage.getItem("products")) || [];
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // ✅ Update dashboard stats
    document.getElementById("total-products").textContent = products.length;
    document.getElementById("total-users").textContent = users.length;

    // ✅ Simulated total sales (you can change this logic)
    const totalSales = products.length * 50; // Example: Assume each product generates $50
    document.getElementById("total-sales").textContent = `$${totalSales.toFixed(2)}`;

    // ✅ Load recent orders (if stored)
    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    const ordersTable = document.getElementById("recent-orders");

    if (orders.length === 0) {
        ordersTable.innerHTML = "<tr><td colspan='5'>No recent orders found.</td></tr>";
    } else {
        ordersTable.innerHTML = orders.map(order => `
            <tr>
                <td>${order.id}</td>
                <td>${order.customer}</td>
                <td>$${order.total}</td>
                <td>${order.status}</td>
                <td>${order.date}</td>
            </tr>
        `).join("");
    }
});

/**
 * ✅ Logout function
 */
function signOut() {
    sessionStorage.removeItem("isLoggedIn");
    sessionStorage.removeItem("currentAdmin");
    alert("✅ Successfully logged out.");
    window.location.href = "admin-login.html"; // Redirect to admin login page
}
