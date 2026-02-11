/* ======================
   COUNTDOWN
====================== */
const START_DATE = new Date("2025-04-19T00:00:00");

function getCountdownValues() {
    const now = new Date();
    const diff = now - START_DATE;

    const totalSeconds = Math.floor(diff / 1000);
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return { days, hours, minutes, seconds };
}

function updateCountdownLanding() {
    const { days, hours, minutes, seconds } = getCountdownValues();
    const el = document.getElementById("countdown-landing");
    if (el) {
        el.innerText = `sudah ${days} hari, ${hours} jam, ${minutes} menit, ${seconds} detik bersama 💕`;
    }
}

function updateCountdownEnding() {
    const { days, hours, minutes, seconds } = getCountdownValues();
    const el = document.getElementById("countdown-ending");
    if (el) {
        el.innerHTML = `
            <div class="cd-box">
                <span class="cd-num">${days}</span>
                <span class="cd-label">Hari</span>
            </div>
            <div class="cd-box">
                <span class="cd-num">${hours}</span>
                <span class="cd-label">Jam</span>
            </div>
            <div class="cd-box">
                <span class="cd-num">${minutes}</span>
                <span class="cd-label">Menit</span>
            </div>
            <div class="cd-box">
                <span class="cd-num">${seconds}</span>
                <span class="cd-label">Detik</span>
            </div>
        `;
    }
}

// Jalankan keduanya setiap detik
setInterval(() => {
    updateCountdownLanding();
    updateCountdownEnding();
}, 1000);

// Langsung tampil saat load
updateCountdownLanding();
updateCountdownEnding();