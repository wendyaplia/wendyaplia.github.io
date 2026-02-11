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
            q: "🌸 Apa hal kecil dari Wendy yang paling bikin Aplia senyum sendiri?",
            options: ["Cara dia bilang 'aku sayang kamu'", "Tiba-tiba kirim video random", "Perhatiin hal kecil yang jarang orang sadarin"],
            a: 2
        },
        {
            q: "❤️ Siapa orang paling spesial di dunia Wendy?",
            options: ["Rahasia deh", "Aplia, dong", "Sudah tau lah ya"],
            a: 1
        }
    ];

    let index = 0;
    let selected = null;

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
            finishLevel();
        }
    };

    container.append(progress, questionEl, optionsEl, feedback, btnNext);
    document.getElementById("gameContent").innerHTML = "";
    document.getElementById("gameContent").appendChild(container);

    renderQuestion();
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
tapi mencintaimu adalah hal paling indah
yang pernah aku lakukan.

Terima kasih sudah hadir,
tertawa bersamaku,
dan tetap di sampingku.

Aku sayang kamu, selalu. ❤️`
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

