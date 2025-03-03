document.addEventListener("DOMContentLoaded", function () {
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // ✅ Ensure 'user1' always exists
    const defaultUser = { username: "user1", password: "password123" };
    if (!users.find(user => user.username === "user1")) {
        users.push(defaultUser);
        localStorage.setItem("users", JSON.stringify(users));
    }
});
