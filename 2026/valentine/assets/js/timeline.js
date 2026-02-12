/* ======================
   TIMELINE
====================== */
const timelineData = [
    {
        date: "Desember 2024",
        icon: "💕",
        title: "Pertemuan Pertama",
        desc: "Hari kenalan kita di aplikasi itu. Kamu bilang kamu ambivert, dan kamu satu-satunya yang profilnya belum expired. Siapa sangka dari situ, semua jadi berbeda."
    },
    {
        date: "Februari 2025",
        icon: "🌸",
        title: "Jalan Pertama Kita",
        desc: "Kamu ketawa lepas sambil angkat sepatumu yang kerendem air. Detik itu aku tau — aku mau terus dengerin tawamu, lihat senyummu, bahkan di momen kacau sekalipun."
    },
    {
        date: "April 2025",
        icon: "💕",
        title: "Hari Kita Resmi",
        desc: "Kamu bilang 'iya', dan duniaku langsung jadi lebih berwarna. Dari hari itu, setiap detik bersamamu terasa istimewa."
    },
    {
        date: "September 2025",
        icon: "🌙",
        title: "Ngobrol Sampai Pagi",
        desc: "Kita cerita tentang mimpi, ketakutan, dan harapan masa depan. Malam itu ngobrol sampai pagi, dan aku ngerasa akhirnya punya 'rumah' — di hatimu."
    },
    {
        date: "Hari Ini",
        icon: "❤️",
        title: "Cerita Kita Masih Berlanjut",
        desc: "Setiap hari bersamamu adalah halaman baru yang aku syukuri. Terima kasih sudah jadi bagian terbaik dari hidupku, sayang."
    }
];

function startTimeline() {
    const timeline = document.getElementById("timeline");
    timeline.innerHTML = "";

    timelineData.forEach((item, i) => {
        const div = document.createElement("div");
        div.className = "timeline-item";

        div.innerHTML = `
            <div class="timeline-content">
                <div class="timeline-date">${item.date}</div>
                <div class="timeline-title">${item.title}</div>
                <div class="timeline-desc">${item.desc}</div>
            </div>
            <div class="timeline-dot"></div>
            <span class="timeline-icon">${item.icon}</span>
        `;

        timeline.appendChild(div);

        // Muncul satu per satu dengan delay
        setTimeout(() => {
            div.classList.add("show");
        }, 300 * (i + 1));
    });
}