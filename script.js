
document.getElementById("loadBtn").addEventListener("click", () => {
  fetch("https://hook.eu2.make.com/YOUR_WEBHOOK") // vervangen door werkende URL
    .then(res => res.json())
    .then(data => {
      const tbody = document.getElementById("tableBody");
      const plaatsSet = new Set();
      const voorkeurSet = new Set();
      tbody.innerHTML = "";
      data.forEach(entry => {
        plaatsSet.add(entry.plaats);
        let voorkeuren = [];
        for (let i = 1; i <= 4; i++) {
          voorkeuren = voorkeuren.concat(entry["voorkeur_" + i] || []);
        }
        voorkeuren.forEach(v => voorkeurSet.add(v));
        const row = document.createElement("tr");
        row.innerHTML = `<td>${entry.naam}</td><td>${entry.email}</td><td>${entry.plaats}</td><td>${voorkeuren.join(", ")}</td>`;
        tbody.appendChild(row);
      });

      const plaatsFilter = document.getElementById("placeFilter");
      const voorkeurFilter = document.getElementById("preferenceFilter");
      plaatsFilter.innerHTML = "<option value=''>-- Alles --</option>";
      voorkeurFilter.innerHTML = "<option value=''>-- Alles --</option>";
      plaatsSet.forEach(p => plaatsFilter.innerHTML += `<option value="${p}">${p}</option>`);
      voorkeurSet.forEach(v => voorkeurFilter.innerHTML += `<option value="${v}">${v}</option>`);
    });
});
