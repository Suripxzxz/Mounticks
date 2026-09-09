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


/* JALANKAN */

loadUserHome();