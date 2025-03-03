/**
 * Name: Daisy Ibuoka
 * Date: 03.01.2025
 * CSC 372-01
 *
 * This file handles the checkout process.
 */

function loadCheckout() {
    console.log("✅ Checkout script loaded.");

    const checkoutSummary = document.getElementById("checkout-summary");
    const confirmButton = document.getElementById("confirm-order");
    const totalPriceElement = document.getElementById("total-price");
    let cart = JSON.parse(sessionStorage.getItem("cart")) || [];

    if (cart.length === 0) {
        checkoutSummary.innerHTML = "<p>🛒 Your cart is empty. <a href='products.html'>Shop Now</a></p>";
        confirmButton.style.display = "none"; // Hide confirm button
        return;
    }

    let subtotal = 0;
    let summaryHTML = `<table>
        <thead>
            <tr><th>Product</th><th>Price</th><th>Quantity</th><th>Total</th></tr>
        </thead>
        <tbody>`;

    cart.forEach(item => {
        let itemTotal = item.price * item.quantity;
        subtotal += itemTotal;

        summaryHTML += `
            <tr>
                <td>${item.name}</td>
                <td>$${item.price.toFixed(2)}</td>
                <td>${item.quantity}</td>
                <td>$${itemTotal.toFixed(2)}</td>
            </tr>
        `;
    });

    summaryHTML += `</tbody></table>`;
    checkoutSummary.innerHTML = summaryHTML;

    let tax = subtotal * 0.0675;
    let deliveryFee = 5.99;
    let serviceFee = cart.every(item => item.isDownloadable) ? 2.99 : 0;
    let total = subtotal + tax + deliveryFee + serviceFee;

    totalPriceElement.innerHTML = `
        <p>Subtotal: $${subtotal.toFixed(2)}</p>
        <p>Tax (6.75%): $${tax.toFixed(2)}</p>
        <p>Delivery Fee: $${deliveryFee.toFixed(2)}</p>
        <p>Service Fee: $${serviceFee.toFixed(2)}</p>
        <strong>Total: $${total.toFixed(2)}</strong>
    `;

    confirmButton.disabled = false;

    confirmButton.addEventListener("click", function () {
        if (cart.length === 0) {
            alert("🛒 Your cart is empty! Please add items before checking out.");
            return;
        }

        let orders = JSON.parse(localStorage.getItem("orders")) || [];
        let newOrder = {
            date: new Date().toLocaleString(),
            items: cart,
            total: total
        };

        orders.push(newOrder);
        localStorage.setItem("orders", JSON.stringify(orders));

        sessionStorage.removeItem("cart");
        alert("✅ Order placed successfully! Redirecting to your Order History.");
        window.location.href = "order-history.html";
    });
}

document.addEventListener("DOMContentLoaded", loadCheckout);
