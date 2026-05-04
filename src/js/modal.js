
const API_KEY = "Q8bHL81HES4CjxatVZAVSQWYyAffYhbQ";

const list = document.querySelector(".events-list");
const pagination = document.getElementById("pagination");

const modal = document.querySelector("[data-modal]");
const modalWrap = document.querySelector(".modal__wrap");
const closeBtn = document.querySelector("[data-close]");
const body = document.body;

let currentPage = 0;
let totalPages = 0;


async function loadEvents(page = 0) {
  const url = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${API_KEY}&countryCode=US&size=20&page=${page}`;
  const response = await fetch(url);
  const data = await response.json();

  const events = data._embedded?.events || [];
  totalPages = Math.min(data.page?.totalPages || 0, 29);
  currentPage = page;

  renderEvents(events);
  renderPagination();
}


function renderEvents(events) {
  const markup = events.map(ev => `
    <li class="event-card" data-id="${ev.id}">
      <img class="event-img" src="${ev.images?.[0]?.url || ''}" alt="${ev.name}">
      <h3 class="event-title">${ev.name}</h3>
      <p class="event-date">${ev.dates?.start?.localDate || ''}</p>
      <p class="event-place">${ev._embedded?.venues?.[0]?.name || ''}</p>
    </li>
  `).join("");

  list.innerHTML = markup;
}


function renderPagination() {
  pagination.innerHTML = "";
  const maxVisible = 5;
  let start = Math.max(0, currentPage - 2);
  let end = Math.min(totalPages, start + maxVisible);
  if (end - start < maxVisible) start = Math.max(0, end - maxVisible);

  for (let i = start; i < end; i++) {
    const btn = document.createElement("button");
    btn.className = "page-btn";
    btn.textContent = i + 1;
    if (i === currentPage) btn.classList.add("active");
    btn.addEventListener("click", () => loadEvents(i));
    pagination.appendChild(btn);
  }

  if (end < totalPages) {
    const dots = document.createElement("span");
    dots.textContent = "...";
    dots.className = "dots";
    pagination.appendChild(dots);

    const last = document.createElement("button");
    last.className = "page-btn";
    last.textContent = totalPages;
    last.addEventListener("click", () => loadEvents(totalPages - 1));
    pagination.appendChild(last);
  }
}


list.addEventListener("click", async e => {
  const card = e.target.closest(".event-card");
  if (!card) return;

  const id = card.dataset.id;
  const response = await fetch(`https://app.ticketmaster.com/discovery/v2/events/${id}.json?apikey=${API_KEY}`);
  const ev = await response.json();

  modalWrap.innerHTML = createModalMarkup(ev);
  modal.classList.remove("backdrop-hidden");
  body.classList.add("no-scroll");
});


closeBtn.addEventListener("click", closeModal);
modal.addEventListener("click", e => { if (!e.target.closest(".modal")) closeModal(); });
document.addEventListener("keydown", e => { if (e.code === "Escape") closeModal(); });

function closeModal() {
  modal.classList.add("backdrop-hidden");
  body.classList.remove("no-scroll");
}


function createModalMarkup(ev) {
  return `
    <img class="modal__preview" src="${ev.images?.[0]?.url || ''}" />

    <div class="content">
      <img class="content__image" src="${ev.images?.[0]?.url || ''}" />

      <ul class="content__list">

        <li>
          <h2 class="modal__title">INFO</h2>
          <p class="modal__text">${ev.info || "No information"}</p>
        </li>

        <li>
          <h2 class="modal__title">WHEN</h2>
          <p class="modal__text">${ev.dates?.start?.localDate || ""}</p>
          <p class="modal__text">${ev.dates?.start?.localTime || ""}</p>
        </li>

        <li>
          <h2 class="modal__title">WHERE</h2>
          <p class="modal__text">${ev._embedded?.venues?.[0]?.city?.name || ""}</p>
          <p class="modal__text">${ev._embedded?.venues?.[0]?.name || ""}</p>
        </li>

        <li>
          <h2 class="modal__title">WHO</h2>
          <p class="modal__text">${ev.name || ""}</p>
        </li>

        <li class="modal__pric">
          <h2 class="modal__title">PRICES</h2>

          <div class="price__wrap">
          <svg class="price__icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 29 20"><path d="M3.22 0H0v19.33h3.22zm8.11 0H8.1v19.33h3.23zm4.88 0h-3.22v19.33h3.22zM29 0h-4.78v19.33H29zM6.44 0H4.88v19.33h1.56zm12.89 0h-1.56v19.33h1.56zm3.23 0h-1.57v19.33h1.57z" fill="#0E0E0E"/></svg>
            <p class="modal__text">Standart 300-500 UAH</p>
            
          </div>

          <a class="modal__btn" href="${ev.url || '#'}" target="_blank">
            BUY TICKETS
          </a>

          <div class="price__wrap">
            <svg class="price__icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 29 20"><path d="M3.22 0H0v19.33h3.22zm8.11 0H8.1v19.33h3.23zm4.88 0h-3.22v19.33h3.22zM29 0h-4.78v19.33H29zM6.44 0H4.88v19.33h1.56zm12.89 0h-1.56v19.33h1.56zm3.23 0h-1.57v19.33h1.57z" fill="#0E0E0E"/></svg>
            <p class="modal__text">VIP 1000-1500 UAH</p>
          </div>

          <a class="modal__btn" href="${ev.url || '#'}" target="_blank">
            BUY TICKETS
          </a>

        </li>

      </ul>
    </div>

    <a class="btn-info" href="${ev.url || '#'}" target="_blank">
      MORE FROM THIS AUTHOR
    </a>
  `;
}


loadEvents();