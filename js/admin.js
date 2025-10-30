const API_BASE = "https://ecomind-rcco.onrender.com";

// Login
const loginForm = document.getElementById("login-form");
const loginSection = document.getElementById("login-section");
const adminSection = document.getElementById("admin-section");
const loginError = document.getElementById("login-error");

loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Static login
    if (username === "EcoMind" && password === "SmartMahalla") {
        loginSection.style.display = "none";
        adminSection.style.display = "block";
        loadMahallas();
    } else {
        loginError.textContent = "❌ Name yoki Password noto‘g‘ri!";
    }
});

// Admin panel – Mahalla qo‘shish
const form = document.getElementById("add-form");
const list = document.getElementById("mahalla-list");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const mahalla = document.getElementById("mahalla").value;
    const tank = document.getElementById("tank").value;

    if (!mahalla || !tank) return alert("Iltimos, barcha maydonlarni to‘ldiring!");

    const newData = {
        mahalla,
        tank: Number(tank),
        apartment: 0,
        carwash: 0,
        fastfood: 0,
        recycled: 0,
        last_update: new Date()
    };

    try {
        const res = await fetch(`${API_BASE}/api/data`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newData)
        });

        if (res.ok) {
            alert("✅ Mahalla qo‘shildi!");
            form.reset();
            loadMahallas();
        } else {
            alert("❌ Ma’lumot yuborilmadi!");
        }
    } catch (err) {
        alert("Server bilan aloqa yo‘q!");
        console.error(err);
    }
});

// Load Mahallas
async function loadMahallas() {
    try {
        const res = await fetch(`${API_BASE}/api/data`);
        if (!res.ok) throw new Error(`Server xatosi: ${res.status}`);
        const data = await res.json();

        list.innerHTML = "";
        data.forEach(m => {
            const li = document.createElement("li");
            li.textContent = `${m.mahalla} – Tank: ${m.tank} L`;
            list.appendChild(li);
        });
    } catch (err) {
        list.innerHTML = "<p>Xatolik: ma’lumot yuklanmadi!</p>";
        console.error(err);
    }
}
