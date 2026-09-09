const loginForm = document.getElementById("loginForm");
const loginMessage = document.getElementById("loginMessage");

function setMessage(message, type = "error") {
    loginMessage.textContent = message;
    loginMessage.style.color = type === "success" ? "#58745d" : "#a66c67";
}

loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const email = document.getElementById("email").value.trim().toLowerCase();
    const password = document.getElementById("password").value;
    const users = JSON.parse(localStorage.getItem("mounticksUsers")) || [];

    const user = users.find(function (item) {
        return item.email.toLowerCase() === email && item.password === password;
    });

    if (!user) {
        setMessage("Email atau password salah.");
        return;
    }

    localStorage.setItem("currentUser", JSON.stringify(user));
    localStorage.setItem("isLoggedIn", "true");
    setMessage("Login berhasil. Membuka Mounticks...", "success");

    setTimeout(function () {
        window.location.href = "Home.html";
    }, 500);
});

function loginGoogle() {
    const user = { id: "google_" + Date.now(), name: "Google User", username: "GoogleUser", email: "googleuser@gmail.com", provider: "Google" };
    localStorage.setItem("currentUser", JSON.stringify(user));
    localStorage.setItem("isLoggedIn", "true");
    window.location.href = "Home.html";
}

function loginFacebook() {
    const user = { id: "facebook_" + Date.now(), name: "Facebook User", username: "FacebookUser", email: "facebookuser@gmail.com", provider: "Facebook" };
    localStorage.setItem("currentUser", JSON.stringify(user));
    localStorage.setItem("isLoggedIn", "true");
    window.location.href = "Home.html";
}
