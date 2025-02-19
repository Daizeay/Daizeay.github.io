/**
 * Name: Daisy Ibuoka
 * Date: 02.18.2025
 * CSC 372-01
 *
 * JavaScript functionality for the Dine On Campus website.
 */

document.addEventListener("DOMContentLoaded", function () {
    // Dish selection functionality
    const dishImages = document.querySelectorAll(".dish-img");
    const dishDescriptions = document.querySelectorAll(".dish-description");

    dishImages.forEach((image) => {
        image.addEventListener("click", function () {
            dishDescriptions.forEach(desc => desc.style.display = "none");
            const parent = image.closest(".restaurant");
            const descriptionDiv = parent.querySelector(".dish-description");

            descriptionDiv.innerHTML = `<p>${image.alt}</p>`;
            descriptionDiv.style.display = "block";
        });
    });

    // Meal plan functionality
    const mealPlan = {};
    const addButtons = document.querySelectorAll(".add-dish");
    const mealPlanList = document.getElementById("meal-plan-list");
    const totalAmount = document.getElementById("total-amount");

    addButtons.forEach((button) => {
        button.addEventListener("click", function () {
            const dishName = button.dataset.dish;
            const dishPrice = parseFloat(button.dataset.price);

            mealPlan[dishName] = mealPlan[dishName] ? { price: dishPrice, quantity: mealPlan[dishName].quantity + 1 } : { price: dishPrice, quantity: 1 };
            updateMealPlan();
        });
    });

    function updateMealPlan() {
        mealPlanList.innerHTML = "";
        let total = 0;

        Object.entries(mealPlan).forEach(([dish, { price, quantity }]) => {
            total += price * quantity;
            const li = document.createElement("li");
            li.innerHTML = `${dish} x${quantity} - $${(price * quantity).toFixed(2)}`;

            const removeBtn = document.createElement("button");
            removeBtn.textContent = "Remove One";
            removeBtn.addEventListener("click", () => {
                mealPlan[dish].quantity > 1 ? mealPlan[dish].quantity-- : delete mealPlan[dish];
                updateMealPlan();
            });

            li.appendChild(removeBtn);
            mealPlanList.appendChild(li);
        });

        totalAmount.textContent = total.toFixed(2);
    }
});
