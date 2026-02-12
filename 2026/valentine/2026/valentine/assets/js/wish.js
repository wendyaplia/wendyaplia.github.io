/* ======================
   WISH / LOVE LETTER
====================== */
const wishes = [
    {
        icon: "🌸",
        text: "Semoga kita selalu jadi rumah satu sama lain, tempat pulang yang paling nyaman di dunia."
    },
    {
        icon: "💕",
        text: "Semoga setiap hari yang kita lewati bersama selalu penuh tawa, meski di hari-hari yang sulit sekalipun."
    },
    {
        icon: "💖",
        text: "Terima kasih sudah jadi partner terbaik dalam game bernama “kita”. Siap lanjut ke level berikutnya? Aku memilih kamu, hari ini dan seterusnya. 💞"
    },
    {
        icon: "🌙",
        text: "Semoga cinta ini tumbuh semakin dalam, dan kita bisa tua bersama dengan genggaman tangan yang sama."
    }
];

function openLetter() {
    const envelope = document.getElementById("envelope");
    const letterContent = document.getElementById("letterContent");

    // Animasi envelope menghilang
    envelope.style.transition = "all 0.5s ease";
    envelope.style.opacity = "0";
    envelope.style.transform = "scale(0.8) translateY(-20px)";

    setTimeout(() => {
        envelope.classList.add("hidden");
        letterContent.classList.remove("hidden");
        populateWishes();
    }, 500);
}

function populateWishes() {
    const wishList = document.getElementById("wishList");
    wishList.innerHTML = "";

    wishes.forEach((wish, i) => {
        const item = document.createElement("div");
        item.className = "wish-item";
        item.innerHTML = `
            <span class="wish-icon">${wish.icon}</span>
            <span class="wish-text">${wish.text}</span>
        `;
        wishList.appendChild(item);

        // Muncul satu per satu dengan delay
        setTimeout(() => {
            item.classList.add("show");
        }, 300 * (i + 1));
    });

    // Closing muncul setelah semua wish tampil
    const closing = document.querySelector(".letter-closing");
    setTimeout(() => {
        closing.classList.add("show");
    }, 300 * wishes.length + 600);   
}

function startWishLetter() {
    // Reset state saat masuk halaman
    document.getElementById("envelope").classList.remove("hidden");
    document.getElementById("envelope").style.opacity = "1";
    document.getElementById("envelope").style.transform = "scale(1)";
    document.getElementById("letterContent").classList.add("hidden");
}