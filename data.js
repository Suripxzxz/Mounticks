// ================================
// PEMBAYARAN
// ================================

function simpanPembayaran(data) {

    let riwayat =
        JSON.parse(localStorage.getItem("riwayatPembayaran")) || [];

    riwayat.push(data);

    localStorage.setItem(
        "riwayatPembayaran",
        JSON.stringify(riwayat)
    );
}


// ================================
// JADWAL
// ================================

function simpanJadwal(data) {

    let jadwal =
        JSON.parse(localStorage.getItem("jadwalPendakian")) || [];

    jadwal.push(data);

    localStorage.setItem(
        "jadwalPendakian",
        JSON.stringify(jadwal)
    );
}


// ================================
// AMBIL DATA
// ================================

function getRiwayatPembayaran() {

    return JSON.parse(
        localStorage.getItem("riwayatPembayaran")
    ) || [];
}


function getJadwalPendakian() {

    return JSON.parse(
        localStorage.getItem("jadwalPendakian")
    ) || [];
}


// ================================
// UPDATE DATA
// ================================

function updateRiwayat(index, data) {

    let riwayat = getRiwayatPembayaran();

    riwayat[index] = {
        ...riwayat[index],
        ...data
    };

    localStorage.setItem(
        "riwayatPembayaran",
        JSON.stringify(riwayat)
    );
}


function updateJadwal(index, data) {

    let jadwal = getJadwalPendakian();

    jadwal[index] = {
        ...jadwal[index],
        ...data
    };

    localStorage.setItem(
        "jadwalPendakian",
        JSON.stringify(jadwal)
    );
}