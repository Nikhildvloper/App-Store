// Function to load apps from a given category (games, apps, movies)
function loadApps(category) {
  const sectionTitle = document.getElementById("section-title");
  const appGrid = document.getElementById("app-grid");

  // Set the title based on the selected category
  sectionTitle.textContent = category.charAt(0).toUpperCase() + category.slice(1);

  // Clear any previous apps
  appGrid.innerHTML = "";

  // Fetch the appropriate JSON file based on category
  fetch(`${category}.json`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Failed to load ${category}.json`);
      }
      return response.json();
    })
    .then(data => {
      // Loop through the data and display each app in a card
      data.forEach(app => {
        const appCard = document.createElement("div");
        appCard.className = "app-card";

        appCard.innerHTML = `
          <img src="${app.image}" alt="${app.name}">
          <h3>${app.name}</h3>
          <p>${app.description}</p>
        `;

        appGrid.appendChild(appCard);
      });
    })
    .catch(error => {
      console.error("Error loading apps:", error);
      appGrid.innerHTML = "<p>Failed to load apps. Please try again later.</p>";
    });
}

// Handle the click event for tab buttons
function changeTab(tabName) {
  // Remove the 'active' class from all buttons
  const buttons = document.querySelectorAll(".nav-button");
  buttons.forEach(button => button.classList.remove("active"));

  // Add 'active' class to the clicked button
  const activeButton = Array.from(buttons).find(button =>
    button.textContent.trim().toLowerCase() === tabName
  );
  if (activeButton) activeButton.classList.add("active");

  // Load apps based on the selected category
  loadApps(tabName);
}

// Default tab loading on page load
document.addEventListener("DOMContentLoaded", () => {
  loadApps("games");  // Default tab is 'games'
});
