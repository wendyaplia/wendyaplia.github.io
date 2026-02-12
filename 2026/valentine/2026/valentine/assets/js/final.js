/* ======================
   FINAL SURPRISE
====================== */
function openGift() {
    const giftBox = document.getElementById("giftBox");
    const finalMessage = document.getElementById("finalMessage");

    // Animasi gift box membuka
    giftBox.classList.add("opening");

    // Setelah gift box hilang
    setTimeout(() => {
        giftBox.style.display = "none";

        // Confetti meledak
        createConfetti();

        // Tampilkan pesan
        setTimeout(() => {
            finalMessage.classList.remove("hidden");
            setTimeout(() => {
                finalMessage.classList.add("show");
                typeFinalMessage();
            }, 100);
        }, 300);
    }, 800);
}

function typeFinalMessage() {
    const paragraphs = [
        "Terima kasih sudah melewati setiap level dalam perjalanan kecil ini bersamaku.",
        "Dari pertama kali kenal sampai hari ini, kamu selalu bikin hariku jadi lebih seru dan penuh warna.",
        "Setiap tawa kita, setiap obrolan random tengah malam, setiap momen kecil, semuanya jadi kenangan yang nggak bakal aku lupain.",
        "Aku nggak tau gimana cerita kita nanti, tapi yang pasti, aku senang bisa ngelewatin hari-hari ini sama kamu.",
        "Happy Valentine. Ini baru awal, tapi aku udah nggak sabar ngejalanin cerita kita yang lain. ❤️"
    ];

    const finalContent = document.getElementById("finalContent");
    finalContent.innerHTML = `
        <div class="final-text" id="typingFinal"></div>
        <div class="final-signature">Dengan cinta, Wendy ❤️</div>
    `;

    const typingEl = document.getElementById("typingFinal");
    let currentParagraph = 0;
    let currentChar = 0;

    function typeNextChar() {
        if (currentParagraph >= paragraphs.length) return;

        const text = paragraphs[currentParagraph];

        if (currentChar === 0) {
            // Paragraf baru, buat elemen <p>
            const p = document.createElement("p");
            p.style.marginBottom = "16px";
            p.style.lineHeight = "1.8";
            typingEl.appendChild(p);
        }

        if (currentChar < text.length) {
            // Ketik karakter per karakter (PAKAI textContent, bukan innerText)
            const lastP = typingEl.lastChild;
            lastP.textContent += text.charAt(currentChar);
            currentChar++;
            setTimeout(typeNextChar, 30);
        } else {
            // Paragraf selesai, lanjut ke paragraf berikutnya
            currentParagraph++;
            currentChar = 0;
            setTimeout(typeNextChar, 200); // Delay antar paragraf
        }
    }

    typeNextChar();
}

function createConfetti() {
    const colors = ['#ff7aa2', '#ffb6d9', '#ffd6e8', '#ff4d88', '#fff0f5'];
    const confettiCount = 50;

    for (let i = 0; i < confettiCount; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.animationDelay = Math.random() * 0.5 + 's';
            confetti.style.animationDuration = (2 + Math.random() * 2) + 's';

            document.body.appendChild(confetti);

            setTimeout(() => confetti.remove(), 5000);
        }, i * 30);
    }
}

function restartJourney() {
    // Reset level
    currentLevel = 1;
    localStorage.setItem("level", currentLevel);

    // Kembali ke landing
    showScreen("landing");

    // Reset gift box untuk next play
    const giftBox = document.getElementById("giftBox");
    const finalMessage = document.getElementById("finalMessage");

    giftBox.classList.remove("opening");
    giftBox.style.display = "block";
    finalMessage.classList.remove("show");
    finalMessage.classList.add("hidden");
}