const registerForm = document.getElementById("registerForm");

const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");

const togglePassword = document.getElementById("togglePassword");
const toggleConfirmPassword = document.getElementById("toggleConfirmPassword");

const registerMessage = document.getElementById("registerMessage");


/* =========================
   SHOW PASSWORD
========================= */

togglePassword.addEventListener("click", function () {

    if (password.type === "password") {
        password.type = "text";
        togglePassword.textContent = "🙈";
    } else {
        password.type = "password";
        togglePassword.textContent = "👁";
    }

});


toggleConfirmPassword.addEventListener("click", function () {

    if (confirmPassword.type === "password") {
        confirmPassword.type = "text";
        toggleConfirmPassword.textContent = "🙈";
    } else {
        confirmPassword.type = "password";
        toggleConfirmPassword.textContent = "👁";
    }

});


/* =========================
   REGISTER
========================= */

registerForm.addEventListener("submit", function (event) {

    event.preventDefault();


    const name =
        document.getElementById("name").value.trim();

    const username =
        document.getElementById("username").value.trim();

    const email =
        document.getElementById("email").value.trim().toLowerCase();

    const passwordValue =
        password.value;

    const confirmValue =
        confirmPassword.value;


    /* CEK PASSWORD */

    if (passwordValue.length < 6) {

        showMessage(
            "Password minimal 6 karakter.",
            "error"
        );

        return;
    }


    /* CEK PASSWORD */

    if (passwordValue !== confirmValue) {

        showMessage(
            "Password tidak sama.",
            "error"
        );

        return;
    }


    /* AMBIL DATA USER */

    let users =
        JSON.parse(
            localStorage.getItem("mounticksUsers")
        ) || [];


    /* CEK EMAIL */

    const emailExists =
        users.some(function (user) {

            return user.email === email;

        });


    if (emailExists) {

        showMessage(
            "Email sudah terdaftar.",
            "error"
        );

        return;
    }


    /* CEK USERNAME */

    const usernameExists =
        users.some(function (user) {

            return user.username.toLowerCase() ===
                username.toLowerCase();

        });


    if (usernameExists) {

        showMessage(
            "Username sudah digunakan.",
            "error"
        );

        return;
    }


    /* BUAT USER */

    const newUser = {

        id: Date.now(),

        name: name,

        username: username,

        email: email,

        password: passwordValue

    };


    /* SIMPAN */

    users.push(newUser);


    localStorage.setItem(
        "mounticksUsers",
        JSON.stringify(users)
    );


    showMessage(
        "Akun berhasil dibuat! Mengarahkan ke login...",
        "success"
    );


    /* PINDAH KE LOGIN */

    setTimeout(function () {

        window.location.href = "login.html";

    }, 1000);

});


/* =========================
   MESSAGE
========================= */

function showMessage(message, type) {

    registerMessage.textContent = message;


    if (type === "success") {

        registerMessage.style.color = "#58745d";

    } else {

        registerMessage.style.color = "#a66c67";

    }

}