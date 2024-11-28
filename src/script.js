// Get today's date
const today = new Date();

// Utility function to format a date as "Day, DD MMM YYYY"
function formatDate(date) {
  const options = { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' };
  return date.toLocaleDateString('en-US', options);
}

// Example list of events with start and end dates
const events = JSON.parse(localStorage.getItem("events")) || [
  {
    title: "TechFest",
    startDate: new Date(today.getTime() + 2 * 24 * 60 * 60 * 1000), // Two days from now
    endDate: new Date(today.getTime() + 4 * 24 * 60 * 60 * 1000), // Four days from now
    eventType: "Tech",
    eventMode: "In-person",
    eventImage: "techfest.jpg",
  },
  {
    title: "Music Marathon",
    startDate: new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000), // A week from now
    endDate: new Date(today.getTime() + 10 * 24 * 60 * 60 * 1000), // Ten days from now
    eventType: "Music",
    eventMode: "Online",
    eventImage: "music-marathon.jpg",
  },
  {
    title: "Art Exhibition",
    startDate: new Date(today.getTime() + 15 * 24 * 60 * 60 * 1000), // Fifteen days from now
    endDate: new Date(today.getTime() + 45 * 24 * 60 * 60 * 1000), // A month from now
    eventType: "Cultural",
    eventMode: "In-person",
    eventImage: "art-exhibition.jpg",
  },
];

// Populate the Featured Events section
const eventsGrid = document.getElementById("events-grid");

// Function to load events
function loadEvents() {
  eventsGrid.innerHTML = ""; // Clear the grid

  events.forEach((event, index) => {
    const eventCard = document.createElement("div");
    eventCard.className = "event-card";

    const startDateFormatted = formatDate(new Date(event.startDate));
    const endDateFormatted = formatDate(new Date(event.endDate));

    // Event card HTML
    eventCard.innerHTML = `
      <div class="event-tag">${event.eventType}</div>
      <img src="${event.eventImage || 'default-event.jpg'}" alt="${event.title}">
      <div class="event-info">
        <h3>${event.title}</h3>
        <p><span>${startDateFormatted}</span> to <span>${endDateFormatted}</span></p>
        <p>${event.eventMode}</p>
        <button>DOWNLOAD IMAGE</button>
        ${
          userType === "admin"
            ? `<button class="delete-event" data-index="${index}">Delete</button>`
            : ""
        }
      </div>
    `;

    eventsGrid.appendChild(eventCard);
  });

  // Add event listeners to delete buttons (only for admins)
  if (userType === "admin") {
    document.querySelectorAll(".delete-event").forEach((button) => {
      button.addEventListener("click", (e) => {
        const index = e.target.getAttribute("data-index");
        deleteEvent(index);
      });
    });
  }
}


function enableImageDownload() {
  document.querySelectorAll('.event-card').forEach((card) => {
    const downloadButton = card.querySelector('button');
    const image = card.querySelector('img');

    downloadButton.addEventListener('click', () => {
      const imageUrl = image.src; // Get the image source URL
      const link = document.createElement('a'); // Create a temporary anchor element
      link.href = imageUrl; // Set the href to the image URL
      link.download = image.alt || 'event-image'; // Set the download attribute to the image's alt text or default name
      link.click(); // Programmatically click the link to trigger the download
      link.remove(); // Clean up the link element
    });
  });
}
// Add event listeners to genre buttons
document.querySelectorAll('.genre-btn').forEach((button) => {
  button.addEventListener('click', () => {
    const selectedGenre = button.getAttribute('data-genre');
    const eventCards = document.querySelectorAll('.event-card');
    const filteredEventsContainer = document.getElementById('filtered-events');

    // Clear previous filtered results
    filteredEventsContainer.innerHTML = '';

    eventCards.forEach((card) => {
      const eventTag = card.querySelector('.event-tag').textContent;

      // If genre matches or "All" is selected, clone and display the event card
      if (selectedGenre === 'All' || eventTag === selectedGenre) {
        const clonedCard = card.cloneNode(true);
        filteredEventsContainer.appendChild(clonedCard);
      }
    });

    // If no matching events, display a message
    if (!filteredEventsContainer.hasChildNodes()) {
      filteredEventsContainer.innerHTML = '<p>No events found for this genre.</p>';
    }
  });
});
// Load events when the page loads
window.onload = loadEvents;

const signInButton = document.querySelector('.sign-in');
const userType = localStorage.getItem('userType');

if (userType) {
  signInButton.textContent = 'Sign Out';
  signInButton.addEventListener('click', () => {
    localStorage.removeItem('userType');
    alert('You have been signed out.');
    window.location.reload();
  });
} else {
  signInButton.addEventListener('click', () => {
    window.location.href = 'login.html';
  });
}

// Function to delete an event
function deleteEvent(index) {
  if (confirm('Are you sure you want to delete this event?')) {
    event.splice(index, 1); // Remove event from array
    localStorage.setItem('events', JSON.stringify(event)); // Update localStorage
    loadEvents(); // Reload the events
    alert('Event deleted successfully!');
  }
}

  
  // Load events when the page loads
  window.onload = () => {
    loadEvents(); // Load events
    enableImageDownload(); // Enable image download functionality
  };
  

  function smoothScroll(linkId, targetId) {
    const link = document.getElementById(linkId);
    const target = document.getElementById(targetId);
  
    link.addEventListener('click', (e) => {
      e.preventDefault(); // Prevent default behavior
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }
  
  // Use the function for the links
  smoothScroll('events-link', 'events-grid');       // Events
  smoothScroll('contact-link', 'footer');          // Contact
  smoothScroll('review-link', 'review-section');   // Review
  