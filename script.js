document.addEventListener("DOMContentLoaded", () => {
  const navItems = document.querySelectorAll(".nav-item");
  const appSections = document.getElementById("app-sections");

  // Set default section to "apps"
  let currentSection = "apps";
  setActiveSection(`${currentSection}-nav`);
  loadApps(currentSection);

  // Add click event listeners to navigation items
  navItems.forEach((item) => {
    item.addEventListener("click", () => {
      const section = item.dataset.section;

      if (section !== currentSection) {
        currentSection = section;
        setActiveSection(`${currentSection}-nav`);
        loadApps(currentSection);
      }
    });
  });

  // Function to load apps from JSON file based on the section
  function loadApps(section) {
    fetch(`./${section}.json`)
      .then((response) => {
        if (!response.ok) throw new Error(`Failed to load ${section}.json`);
        return response.json();
      })
      .then((data) => renderAppSections(data.sections))
      .catch((error) => console.error("Error loading apps:", error));
  }

  // Render app sections dynamically
  function renderAppSections(sections) {
    appSections.innerHTML = ""; // Clear previous content

    sections.forEach((section) => {
      const sectionDiv = document.createElement("div");
      sectionDiv.classList.add("section");

      // Add section title
      const title = document.createElement("h2");
      title.textContent = section.title;
      sectionDiv.appendChild(title);

      // Create scrollable container for apps
      const scrollableContainer = document.createElement("div");
      scrollableContainer.classList.add("scrollable-container");

      // Add apps to the container
      section.apps.forEach((app) => {
        const appDiv = document.createElement("div");
        appDiv.classList.add("app");

        // Add app icon
        const img = document.createElement("img");
        img.src = `icon/${app.name}.png`;
        img.alt = `${app.name} icon`;
        img.classList.add("app-icon");

        // Add app name
        const appName = document.createElement("p");
        appName.textContent = app.name;

        // Add click event to open app page
        appDiv.addEventListener("click", () => {
          window.location.href = `apps/${app.name}.html`;
        });

        appDiv.appendChild(img);
        appDiv.appendChild(appName);
        scrollableContainer.appendChild(appDiv);
      });

      sectionDiv.appendChild(scrollableContainer);
      appSections.appendChild(sectionDiv);
    });
  }

  // Set active section and update navigation styles
  function setActiveSection(sectionId) {
    navItems.forEach((item) => item.classList.remove("active"));
    const activeNavItem = document.getElementById(sectionId);
    activeNavItem.classList.add("active");
  }
});
