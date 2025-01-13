let currentSection = "applications"; // Default section

// Fetch and render apps from the specified JSON file
function loadApps(section) {
  fetch(`./${section}.json`)
    .then(response => {
      if (!response.ok) throw new Error(`Failed to load ${section}.json`);
      return response.json();
    })
    .then(data => {
      clearAppSections(); // Clear the existing apps
      renderAppSections(data.sections);
    })
    .catch(error => console.error('Error:', error));
}

// Clear existing app sections
function clearAppSections() {
  const appSections = document.getElementById('app-sections');
  appSections.innerHTML = ""; // Remove all children
}

// Render app sections dynamically
function renderAppSections(sections) {
  const appSections = document.getElementById('app-sections');

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
      img.src = `icon/${app.name}.png`; // Directly using app name from JSON
      img.alt = `${app.name} icon`;
      img.classList.add('app-icon');
      img.addEventListener('click', () => openAppPage(app.name)); // Add click event to icon

      // Add app name
      const appName = document.createElement('p');
      appName.textContent = app.name;
      appName.addEventListener('click', () => openAppPage(app.name)); // Add click event to app name

      // Add click event to the app border
      appDiv.addEventListener('click', () => openAppPage(app.name)); // Add click event to app div

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
  // Prevent triggering actions on text clicks
  if (event.detail > 0) {
    event.preventDefault();
  }
});

document.addEventListener('contextmenu', (event) => {
  // Prevent right-click menu on text
  event.preventDefault();
});

// Set default active section to Apps and handle section selection
window.addEventListener('DOMContentLoaded', () => {
  // Load the default section
  loadApps(currentSection);

  // Add event listeners to navigation items
  document.getElementById('apps-nav').addEventListener('click', () => setActiveSection('apps-nav', 'applications'));
  document.getElementById('games-nav').addEventListener('click', () => setActiveSection('games-nav', 'games'));
  document.getElementById('updates-nav').addEventListener('click', () => setActiveSection('updates-nav', 'updates'));
});

// Function to set the active section and load corresponding apps
function setActiveSection(sectionId, sectionName) {
  if (currentSection === sectionName) return; // Prevent reloading the same section

  currentSection = sectionName; // Update the current section

  // Remove active class from all sections
  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(item => item.classList.remove('active'));

  // Add active class to the clicked section
  const activeNavItem = document.getElementById(sectionId);
  activeNavItem.classList.add('active');

  // Load apps from the selected section's JSON file
  loadApps(sectionName);
}
