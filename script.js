// Function to fetch and render apps dynamically from JSON files
function fetchAndRenderApps(section) {
  const jsonFile = `./${section}.json`; // Use the selected section's JSON file
  fetch(jsonFile)
    .then(response => {
      if (!response.ok) throw new Error(`Failed to load ${section}.json`);
      return response.json();
    })
    .then(data => renderAppSections(data.sections))
    .catch(error => console.error('Error:', error));
}

// Render app sections dynamically
function renderAppSections(sections) {
  const appSections = document.getElementById('app-sections');
  appSections.innerHTML = ''; // Clear existing apps before rendering

  sections.forEach(section => {
    // Create section container
    const sectionDiv = document.createElement('div');
    sectionDiv.classList.add('section');

    // Add section title
    const title = document.createElement('h2');
    title.textContent = section.title;
    sectionDiv.appendChild(title);

    // Add scrollable container
    const scrollableContainer = document.createElement('div');
    scrollableContainer.classList.add('scrollable-container');

    // Add apps
    section.apps.forEach(app => {
      const appDiv = document.createElement('div');
      appDiv.classList.add('app');

      // Add app icon (from icons directory)
      const img = document.createElement('img');
      img.src = `icon/${app.name}.png`;
      img.alt = `${app.name} icon`;
      img.classList.add('app-icon');
      img.addEventListener('click', () => openAppPage(app.name));

      // Add app name
      const appName = document.createElement('p');
      appName.textContent = app.name;
      appName.addEventListener('click', () => openAppPage(app.name));

      // Add click event to the app border
      appDiv.addEventListener('click', () => openAppPage(app.name));

      appDiv.appendChild(img);
      appDiv.appendChild(appName);
      scrollableContainer.appendChild(appDiv);
    });

    sectionDiv.appendChild(scrollableContainer);
    appSections.appendChild(sectionDiv);
  });
}

// Open app page function
function openAppPage(appName) {
  // Redirect to app page
  window.location.href = `apps/${appName}.html`;
}

// Disable text selection and clicks triggering search popups
document.addEventListener('mousedown', (event) => {
  if (event.detail > 0) {
    event.preventDefault();
  }
});

document.addEventListener('contextmenu', (event) => {
  event.preventDefault();
});

// Set default active section to Apps and handle section selection
window.addEventListener('DOMContentLoaded', () => {
  // Set default section to "apps" and load its content
  setActiveSection('apps-nav', 'apps');
});

// Function to set the active section
function setActiveSection(sectionId, section) {
  // Remove active class from all sections
  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(item => item.classList.remove('active'));

  // Add active class to the clicked section
  const activeNavItem = document.getElementById(sectionId);
  activeNavItem.classList.add('active');

  // Fetch and render apps for the selected section
  fetchAndRenderApps(section);
}

// Add event listeners to navigation items
document.getElementById('apps-nav').addEventListener('click', () => setActiveSection('apps-nav', 'apps'));
document.getElementById('games-nav').addEventListener('click', () => setActiveSection('games-nav', 'games'));
document.getElementById('updates-nav').addEventListener('click', () => setActiveSection('updates-nav', 'updates'));
