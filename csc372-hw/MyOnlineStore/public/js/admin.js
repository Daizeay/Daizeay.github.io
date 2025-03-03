/**
 * Name: Daisy Ibuoka
 * Date: 03.01.2025
 * CSC 372-01
 *
 * This script manages the admin product panel and ensures secure authentication.
 */

document.addEventListener("DOMContentLoaded", function () {
    // ✅ Ensure the admin is logged in before allowing access
    if (!sessionStorage.getItem("adminLoggedIn")) {
        alert("Unauthorized! Redirecting to login...");
        window.location.href = "/auth/login.html";
        return; // Stop further execution
    }

    const productContainer = document.getElementById("product-list");

    fetch("/products")
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to fetch products.");
            }
            return response.json();
        })
        .then(products => {
            if (!products.length) {
                productContainer.innerHTML = "<p>No products available.</p>";
                return;
            }

            products.forEach(product => {
                let div = document.createElement("div");
                div.classList.add("product-item");
                div.innerHTML = `
                    <h3>${product.name}</h3>
                    <p>Category: ${product.category}</p>
                    <p>Price: $${product.price.toFixed(2)}</p>
                    <button onclick="editProduct(${product.id})">✏️ Edit</button>
                    <button onclick="deleteProduct(${product.id})">🗑️ Delete</button>
                `;
                productContainer.appendChild(div);
            });
        })
        .catch(error => {
            console.error("Error fetching products:", error);
            productContainer.innerHTML = "<p>Error loading products. Please try again later.</p>";
        });

    document.getElementById("add-product").addEventListener("click", () => {
        window.location.href = "/admin/add-product";
    });
});

// ✅ Function to handle product deletion
function deleteProduct(id) {
    if (confirm("Are you sure you want to delete this product?")) {
        fetch(`/admin/delete-product/${id}`, { method: "DELETE" })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Failed to delete product.");
                }
                alert("Product deleted successfully!");
                window.location.reload();
            })
            .catch(error => {
                console.error("Error deleting product:", error);
                alert("Error deleting product. Please try again.");
            });
    }
}

// ✅ Function to handle product editing
function editProduct(id) {
    window.location.href = `/admin/edit-product/${id}`;
}

// ✅ Function to sign out admin
function signOut() {
    sessionStorage.removeItem("adminLoggedIn");
    window.location.href = "/auth/login.html";
}
