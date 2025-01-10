document.addEventListener("DOMContentLoaded", () => {
  const appGrid = document.getElementById("app-grid");

  const apps = [
    { name: "App 1", description: "A great app", img: "https://via.placeholder.com/100" },
    { name: "App 2", description: "Another cool app", img: "https://via.placeholder.com/100" },
    { name: "App 3", description: "An awesome app", img: "https://via.placeholder.com/100" },
    { name: "App 4", description: "Yet another app", img: "https://via.placeholder.com/100" },
  ];

  function renderApps(appList) {
    appGrid.innerHTML = "";
    appList.forEach(app => {
      const appCard = document.createElement("div");
      appCard.classList.add("app-card");
      appCard.innerHTML = `
        <img src="${app.img}" alt="${app.name}">
        <h3>${app.name}</h3>
        <p>${app.description}</p>
      `;
      appGrid.appendChild(appCard);
    });
  }

  const searchInput = document.getElementById("search-input");
  const searchBtn = document.getElementById("search-btn");

  searchBtn.addEventListener("click", () => {
    const query = searchInput.value.toLowerCase();
    const filteredApps = apps.filter(app => app.name.toLowerCase().includes(query));
    renderApps(filteredApps);
  });

  renderApps(apps);
});
