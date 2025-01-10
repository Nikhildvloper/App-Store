function changeTab(tab) {
  const tabs = document.querySelectorAll('.tab');
  const indicator = document.querySelector('.tabs-indicator');
  
  // Remove active class from all tabs
  tabs.forEach(t => t.classList.remove('active'));
  
  // Add active class to the clicked tab
  tab.classList.add('active');
  
  // Slide the indicator to the selected tab's position
  const tabOffset = tab.offsetLeft;
  indicator.style.transform = `translateX(${tabOffset}px)`;
}

// Initialize the first tab as active
document.querySelector('.tab').classList.add('active');
changeTab(document.querySelector('.tab')); // Set the initial indicator position
