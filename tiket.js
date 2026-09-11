const bookingForm = document.getElementById("bookingForm");

const identityModal = document.getElementById("identityModal");

const successModal = document.getElementById("successModal");

const identityNumber = document.getElementById("identityNumber");

const identityHint = document.getElementById("identityHint");

const identityError = document.getElementById("identityError");


let pendingBooking = null;


/* =========================
   FORM BOOKING
========================= */

bookingForm.addEventListener("submit", function (event) {

    event.preventDefault();


    const mountain =
        document.getElementById("mountain").value;

    const date =
        document.getElementById("date").value;

    const people =
        Number(document.getElementById("people").value);

    const name =
        document.getElementById("name").value.trim();


    if (!mountain || !date || !name || people < 1) {

        alert("Lengkapi data booking terlebih dahulu.");

        return;
    }


    const pricePerPerson = 50000;

    const total = people * pricePerPerson;


    /*
       Data booking sementara.
       Belum disimpan sampai identitas berhasil diverifikasi.
    */

    pendingBooking = {

        name: name,

        mountain: mountain,

        date: date,

        people: people,

        total: total

    };


    // Bersihkan error
    identityError.textContent = "";


    // Reset pilihan identitas

    document
        .querySelectorAll('input[name="identityType"]')
        .forEach(function (radio) {

            radio.checked = false;

        });


    identityNumber.value = "";

    identityNumber.disabled = true;

    identityNumber.placeholder =
        "Pilih jenis identitas terlebih dahulu";


    identityHint.textContent =
        "Nomor identitas hanya digunakan untuk proses verifikasi.";


    // Buka modal identitas

    identityModal.classList.add("show");

});


/* =========================
   PILIH JENIS IDENTITAS
========================= */

document
    .querySelectorAll('input[name="identityType"]')
    .forEach(function (radio) {

        radio.addEventListener("change", function () {

            identityNumber.disabled = false;

            identityNumber.value = "";

            identityError.textContent = "";


            if (this.value === "KTP") {

                identityNumber.placeholder =
                    "Masukkan NIK 16 digit";

                identityNumber.maxLength = 16;

                identityHint.textContent =
                    "NIK harus terdiri dari 16 angka.";

            }


            else if (this.value === "Kartu Pelajar") {

                identityNumber.placeholder =
                    "Masukkan NISN 10 digit";

                identityNumber.maxLength = 10;

                identityHint.textContent =
                    "NISN harus terdiri dari 10 angka.";

            }


            else if (this.value === "SIM") {

                identityNumber.placeholder =
                    "Masukkan nomor SIM";

                identityNumber.maxLength = 20;

                identityHint.textContent =
                    "Masukkan nomor SIM sesuai identitas.";

            }


            identityNumber.focus();

        });

    });


/* =========================
   HANYA BOLEH ANGKA
========================= */

identityNumber.addEventListener("input", function () {

    this.value = this.value.replace(/\D/g, "");

});


/* =========================
   VERIFIKASI IDENTITAS
========================= */

function verifyIdentity() {

    if (!pendingBooking) {

        alert("Data booking tidak ditemukan.");

        return;
    }


    const selectedIdentity =
        document.querySelector(
            'input[name="identityType"]:checked'
        );


    if (!selectedIdentity) {

        identityError.textContent =
            "Pilih jenis identitas terlebih dahulu.";

        return;
    }


    const identityType =
        selectedIdentity.value;


    const number =
        identityNumber.value.trim();


    /* =========================
       VALIDASI NIK
    ========================= */

    if (identityType === "KTP") {

        if (!/^\d{16}$/.test(number)) {

            identityError.textContent =
                "NIK harus terdiri dari 16 digit angka.";

            return;
        }

    }


    /* =========================
       VALIDASI NISN
    ========================= */

    if (identityType === "Kartu Pelajar") {

        if (!/^\d{10}$/.test(number)) {

            identityError.textContent =
                "NISN harus terdiri dari 10 digit angka.";

            return;
        }

    }


    /* =========================
       VALIDASI SIM
    ========================= */

    if (identityType === "SIM") {

        if (number.length < 8) {

            identityError.textContent =
                "Nomor SIM minimal 8 digit.";

            return;
        }

    }


    /*
       VERIFIKASI BERHASIL

       Nomor identitas TIDAK disimpan.
       Hanya jenis identitas dan status.
    */


    const randomNumber =
        Math.floor(
            100000 +
            Math.random() * 900000
        );


    const bookingCode =
        "MOUNT-" + randomNumber;


    const booking = {

        code: bookingCode,

        name: pendingBooking.name,

        mountain: pendingBooking.mountain,

        date: pendingBooking.date,

        people: pendingBooking.people,

        total: pendingBooking.total,

        status: "Booking Aktif",

        identityType: identityType,

        identityVerified: true,

        createdAt: new Date().toISOString()

    };


    /* =========================
       SIMPAN RIWAYAT
    ========================= */

    let bookings =
        JSON.parse(
            localStorage.getItem("bookingHistory")
        ) || [];


    bookings.unshift(booking);


    localStorage.setItem(
        "bookingHistory",
        JSON.stringify(bookings)
    );


    /* =========================
       TUTUP MODAL IDENTITAS
    ========================= */

    identityModal.classList.remove("show");


    /* =========================
       TAMPILKAN HASIL
    ========================= */

    document.getElementById("bookingCode")
        .textContent = bookingCode;


    document.getElementById("resultMountain")
        .textContent = booking.mountain;


    document.getElementById("resultDate")
        .textContent = formatDate(booking.date);


    document.getElementById("resultPeople")
        .textContent = booking.people + " orang";


    document.getElementById("resultTotal")
        .textContent = formatRupiah(booking.total);


    document.getElementById("resultIdentity")
        .textContent = booking.identityType + " ✓";


    successModal.classList.add("show");


    // Bersihkan data sementara

    pendingBooking = null;

}


/* =========================
   TUTUP MODAL IDENTITAS
========================= */

function closeIdentityModal() {

    identityModal.classList.remove("show");

    pendingBooking = null;

}


/* =========================
   KLIK LUAR MODAL
========================= */

identityModal.addEventListener(
    "click",
    function (event) {

        if (event.target === identityModal) {

            closeIdentityModal();

        }

    }
);


/* =========================
   FORMAT TANGGAL
========================= */

function formatDate(date) {

    return new Date(
        date + "T00:00:00"
    ).toLocaleDateString(
        "id-ID",
        {
            day: "2-digit",
            month: "long",
            year: "numeric"
        }
    );

}


/* =========================
   FORMAT RUPIAH
========================= */

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


/* =========================
   KE RIWAYAT
========================= */

function goHistory() {

    window.location.href =
        "riwayat.html";

}


/* =========================
   MINIMUM TANGGAL = HARI INI
========================= */

const dateInput =
    document.getElementById("date");


if (dateInput) {

    const today =
        new Date();


    const localToday =
        new Date(
            today.getTime() -
            today.getTimezoneOffset() * 60000
        )
        .toISOString()
        .split("T")[0];


    dateInput.min = localToday;

}
