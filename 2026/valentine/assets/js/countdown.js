/* ======================
   COUNTDOWN
====================== */
const START_DATE = new Date("2025-04-19T00:00:00");
const VALENTINE_END = new Date("2026-02-14T23:59:59");

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

function isAfterValentine() {
    const now = new Date();
    return now > VALENTINE_END;
}

function updateCountdownLanding() {
    const el = document.getElementById("countdown-landing");
    if (!el) return;

    if (isAfterValentine()) {
        // Setelah Valentine lewat
        el.innerHTML = `<span style="color: #ff4d88;">Valentine pertama kita sudah berlalu, tapi kenangan indahnya tetap abadi 💕</span>`;
    } else {
        // Masih sebelum/saat Valentine
        const { days, hours, minutes, seconds } = getCountdownValues();
        el.innerText = `sudah ${days} hari, ${hours} jam, ${minutes} menit, ${seconds} detik bersama 💕`;
    }
}

function updateCountdownEnding() {
    const el = document.getElementById("countdown-ending");
    if (!el) return;

    if (isAfterValentine()) {
        // Setelah Valentine lewat - tampilkan snapshot terakhir
        const finalDiff = VALENTINE_END - START_DATE;
        const totalSeconds = Math.floor(finalDiff / 1000);
        const days = Math.floor(totalSeconds / 86400);
        const hours = Math.floor((totalSeconds % 86400) / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        el.innerHTML = `
            <div style="text-align: center; max-width: 500px; margin: 0 auto;">
                <p style="font-size: 0.95rem; color: #c2547a; margin-bottom: 16px; font-style: italic;">
                    Waktu berhenti di akhir Valentine pertama kita 💕
                </p>
                <div class="countdown-ending">
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
                </div>
                <p style="font-size: 0.9rem; color: #8b3a62; margin-top: 16px; line-height: 1.6;">
                    Kenangan indah ini akan tetap tersimpan selamanya di hatiku ❤️
                </p>
            </div>
        `;
    } else {
        // Masih sebelum/saat Valentine - countdown berjalan
        const { days, hours, minutes, seconds } = getCountdownValues();
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