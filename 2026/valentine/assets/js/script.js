/* ======================
   GLOBAL STATE
====================== */
let currentLevel = localStorage.getItem("level") || 1;

/* ======================
   MUSIC HANDLER
====================== */
const music = document.getElementById('bg-music');


/* ======================
   SCREEN HANDLER
====================== */
function showScreen(id) {
    document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
    document.getElementById(id).classList.add("active");
}

function startGame() {
    music.play();
    showScreen("map");
    unlockLevels();
}

/* ======================
   LEVEL UNLOCK
====================== */
function unlockLevels() {
    for (let i = 1; i <= currentLevel; i++) {
        document.getElementById("level" + i).disabled = false;
    }
}

/* ======================
   OPEN GAME
====================== */
function openGame(level) {
    showScreen("game");

    if (level == 1) memoryGame();
    if (level == 2) quizGame();
    if (level == 3) heartGame();
}

/* ======================
   LEVEL 1 – MEMORY CARD
====================== */
function memoryGame() {
    document.getElementById("gameTitle").innerText = "Memory Match 💌";

    const emojis = ["❤️", "💖", "💕", "💗", "🌹", "❤️", "💖", "💕", "💗", "🌹"];
    let shuffled = emojis.sort(() => 0.5 - Math.random());
    let first = null, lock = false, matched = 0;

    const container = document.createElement("div");
    container.className = "cards";

    shuffled.forEach(e => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerText = "❓";

        card.onclick = () => {
            if (lock || card.innerText !== "❓") return;

            card.innerText = e;

            if (!first) {
                first = card;
            } else {
                lock = true;
                if (first.innerText === card.innerText) {
                    matched += 2;
                    first = null;
                    lock = false;
                    if (matched === shuffled.length) finishLevel();
                } else {
                    setTimeout(() => {
                        card.innerText = "❓";
                        first.innerText = "❓";
                        first = null;
                        lock = false;
                    }, 800);
                }
            }
        };

        container.appendChild(card);
    });

    document.getElementById("gameContent").innerHTML = "";
    document.getElementById("gameContent").appendChild(container);
}

/* ======================
   LEVEL 2 – QUIZ (MULTIPLE CHOICE)
====================== */
function quizGame() {
    document.getElementById("gameTitle").innerText = "Romantic Quiz 💖";

    const questions = [
        {
            q: "💕 Di bulan apa kita resmi jadian?",
            options: ["Maret", "April", "Mei"],
            a: 1
        },
        {
            q: "🌹 Siapa yang paling sering bikin suasana jadi hangat duluan?",
            options: ["Wendy", "Dua-duanya sama", "Aplia"],
            a: 1
        },
        {
            q: "💌 Apa yang paling Wendy suka dari Aplia?",
            options: ["Caranya perhatian", "Senyum & tawanya", "Semua hal tentangnya"],
            a: 2
        },
        {
            q: "🌙 Kalau lagi kangen, Aplia biasanya...",
            options: ["Diam tapi mellow", "Langsung bilang kangen", "Pura-pura sibuk padahal nungguin chat"],
            a: 0
        },
        {
            q: "❤️ Siapa orang paling spesial di dunia Wendy?",
            options: ["Rahasia deh", "Emang ada ?", "Sudah tau lah ya"],
            a: 2
        },
        {
            q: "😄 Kalau lagi berantem kecil, siapa yang biasanya minta maaf duluan?",
            options: ["Wendy yang duluan", "Aplia yang duluan", "Keduanya berani memulai duluan"],
            a: 2
        },
        {
            q: "🌸 Apa hal kecil dari Wendy yang paling bikin Aplia senyum sendiri?",
            options: ["Cara dia bilang 'aku sayang kamu'", "Tiba-tiba kirim meme random", "Perhatiin hal kecil yang jarang orang sadarin"],
            a: 2
        },
        {
            q: "🍜 Kalau lagi makan bareng, Wendy paling sering...",
            options: ["Suapin duluan sebelum makan sendiri", "Ngajak Ketawa bersama", "Makan lahap tapi tetap lucu"],
            a: 2
        },
        {
            q: "💬 Kalimat yang paling sering Wendy kirim ke Aplia?",
            options: ["Lagi ngapain?", "Udah makan belum?", "Aku kangen kamu"],
            a: 2
        },
        {
            q: "🌟 Apa satu kata yang paling cocok buat menggambarkan hubungan kita?",
            options: ["Hangat", "Rumah", "Bahagia"],
            a: 1
        }
    ];

    let index = 0;
    let selected = null;
    let score = 0; // Tambahan: hitung skor

    const container = document.createElement("div");
    container.className = "quiz-container";

    const questionEl = document.createElement("p");
    questionEl.className = "quiz-question";

    const optionsEl = document.createElement("div");
    optionsEl.className = "quiz-options";

    const feedback = document.createElement("p");
    feedback.className = "quiz-feedback";

    const btnNext = document.createElement("button");
    btnNext.innerText = "Lanjut →";
    btnNext.className = "quiz-next hidden";

    const progress = document.createElement("p");
    progress.className = "quiz-progress";

    function renderQuestion() {
        selected = null;
        feedback.innerText = "";
        btnNext.classList.add("hidden");
        optionsEl.innerHTML = "";

        const current = questions[index];
        questionEl.innerText = current.q;
        progress.innerText = `Soal ${index + 1} dari ${questions.length}`;

        current.options.forEach((opt, i) => {
            const btn = document.createElement("button");
            btn.className = "quiz-option";
            btn.innerText = ["🅐", "🅑", "🅒"][i] + "  " + opt;

            btn.onclick = () => {
                if (selected !== null) return;
                selected = i;

                // Tandai semua opsi
                document.querySelectorAll(".quiz-option").forEach((b, bi) => {
                    b.disabled = true;
                    if (bi === current.a) {
                        b.classList.add("correct");
                    } else if (bi === i && i !== current.a) {
                        b.classList.add("wrong");
                    }
                });

                if (i === current.a) {
                    score++; // Tambah skor kalau benar
                    feedback.innerText = ["Yeay betul! 🎉", "Kamu tau aku banget! 💕", "Benar! ❤️"][Math.floor(Math.random() * 3)];
                    feedback.style.color = "#ff4d88";
                } else {
                    feedback.innerText = ["Eh salah~ 😝", "Hmm, coba inget lagi 🥺", "Bukan itu sayang~ 💔"][Math.floor(Math.random() * 3)];
                    feedback.style.color = "#e05c8a";
                }

                btnNext.classList.remove("hidden");
            };

            optionsEl.appendChild(btn);
        });
    }

    btnNext.onclick = () => {
        index++;
        if (index < questions.length) {
            renderQuestion();
        } else {
            showQuizResult(score, questions.length);
        }
    };

    container.append(progress, questionEl, optionsEl, feedback, btnNext);
    document.getElementById("gameContent").innerHTML = "";
    document.getElementById("gameContent").appendChild(container);

    renderQuestion();
}

/* ======================
   QUIZ RESULT PAGE
====================== */
function showQuizResult(score, total) {
    const percentage = Math.round((score / total) * 100);
    const passed = score >= 7; // Minimal 7 dari 10

    const container = document.createElement("div");
    container.className = "quiz-result";

    const scoreEl = document.createElement("div");
    scoreEl.className = "quiz-score";
    scoreEl.innerHTML = `
        <div class="score-number">${score}/${total}</div>
        <div class="score-percentage">${percentage}%</div>
    `;

    const message = document.createElement("p");
    message.className = "quiz-message";

    const btnAction = document.createElement("button");
    btnAction.className = "quiz-action-btn";

    if (passed) {
        // LULUS
        let msg = "";
        if (score === 10) {
            msg = "Sempurna! Kamu tau aku lebih dari aku tau diriku sendiri 🥰💕";
        } else if (score === 9) {
            msg = "Hampir sempurna! Kamu emang spesial banget buat aku ❤️✨";
        } else if (score === 8) {
            msg = "Keren! Kamu perhatian banget sama detail kecil tentang kita 💖";
        } else {
            msg = "Good job sayang! Kamu emang paham aku kok 🌸💕";
        }
        message.innerText = msg;
        btnAction.innerText = "Lanjut ke Level Berikutnya 💌";
        btnAction.onclick = finishLevel;
    } else {
        // GAGAL
        let msg = "";
        if (score < 5) {
            msg = "Waduh, kok kayak baru kenal ya? 😅 Coba lagi yuk, aku percaya kamu bisa! 💪";
        } else {
            msg = "Hampir! Tapi kayaknya kamu kurang fokus deh 😝 Ulangi lagi ya, pasti bisa! 💕";
        }
        message.innerText = msg;
        btnAction.innerText = "Ulangi Quiz 🔄";
        btnAction.onclick = quizGame;
    }

    container.append(scoreEl, message, btnAction);
    document.getElementById("gameContent").innerHTML = "";
    document.getElementById("gameContent").appendChild(container);
}
/* ======================
   LEVEL 3 – HEART CLICK
====================== */
function heartGame() {
    document.getElementById("gameTitle").innerText = "Catch the Hearts 💞";
    let score = 0;

    const info = document.createElement("p");
    info.innerText = "Klik 5 hati 💖";

    const container = document.createElement("div");

    const interval = setInterval(() => {
        const heart = document.createElement("span");
        heart.innerText = "💖";
        heart.style.position = "absolute";
        heart.style.left = Math.random() * 90 + "%";
        heart.style.top = Math.random() * 80 + "%";
        heart.style.fontSize = "30px";
        heart.style.cursor = "pointer";

        heart.onclick = () => {
            heart.remove();
            score++;
            if (score >= 5) {
                clearInterval(interval);
                finishLevel();
            }
        };

        container.appendChild(heart);
        setTimeout(() => heart.remove(), 2000);
    }, 600);

    document.getElementById("gameContent").innerHTML = "";
    document.getElementById("gameContent").append(info, container);
}

/* ======================
   FINISH LEVEL
====================== */
function finishLevel() {
    currentLevel++;
    localStorage.setItem("level", currentLevel);

    if (currentLevel > 3) {
        localStorage.setItem("level", 4);
        showScreen("memory");
        startTimeline();
        unlockLevels();
    } else {
        showScreen("map");
        unlockLevels();
    }
}

function goToEnding() {
    showScreen("ending");
    typeText();
}

/* ======================
   FLOATING HEART EFFECT
====================== */
setInterval(() => {
    const heart = document.createElement("span");
    heart.innerText = "❤️";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.animationDuration = 4 + Math.random() * 3 + "s";
    document.getElementById("hearts").appendChild(heart);

    setTimeout(() => heart.remove(), 7000);
}, 400);


/* ======================
   EFFECT SPARKLE
====================== */
function startSparkle() {
    const areas = document.querySelectorAll('.sparkle-area');

    areas.forEach(area => {
        setInterval(() => {
            const sparkle = document.createElement('span');
            sparkle.className = 'sparkle';
            sparkle.innerText = '✨';

            const x = Math.random() * area.offsetWidth;
            const y = Math.random() * area.offsetHeight;

            sparkle.style.left = x + 'px';
            sparkle.style.top = y + 'px';

            area.appendChild(sparkle);

            setTimeout(() => sparkle.remove(), 2500);
        }, 700);
    });
}


/* ======================
   EFFECT TYPING
====================== */
function typeText() {
    setTimeout(() => {
        const loveMessage = `Aku mungkin tidak sempurna,
tapi bertemu dengan mu adalah hal indah
yang pernah aku lakukan.

Terima kasih sudah hadir,
tertawa bersamaku,
dan tetap di sampingku ❤️`
        const el = document.getElementById('typing-text');
        el.innerHTML = "";
        let i = 0;
        const interval = setInterval(() => {
            el.innerHTML += loveMessage.charAt(i);
            i++;

            // Saat typing selesai
            if (i >= loveMessage.length) {
                clearInterval(interval);

                // Tampilkan galeri setelah delay kecil
                setTimeout(() => {
                    document.getElementById("btn-polaroid-wall").classList.remove("hidden");
                }, 800);

            }
        }, 50);
    }, 3500);
}

