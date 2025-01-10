// Load JSON data from <script> tags
function loadJSON(fileName) {
  const scriptTag = document.querySelector(`script[src="${fileName}"]`);
  return scriptTag ? JSON.parse(scriptTag.textContent) : [];
}

// JSON data for tabs (loaded from JSON files)
const data = {
  games: loadJSON("games.json"),
  apps: loadJSON("apps.json"),
  movies: loadJSON("movies.json")
};

// Load the apps dynamically based on the selected tab
function loadApps(tabName) {
  const appGrid = document.getElementById("app-grid");
  const sectionTitle = document.getElementById("section-title");

  // Update the section title
  sectionTitle.textContent = tabName.charAt(0).toUpperCase() + tabName.slice(1);

  // Clear the existing apps
  appGrid.innerHTML = "";

  // Get the data for the selected tab
  const apps = data[tabName];
  if (!apps || apps.length === 0) {
    appGrid.innerHTML = `<p>No data available for ${tabName}.</p>`;
    return;
  }

  // Populate the grid with apps
  apps.forEach((app) => {
    const appCard = document.createElement("div");
    appCard.className = "app-card";
    appCard.innerHTML = `
      <img src="${app.icon}" alt="${app.name}">
      <h3>${app.name}</h3>
      <p>${app.description}</p>
    `;
    appGrid.appendChild(appCard);
  });
}

// Handle tab changes
function changeTab(tabName) {
  const navItems = document.querySelectorAll(".nav-item");
  navItems.forEach((item) => item.classList.remove("active"));

  const activeTab = Array.from(navItems).find(
    (item) => item.textContent.toLowerCase() === tabName
  );
  if (activeTab) activeTab.classList.add("active");

  // Load apps for the selected tab
  loadApps(tabName);
}

// Load the default tab ("Games") on page load
document.addEventListener("DOMContentLoaded", () => {
  loadApps("games");
});
