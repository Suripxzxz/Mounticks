const bookingList = document.getElementById("bookingList");
const empty = document.getElementById("empty");


/* ==========================================
   AMBIL BOOKING GUNUNG
========================================== */

function getMountainBookings() {
    return JSON.parse(
        localStorage.getItem("bookingHistory")
    ) || [];
}


/* ==========================================
   AMBIL BOOKING CAMPING
========================================== */

function getCampingBookings() {
    return JSON.parse(
        localStorage.getItem("campingHistory")
    ) || [];
}


/* ==========================================
   GABUNGKAN SEMUA BOOKING
========================================== */

function getAllBookings() {

    const mountainBookings = getMountainBookings();
    const campingBookings = getCampingBookings();

    // Tambahkan penanda jenis booking
    const mountainData = mountainBookings.map(function (booking) {
        return {
            ...booking,
            type: "Gunung"
        };
    });

    const campingData = campingBookings.map(function (booking) {
        return {
            ...booking,
            type: "Camping"
        };
    });

    return [...mountainData, ...campingData];

}


/* ==========================================
   SIMPAN BOOKING GUNUNG
========================================== */

function saveMountainBookings(bookings) {

    localStorage.setItem(
        "bookingHistory",
        JSON.stringify(bookings)
    );

}


/* ==========================================
   SIMPAN BOOKING CAMPING
========================================== */

function saveCampingBookings(bookings) {

    localStorage.setItem(
        "campingHistory",
        JSON.stringify(bookings)
    );

}


/* ==========================================
   TAMPILKAN RIWAYAT
========================================== */

function renderBookings() {

    const bookings = getAllBookings();

    bookingList.innerHTML = "";


    if (bookings.length === 0) {

        empty.style.display = "block";

        return;

    }


    empty.style.display = "none";


    bookings.forEach(function (booking) {

        const card = document.createElement("div");

        card.className = "booking-card";


        const isCancelled =
            booking.status === "Booking Dibatalkan";


        const isCamping =
            booking.type === "Camping";


        // Nama tempat
        const placeName =
            isCamping
                ? booking.spot
                : booking.mountain;


        // Label
        const placeLabel =
            isCamping
                ? "Camping Spot"
                : "Gunung";


        card.innerHTML = `

            <div class="booking-card-top">

                <div>

                    <span class="status ${
                        isCancelled ? "cancelled" : ""
                    }">

                        ${booking.status}

                    </span>


                    <h3>
                        ${placeName}
                    </h3>


                    <p>
                        ${isCamping ? "⛺" : "🏔️"}
                        ${placeLabel}
                    </p>


                    <p>
                        📅 ${formatDate(booking.date)}
                    </p>

                </div>


                <div class="ticket-symbol">

                    ${isCamping ? "⛺" : "🎟"}

                </div>

            </div>


            <div class="code-box">

                <span>
                    KODE BOOKING
                </span>

                <strong>
                    ${booking.code}
                </strong>

            </div>


            <div class="booking-info">

                <div>

                    <small>
                        Pemesan
                    </small>

                    <strong>
                        ${booking.name}
                    </strong>

                </div>


                <div>

                    <small>
                        Jumlah
                    </small>

                    <strong>
                        ${booking.people} orang
                    </strong>

                </div>


                <div>

                    <small>
                        Total
                    </small>

                    <strong>
                        ${formatRupiah(booking.total)}
                    </strong>

                </div>

            </div>


            <div class="action-buttons">

                ${
                    !isCancelled
                    ?
                    `
                    <button
                        class="cancel-btn"
                        onclick="cancelBooking('${booking.code}', '${booking.type}')">

                        Batalkan Booking

                    </button>
                    `
                    :
                    `
                    <div class="cancelled-text">

                        Booking ini sudah dibatalkan

                    </div>
                    `
                }


                ${
                    isCancelled
                    ?
                    `
                    <button
                        class="delete-btn"
                        onclick="deleteBooking('${booking.code}', '${booking.type}')">

                        Hapus Riwayat

                    </button>
                    `
                    :
                    `
                    <button
                        class="delete-btn disabled-delete"
                        onclick="deleteActiveBooking()">

                        Hapus Riwayat

                    </button>
                    `
                }

            </div>

        `;


        bookingList.appendChild(card);

    });

}


/* ==========================================
   BATALKAN BOOKING
========================================== */

function cancelBooking(code, type) {

    const yakin = confirm(
        "Yakin ingin membatalkan booking ini?"
    );


    if (!yakin) {
        return;
    }


    // ==============================
    // BOOKING GUNUNG
    // ==============================

    if (type === "Gunung") {

        let bookings = getMountainBookings();

        const booking = bookings.find(
            item => item.code === code
        );


        if (!booking) {

            alert("Booking tidak ditemukan.");

            return;

        }


        booking.status = "Booking Dibatalkan";

        saveMountainBookings(bookings);

    }


    // ==============================
    // BOOKING CAMPING
    // ==============================

    else if (type === "Camping") {

        let bookings = getCampingBookings();

        const booking = bookings.find(
            item => item.code === code
        );


        if (!booking) {

            alert("Booking camping tidak ditemukan.");

            return;

        }


        booking.status = "Booking Dibatalkan";

        saveCampingBookings(bookings);

    }


    renderBookings();


    alert(
        "Booking " +
        code +
        " berhasil dibatalkan."
    );

}


/* ==========================================
   HAPUS BOOKING
========================================== */

function deleteBooking(code, type) {

    let bookings;


    // ==============================
    // BOOKING GUNUNG
    // ==============================

    if (type === "Gunung") {

        bookings = getMountainBookings();

    }


    // ==============================
    // BOOKING CAMPING
    // ==============================

    else if (type === "Camping") {

        bookings = getCampingBookings();

    }


    const booking = bookings.find(
        item => item.code === code
    );


    if (!booking) {

        alert("Booking tidak ditemukan.");

        return;

    }


    /*
       BOOKING MASIH AKTIF
       TIDAK BOLEH DIHAPUS
    */

    if (booking.status !== "Booking Dibatalkan") {

        alert(
            "Booking harus dibatalkan terlebih dahulu sebelum menghapus riwayat."
        );

        return;

    }


    const yakin = confirm(
        "Hapus riwayat booking ini?\n\n" +
        "Data yang dihapus tidak dapat dikembalikan."
    );


    if (!yakin) {
        return;
    }


    bookings = bookings.filter(
        item => item.code !== code
    );


    if (type === "Gunung") {

        saveMountainBookings(bookings);

    }
    else if (type === "Camping") {

        saveCampingBookings(bookings);

    }


    renderBookings();

}


/* ==========================================
   JIKA TEKAN HAPUS SAAT MASIH AKTIF
========================================== */

function deleteActiveBooking() {

    alert(
        "Kamu harus membatalkan booking terlebih dahulu."
    );

}


/* ==========================================
   FORMAT TANGGAL
========================================== */

function formatDate(date) {

    return new Date(date + "T00:00:00")
        .toLocaleDateString(
            "id-ID",
            {
                day: "2-digit",
                month: "long",
                year: "numeric"
            }
        );

}


/* ==========================================
   FORMAT RUPIAH
========================================== */

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


/* ==========================================
   UPDATE SAAT KEMBALI KE HALAMAN
========================================== */

window.addEventListener("pageshow", function () {

    renderBookings();

});


/* ==========================================
   JALANKAN
========================================== */

renderBookings();
