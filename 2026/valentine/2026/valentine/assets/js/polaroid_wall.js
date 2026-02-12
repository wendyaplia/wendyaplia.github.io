/* ======================
   POLAROID WALL
====================== */
const polaroids = [
    { src: "assets/images/1.jpeg", caption: "Senyummu favoritku 🌸" },
    { src: "assets/images/2.jpeg", caption: "Hari paling bahagia 💕" },
    { src: "assets/images/3.jpeg", caption: "Selalu bersama ❤️" },
    { src: "assets/images/4.jpeg", caption: "Dahulu yang indah 🌼" },
    { src: "assets/images/5.jpeg", caption: "Sekarang dan selamanya 💖" },
    { src: "assets/images/6.jpeg", caption: "Sampai tua nanti 🌙" }
];

// Rotasi random tapi tidak terlalu miring
const rotations = [-4, 3, -2, 5, -3, 4];

function startPolaroid() {
    const wall = document.getElementById("polaroidWall");
    wall.innerHTML = "";

    polaroids.forEach((item, i) => {
        const polaroid = document.createElement("div");
        polaroid.className = "polaroid";
        polaroid.style.setProperty("--rotate", rotations[i] + "deg");

        polaroid.innerHTML = `
            <img src="${item.src}" alt="Memory ${i + 1}">
            <p class="polaroid-caption">${item.caption}</p>
        `;

        wall.appendChild(polaroid);

        // Muncul satu per satu
        setTimeout(() => {
            polaroid.classList.add("show");
        }, 200 * (i + 1));

        setTimeout(() => {
            document.getElementById("btn-wish").classList.remove("hidden");
        }, 500);


    });
}