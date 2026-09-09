const bookingList =
    document.getElementById("bookingList");

const empty =
    document.getElementById("empty");


/* ==========================================
   AMBIL DATA BOOKING
========================================== */

function getBookings() {

    return JSON.parse(
        localStorage.getItem("bookingHistory")
    ) || [];

}


/* ==========================================
   SIMPAN DATA BOOKING
========================================== */

function saveBookings(bookings) {

    localStorage.setItem(
        "bookingHistory",
        JSON.stringify(bookings)
    );

}


/* ==========================================
   TAMPILKAN RIWAYAT
========================================== */

function renderBookings() {

    const bookings = getBookings();

    bookingList.innerHTML = "";


    if (bookings.length === 0) {

        empty.style.display = "block";

        return;

    }


    empty.style.display = "none";


    bookings.forEach(function (booking) {

        const card =
            document.createElement("div");

        card.className = "booking-card";


        const isCancelled =
            booking.status === "Booking Dibatalkan";


        card.innerHTML = `

            <div class="booking-card-top">

                <div>

                    <span class="status ${
                        isCancelled
                            ? "cancelled"
                            : ""
                    }">

                        ${booking.status}

                    </span>


                    <h3>
                        ${booking.mountain}
                    </h3>


                    <p>
                        📅 ${formatDate(booking.date)}
                    </p>

                </div>


                <div class="ticket-symbol">
                    🎟
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
                        Pendaki
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
                        onclick="cancelBooking('${booking.code}')">

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
                        onclick="deleteBooking('${booking.code}')">

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

function cancelBooking(code) {

    const yakin =
        confirm(
            "Yakin ingin membatalkan booking ini?"
        );


    if (!yakin) {
        return;
    }


    let bookings = getBookings();


    const booking =
        bookings.find(
            item => item.code === code
        );


    if (!booking) {

        alert("Booking tidak ditemukan.");

        return;

    }


    booking.status =
        "Booking Dibatalkan";


    saveBookings(bookings);


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

function deleteBooking(code) {

    let bookings = getBookings();


    const booking =
        bookings.find(
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


    const yakin =
        confirm(
            "Hapus riwayat booking ini?\n\nData yang dihapus tidak dapat dikembalikan."
        );


    if (!yakin) {
        return;
    }


    bookings =
        bookings.filter(
            item => item.code !== code
        );


    saveBookings(bookings);


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

    return new Date(date)
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
   JALANKAN
========================================== */

renderBookings();