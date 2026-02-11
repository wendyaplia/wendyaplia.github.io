/* ======================
   LOADING SCREEN
====================== */
const loadingMessages = [
    "Menyiapkan kejutan untukmu... 💕",
    "Mengumpulkan semua kenangan indah... 🌸",
    "Sebentar lagi ya sayang... 💖",
    "Mempersiapkan perjalanan kita... 🌙"
];

function startLoading() {
    const screen = document.getElementById("loading");
    const text = document.getElementById("loadingText");
    let i = 0;

    // Ketik pesan loading
    typeLoadingText(loadingMessages[0], text, () => {
        // Ganti pesan setelah delay
        setTimeout(() => {
            i = 1;
            text.style.opacity = "0";
            setTimeout(() => {
                text.style.transition = "opacity 0.5s ease";
                text.style.opacity = "1";
                typeLoadingText(loadingMessages[1], text, () => {
                    // Selesai loading, tutup screen
                    setTimeout(() => {
                        screen.classList.add("hide");
                        setTimeout(() => {
                            screen.style.display = "none";
                        }, 800);
                    }, 800);
                });
            }, 400);
        }, 600);
    });
}

function typeLoadingText(message, el, callback) {
    el.innerText = "";
    let i = 0;
    const interval = setInterval(() => {
        el.innerText += message.charAt(i);
        i++;
        if (i >= message.length) {
            clearInterval(interval);
            if (callback) callback();
        }
    }, 40);
}

// Jalankan loading saat halaman pertama dibuka
window.addEventListener("load", () => {
    startLoading();
});
