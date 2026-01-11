const initialEvents = [
  {
    name: "AI & Machine Learning Seminar",
    date: "2026-03-10",
    description:
      "An introductory seminar on Artificial Intelligence and Machine Learning for CS students.",
  },
  {
    name: "Final Year Project Orientation",
    date: "2026-02-20",
    description:
      "Guidelines, evaluation criteria, and supervisor allocation for final year students.",
  },
  {
    name: "Sports Week Opening Ceremony",
    date: "2026-02-01",
    description:
      "Kick-off ceremony for the annual inter-department sports competition.",
  },
];

let events = [...initialEvents];

const eventsList = document.getElementById("eventsList");
const eventForm = document.getElementById("eventForm");
const searchInput = document.getElementById("searchInput");
const searchStatus = document.getElementById("searchStatus");
const formWarning = document.getElementById("formWarning");

const today = () => new Date().toISOString().slice(0, 10);

function renderEvents() {
  eventsList.innerHTML = "";
  const term = searchInput.value.toLowerCase().trim();

  let filtered = [...events].sort((a, b) =>
    a.date.localeCompare(b.date)
  );

  if (term) {
    filtered = filtered.filter(
      (e) =>
        e.name.toLowerCase().includes(term) ||
        e.date.includes(term)
    );
    searchStatus.textContent = `${filtered.length} activity(s) found`;
  } else {
    searchStatus.textContent = "";
  }

  filtered.forEach((event) => {
    const card = document.createElement("div");
    card.className = `event-card ${
      event.date < today() ? "past" : "upcoming"
    }`;

    card.innerHTML = `
      <h3>${event.name}</h3>
      <div class="date">Scheduled on: ${event.date}</div>
      <p>${event.description}</p>
      <button>Remove</button>
    `;

    card.querySelector("button").onclick = () => {
      events = events.filter(
        (e) => !(e.name === event.name && e.date === event.date)
      );
      renderEvents();
    };

    eventsList.appendChild(card);
  });
}

eventForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = eventName.value.trim();
  const date = eventDate.value;
  const desc = eventDescription.value.trim();

  if (!name || !date || !desc) {
    formWarning.hidden = false;
    return;
  }

  formWarning.hidden = true;
  events.push({ name, date, description: desc });
  eventForm.reset();
  renderEvents();
});

searchInput.addEventListener("input", renderEvents);

document.getElementById("copyrightYear").textContent =
  new Date().getFullYear();

renderEvents();
