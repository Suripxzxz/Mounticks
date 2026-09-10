function loadUserHome() {

    const userData =
        localStorage.getItem("currentUser");


    const usernameElement =
        document.getElementById("homeUsername");

    const greetingElement =
        document.getElementById("homeGreeting");


    if (!userData) {

        if (usernameElement) {
            usernameElement.textContent = "Guest";
        }

        if (greetingElement) {
            greetingElement.textContent = "Guest";
        }

        return;
    }


    const user =
        JSON.parse(userData);


    const username =
        user.username ||
        user.name ||
        "User";


    if (usernameElement) {

        usernameElement.textContent =
            username;

    }


    if (greetingElement) {

        greetingElement.textContent =
            username;

    }

}

/* ==========================================
   PENGATURAN
========================================== */

function showSettings() {

    const overlay =
        document.getElementById("settingsOverlay");

    const username =
        document.getElementById("settingsUsername");

    const email =
        document.getElementById("settingsEmail");


    const currentUser =
        JSON.parse(
            localStorage.getItem("currentUser")
        );


    if (currentUser) {

        username.textContent =
            currentUser.username ||
            currentUser.name ||
            "User";

        email.textContent =
            currentUser.email ||
            "Email tidak tersedia";

    }
    else {

        username.textContent = "User";
        email.textContent = "Belum login";

    }


    overlay.classList.add("show");

}


function closeSettings() {

    document
        .getElementById("settingsOverlay")
        .classList.remove("show");

}


/* Klik area luar modal */

document
    .getElementById("settingsOverlay")
    .addEventListener("click", function(event) {

        if (event.target === this) {
            closeSettings();
        }

    });


/* ==========================================
   INFORMASI AKUN
========================================== */

function showAccountInfo() {

    const user =
        JSON.parse(
            localStorage.getItem("currentUser")
        );

    if (!user) {

        alert("Belum ada akun yang login.");

        return;

    }


    alert(
        "INFORMASI AKUN\n\n" +

        "Nama: " +
        (user.name || "-") +

        "\nUsername: " +
        (user.username || "-") +

        "\nEmail: " +
        (user.email || "-")
    );

}


/* ==========================================
   LOGOUT
========================================== */

function logout() {

    const yakin = confirm(
        "Yakin ingin keluar dari akun?"
    );


    if (!yakin) {
        return;
    }


    localStorage.removeItem("currentUser");
    localStorage.removeItem("isLoggedIn");


    alert("Kamu berhasil logout.");


    window.location.href = "login.html";

}

/* JALANKAN */

loadUserHome();
