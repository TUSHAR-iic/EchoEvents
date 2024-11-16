// Get today's date
const today = new Date();

// Utility function to format date as "Day, DD MMM"
function formatDate(date) {
  const options = { weekday: 'short', day: '2-digit', month: 'short' };
  return date.toLocaleDateString('en-US', options);
}

// Calculate dates for events
const events = [
  { title: "Today", date: formatDate(today) },
  { title: "Tomorrow", date: formatDate(new Date(today.getTime() + 24 * 60 * 60 * 1000)) },
  { title: "Weekend", date: `${formatDate(new Date(today.getTime() + (6 - today.getDay()) * 24 * 60 * 60 * 1000))} – ${formatDate(new Date(today.getTime() + (7 - today.getDay()) * 24 * 60 * 60 * 1000))}` }
];

// Populate events
const newEventsContainer = document.getElementById("new-events-container");

events.forEach(event => {
  const newEventCard = document.createElement("div");
  newEventCard.className = "new-event-card";

  newEventCard.innerHTML = `
    <h3>${event.title}</h3>
    <p class="new-date">${event.date}</p>
  `;

  newEventsContainer.appendChild(newEventCard);
});
