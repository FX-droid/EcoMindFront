const API_URL = "https://ecomind-rcco.onrender.com/api/data";
const container = document.getElementById("mahalla-container");

async function loadMahallas() {
    try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error(`Server xatosi: ${res.status}`);
        const data = await res.json();

        container.innerHTML = "";

        data.forEach(m => {
            const card = document.createElement("div");
            card.className = "card";

            card.innerHTML = `
        <h3 class="mahalla-name">${m.mahalla} mahallasi</h3>
        <div class="details" style="display:none;">
          <p>💧 Havzasida qolgan suv: ${m.tank} L</p>
          <p>🏢 Turar-joy majmuasi: ${m.apartment} L</p>
          <p>🚗 Moyka: ${m.carwash} L</p>
          <p>🍔 Fast food joyi: ${m.fastfood} L</p>
          <p>🔁 Qayta ishlangan suv: ${m.recycled} L</p>
          <p>⏱ So‘nggi yangilanish: ${new Date(m.last_update).toLocaleString()}</p>
        </div>
      `;

            // Card bosilganda details toggle qilinsin
            card.querySelector(".mahalla-name").addEventListener("click", () => {
                const details = card.querySelector(".details");
                if (details.style.display === "none") {
                    details.style.display = "block";
                } else {
                    details.style.display = "none";
                }
            });

            container.appendChild(card);
        });
    } catch (err) {
        container.innerHTML = "<p style='color:red;'>Mahalla ma’lumotlarini yuklashda xatolik!</p>";
        console.error(err);
    }
}

loadMahallas();
