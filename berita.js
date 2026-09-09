/* ==========================================
   DATA GUNUNG
========================================== */

const mountains = {

    gede: {
        lat: -6.78,
        lon: 106.98,
        weather: "weather-gede",
        temp: "temp-gede"
    },

    pangrango: {
        lat: -6.77,
        lon: 106.94,
        weather: "weather-pangrango",
        temp: "temp-pangrango"
    },

    papandayan: {
        lat: -7.32,
        lon: 107.73,
        weather: "weather-papandayan",
        temp: "temp-papandayan"
    },

    merbabu: {
        lat: -7.45,
        lon: 110.44,
        weather: "weather-merbabu",
        temp: "temp-merbabu"
    },

    semeru: {
        lat: -8.11,
        lon: 112.92,
        weather: "weather-semeru",
        temp: "temp-semeru"
    }

};


/* ==========================================
   AMBIL DATA CUACA
========================================== */

async function getWeather(mountain) {

    const url =
        `https://api.open-meteo.com/v1/forecast` +
        `?latitude=${mountain.lat}` +
        `&longitude=${mountain.lon}` +
        `&current=temperature_2m,weather_code` +
        `&temperature_unit=celsius` +
        `&timezone=auto`;

    try {

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Gagal mengambil data cuaca");
        }

        const data = await response.json();

        const temperature =
            data.current.temperature_2m;

        const weatherCode =
            data.current.weather_code;


        /* MASUKKAN SUHU KE HTML */

        document
            .getElementById(mountain.temp)
            .textContent =
            `${Math.round(temperature)}°C`;


        /* MASUKKAN CUACA KE HTML */

        document
            .getElementById(mountain.weather)
            .textContent =
            getWeatherText(weatherCode);


    } catch (error) {

        console.error(
            "Error cuaca:",
            error
        );


        document
            .getElementById(mountain.weather)
            .textContent =
            "Tidak tersedia";


        document
            .getElementById(mountain.temp)
            .textContent =
            "--°C";

    }

}


/* ==========================================
   UBAH WEATHER CODE MENJADI TEKS
========================================== */

function getWeatherText(code) {

    if (code === 0) {
        return "Cerah";
    }

    if (code === 1) {
        return "Cerah berawan";
    }

    if (code === 2) {
        return "Berawan";
    }

    if (code === 3) {
        return "Mendung";
    }

    if (code >= 45 && code <= 48) {
        return "Berkabut";
    }

    if (code >= 51 && code <= 57) {
        return "Gerimis";
    }

    if (code >= 61 && code <= 67) {
        return "Hujan";
    }

    if (code >= 71 && code <= 77) {
        return "Salju";
    }

    if (code >= 80 && code <= 82) {
        return "Hujan deras";
    }

    if (code >= 95 && code <= 99) {
        return "Badai petir";
    }

    return "Tidak diketahui";

}


/* ==========================================
   UPDATE SEMUA GUNUNG
========================================== */

function updateAllWeather() {

    Object
        .values(mountains)
        .forEach(mountain => {

            getWeather(mountain);

        });


    updateTime();

}


/* ==========================================
   WAKTU UPDATE
========================================== */

function updateTime() {

    const now = new Date();

    const time =
        now.toLocaleTimeString(
            "id-ID",
            {
                hour: "2-digit",
                minute: "2-digit"
            }
        );


    const updateElement =
        document.getElementById("updateTime");


    if (updateElement) {

        updateElement.textContent =
            "Update " + time;

    }

}


/* ==========================================
   JALANKAN SAAT HALAMAN DIBUKA
========================================== */

updateAllWeather();


/* ==========================================
   UPDATE OTOMATIS SETIAP 15 MENIT
========================================== */

setInterval(
    updateAllWeather,
    15 * 60 * 1000
);