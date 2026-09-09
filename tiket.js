const bookingForm = document.getElementById("bookingForm");

bookingForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const mountain = document.getElementById("mountain").value;
    const date = document.getElementById("date").value;
    const people = Number(document.getElementById("people").value);
    const name = document.getElementById("name").value;

    const pricePerPerson = 50000;
    const total = people * pricePerPerson;

    // KODE BOOKING RANDOM
    const randomNumber = Math.floor(100000 + Math.random() * 900000);
    const bookingCode = "MOUNT-" + randomNumber;

    const booking = {
        code: bookingCode,
        name: name,
        mountain: mountain,
        date: date,
        people: people,
        total: total,
        status: "Booking Aktif",
        createdAt: new Date().toISOString()
    };

    // AMBIL DATA LAMA
    let bookings = JSON.parse(
        localStorage.getItem("bookingHistory")
    ) || [];

    // SIMPAN BOOKING
    bookings.unshift(booking);

    localStorage.setItem(
        "bookingHistory",
        JSON.stringify(bookings)
    );

    // TAMPILKAN HASIL
    document.getElementById("bookingCode").textContent =
        bookingCode;

    document.getElementById("resultMountain").textContent =
        mountain;

    document.getElementById("resultDate").textContent =
        formatDate(date);

    document.getElementById("resultPeople").textContent =
        people + " orang";

    document.getElementById("resultTotal").textContent =
        formatRupiah(total);

    document
        .getElementById("successModal")
        .classList.add("show");

});


function formatDate(date) {

    return new Date(date).toLocaleDateString(
        "id-ID",
        {
            day: "2-digit",
            month: "long",
            year: "numeric"
        }
    );

}


function formatRupiah(number) {

    return new Intl.NumberFormat(
        "id-ID",
        {
            style: "currency",
            currency: "IDR",
            maximumFractionDigits: 0
        }
    ).format(number);

}


function goHistory() {

    window.location.href = "riwayat.html";

}


const dateInput = document.getElementById("date");

if (dateInput) {

    const today =
        new Date().toISOString().split("T")[0];

    dateInput.min = today;

}