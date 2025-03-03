/**
 * Name: Daisy Ibuoka
 * Date: 03.01.2025
 * CSC 372-01
 *
 * This script manages the shopping cart functionality.
 */

document.addEventListener("DOMContentLoaded", function () {
    let cart = JSON.parse(sessionStorage.getItem("cart")) || [];
    const cartContainer = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");

    cart = cart.slice(0, 3); // ✅ Show only the first three items

    cartContainer.innerHTML = ""; // Clear existing items

    if (cart.length === 0) {
        cartContainer.innerHTML = "<p>🛒 Your cart is empty.</p>";
        cartTotal.innerHTML = "";
        return;
    }

    let subtotal = 0;
    let summaryHTML = `<table>
        <thead>
            <tr>
                <th>Image</th>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>`;

    cart.forEach((item, index) => {
        let itemTotal = item.price * item.quantity;
        subtotal += itemTotal;

        summaryHTML += `
            <tr>
                <td><img src="${item.image}" alt="${item.name}" width="50"></td>
                <td>${item.name}</td>
                <td>$${item.price.toFixed(2)}</td>
                <td><input type="number" min="1" value="${item.quantity}" onchange="updateQuantity(${index}, this.value)"></td>
                <td>$${itemTotal.toFixed(2)}</td>
                <td><button onclick="removeFromCart(${index})">🗑️ Remove</button></td>
            </tr>
        `;
    });

    summaryHTML += `</tbody></table>`;
    cartContainer.innerHTML = summaryHTML;

    let tax = subtotal * 0.0675;
    let deliveryFee = 5.99; // Example static fee
    let serviceFee = cart.every(item => item.isDownloadable) ? 2.99 : 0; // Charge if all are downloadable

    let total = subtotal + tax + deliveryFee + serviceFee;

    cartTotal.innerHTML = `
        <p>Subtotal: $${subtotal.toFixed(2)}</p>
        <p>Tax (6.75%): $${tax.toFixed(2)}</p>
        <p>Delivery Fee: $${deliveryFee.toFixed(2)}</p>
        <p>Service Fee: $${serviceFee.toFixed(2)}</p>
        <strong>Total: $${total.toFixed(2)}</strong>
    `;
});

function updateQuantity(index, newQuantity) {
    let cart = JSON.parse(sessionStorage.getItem("cart")) || [];
    cart[index].quantity = parseInt(newQuantity);
    sessionStorage.setItem("cart", JSON.stringify(cart));
    location.reload();
}

function removeFromCart(index) {
    let cart = JSON.parse(sessionStorage.getItem("cart")) || [];
    cart.splice(index, 1);
    sessionStorage.setItem("cart", JSON.stringify(cart));
    location.reload();
}

function clearCart() {
    sessionStorage.removeItem("cart");
    location.reload();
}

function checkout() {
    if (!sessionStorage.getItem("userLoggedIn")) {
        alert("❌ You must be signed in to checkout.");
        window.location.href = "login.html";
        return;
    }

    let cart = JSON.parse(sessionStorage.getItem("cart")) || [];
    if (cart.length === 0) {
        alert("🛒 Your cart is empty!");
        return;
    }

    window.location.href = "checkout.html"; // Redirect to checkout
}
