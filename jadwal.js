/* ==========================================
   JADWAL PENDAKIAN MOUNTICKS
========================================== */

const jadwalContainer =
    document.getElementById("jadwalContainer");


/* ==========================================
   AMBIL DATA BOOKING
========================================== */

function getBookings() {

    return JSON.parse(
        localStorage.getItem("bookingHistory")
    ) || [];

}


/* ==========================================
   TAMPILKAN JADWAL
========================================== */

function tampilkanJadwal() {

    const bookings = getBookings();


    jadwalContainer.innerHTML = "";


    /*
       HANYA BOOKING YANG MASIH AKTIF
    */

    const jadwalAktif =
        bookings.filter(function (booking) {

            return booking.status === "Booking Aktif";

        });


    /* ==========================================
       KALAU BELUM ADA JADWAL
    ========================================== */

    if (jadwalAktif.length === 0) {

        jadwalContainer.innerHTML = `

            <div class="jadwal-kosong">

                <div class="kosong-icon">
                    🗓️
                </div>

                <h3>
                    Belum ada jadwal
                </h3>

                <p>
                    Booking pendakianmu akan
                    muncul otomatis di sini.
                </p>

                <a href="tiket.html">
                    Booking Sekarang
                </a>

            </div>

        `;

        return;

    }


    /* ==========================================
       BUAT KARTU JADWAL
    ========================================== */

    jadwalAktif.forEach(function (booking) {

        const card =
            document.createElement("div");


        card.className =
            "jadwal-card";


        card.innerHTML = `

            <div class="jadwal-card-header">

                <div class="tanggal-box">

                    <span>
                        ${getTanggal(booking.date)}
                    </span>

                    <strong>
                        ${getBulan(booking.date)}
                    </strong>

                </div>


                <div class="status-jadwal">
                    Booking Aktif
                </div>

            </div>


            <div class="jadwal-card-content">

                <span class="label-jadwal">
                    JADWAL PENDAKIAN
                </span>

                <h2>
                    ${booking.mountain}
                </h2>

                <p>
                    📅 ${formatDate(booking.date)}
                </p>

                <p>
                    🎟 Kode: ${booking.code}
                </p>

                <p>
                    👥 ${booking.people} orang
                </p>

            </div>

        `;


        jadwalContainer.appendChild(card);

    });

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


function getTanggal(date) {

    return new Date(date)
        .getDate();

}


function getBulan(date) {

    return new Date(date)
        .toLocaleDateString(
            "id-ID",
            {
                month: "short"
            }
        )
        .toUpperCase();

}


/* ==========================================
   JALANKAN
========================================== */

tampilkanJadwal();


/* ==========================================
   UPDATE SAAT KEMBALI KE HALAMAN
========================================== */

window.addEventListener(
    "pageshow",
    function () {

        tampilkanJadwal();

    }
);
