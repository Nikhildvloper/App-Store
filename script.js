// Load the apps dynamically based on the selected tab
async function loadApps(tabName) {
  const appGrid = document.getElementById('app-grid');
  const sectionTitle = document.getElementById('section-title');

  // Update the section title
  sectionTitle.textContent = tabName.charAt(0).toUpperCase() + tabName.slice(1);

  // Clear the existing apps
  appGrid.innerHTML = '';

  try {
    // Fetch the JSON data for the selected tab
    const response = await fetch(`${tabName}.json`);
    if (!response.ok) throw new Error('Failed to load data');
    const apps = await response.json();

    // Populate the grid with apps
    apps.forEach(app => {
      const appCard = document.createElement('div');
      appCard.className = 'app-card';
      appCard.innerHTML = `
        <img src="${app.icon}" alt="${app.name}">
        <h3>${app.name}</h3>
        <p>${app.description}</p>
      `;
      appGrid.appendChild(appCard);
    });
  } catch (error) {
    appGrid.innerHTML = `<p>Error loading apps. Please try again later.</p>`;
    console.error(error);
  }
}

// Handle tab changes
function changeTab(tabName) {
  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(item => item.classList.remove('active'));

  const activeTab = Array.from(navItems).find(item => item.textContent.toLowerCase() === tabName);
  if (activeTab) activeTab.classList.add('active');

  // Load apps for the selected tab
  loadApps(tabName);
}

// Load the default tab ("Games") on page load
document.addEventListener('DOMContentLoaded', () => {
  loadApps('games');
});
