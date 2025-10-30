const API_URL = "https://ecomind-rcco.onrender.com/api/rating";

async function loadRatings() {
    try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error(`Server xatosi: ${res.status}`);

        const data = await res.json();

        const tbody = document.getElementById("rating-body");
        tbody.innerHTML = "";

        data.forEach((m, index) => {
            const oldTank = m.tankOld || m.tank;   // tankOld bo'lmasa tankni ishlat
            const usedPercent = oldTank > 0
                ? (((oldTank - m.tank) / oldTank) * 100).toFixed(1)
                : 0;

            const tr = document.createElement("tr");
            tr.innerHTML = `
        <td>${index + 1}</td>
        <td><a href="mahalla.html?name=${m.mahalla}">${m.mahalla}</a></td>
        <td>${usedPercent}%</td>
        <td>${m.tank} L</td>
      `;
            tbody.appendChild(tr);
        });
    } catch (err) {
        console.error(err);
        document.getElementById("rating-body").innerHTML = "<tr><td colspan='4'>Ma’lumot yuklanmadi!</td></tr>";
    }
}

loadRatings();
