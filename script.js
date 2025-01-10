function changeTab(tabName) {
  // Get all nav items and remove the "active" class
  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(item => item.classList.remove('active'));

  // Add the "active" class to the selected tab
  const activeTab = document.querySelector(`.nav-item:contains(${tabName})`);
  activeTab.classList.add('active');
}

// Set the default active tab (optional)
document.querySelector('.nav-item').classList.add('active');
