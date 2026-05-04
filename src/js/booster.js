const API_KEY = "Q8bHL81HES4CjxatVZAVSQWYyAffYhbQ";
const GOOGLE_MAPS_KEY = "YOUR_GOOGLE_MAPS_API_KEY";


const list = document.querySelector(".events-list");
const pagination = document.getElementById("pagination");

const modal = document.querySelector("[data-modal]");
const modalWrap = document.querySelector(".modal__wrap");
const closeBtn = document.querySelector("[data-close]");
const body = document.body;

const searchInput = document.querySelector(
  '.header__input[placeholder="Start searching"]'
);

const countryBox = document.querySelector(".country");
const countryInput = document.getElementById("countryInput");
const countryList = document.querySelector(".country-list");


let keyword = "";
let countryCode = "US";

let currentPage = 0;
let totalPages = 0;

let timer;

/* ======================
Countries
====================== */

const countries = [
  { name: "United States", code: "US" },
  { name: "Germany", code: "DE" },
  { name: "United Kingdom", code: "GB" },
  { name: "France", code: "FR" },
  { name: "Spain", code: "ES" },
  { name: "Italy", code: "IT" },
  { name: "Australia", code: "AU" },
  { name: "Canada", code: "CA" },
  { name: "Argentina", code: "AR" },
  { name: "Austria", code: "AT" },
  { name: "Belgium", code: "BE" },
  { name: "Brazil", code: "BR" },
  { name: "Netherlands", code: "NL" },
  { name: "Poland", code: "PL" },
  { name: "Sweden", code: "SE" },
  { name: "Switzerland", code: "CH" },
  { name: "Ukraine", code: "UA" },
  { name: "Denmark", code: "DK" },
  { name: "Finland", code: "FI" },
  { name: "Norway", code: "NO" },
  { name: "Portugal", code: "PT" },
  { name: "Ireland", code: "IE" },
  { name: "Mexico", code: "MX" },
  { name: "New Zealand", code: "NZ" },
  { name: "Czech Republic", code: "CZ" },
  { name: "Hungary", code: "HU" }
];

function renderCountries() {
  const markup = countries
    .map(c => `<li data-code="${c.code}">${c.name}</li>`)
    .join("");

  countryList.innerHTML = markup;
}

renderCountries();

/* ======================
Country dropdown
====================== */

countryInput.addEventListener("click", () => {
  countryBox.classList.toggle("open");
  countryList.classList.toggle("open");
});

countryList.addEventListener("click", e => {
  if (e.target.tagName !== "LI") return;

  const code = e.target.dataset.code;
  const name = e.target.textContent;

  countryInput.value = name;
  countryCode = code;

  countryList.classList.remove("open");
  countryBox.classList.remove("open");

  loadEvents(0);
});

document.addEventListener("click", e => {
  if (!e.target.closest(".country")) {
    countryList.classList.remove("open");
    countryBox.classList.remove("open");
  }
});

/* ======================
Search
====================== */

searchInput.addEventListener("input", () => {
  clearTimeout(timer);

  timer = setTimeout(() => {
    keyword = searchInput.value.trim();
    loadEvents(0);
  }, 500);
});

/* ======================
Load events
====================== */

async function loadEvents(page = 0) {
  const url = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${API_KEY}&countryCode=${countryCode}&keyword=${keyword}&size=20&page=${page}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    const events = data._embedded?.events || [];

    totalPages = Math.min(data.page?.totalPages || 0, 29);
    currentPage = page;

    if (events.length === 0) {
      renderNoMatches();
      pagination.innerHTML = "";
      return;
    }

    renderEvents(events);
    renderPagination();
  } catch (error) {
    console.error(error);
  }
}

/* ======================
No matches
====================== */

function renderNoMatches() {
  list.classList.add("no-events");

  list.innerHTML = `
    <div class="zero-matches">
    <img class="zero-matches__img" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iNzUycHQiIGhlaWdodD0iNzUycHQiIHZlcnNpb249IjEuMSIgdmlld0JveD0iMCAwIDc1MiA3NTIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiA8ZGVmcz4KICA8Y2xpcFBhdGggaWQ9ImEiPgogICA8cGF0aCBkPSJtMTYyIDEzOS4yMWg0Mjh2NDczLjU4aC00Mjh6Ii8+CiAgPC9jbGlwUGF0aD4KIDwvZGVmcz4KIDxnIGNsaXAtcGF0aD0idXJsKCNhKSI+CiAgPHBhdGggZD0ibTM4My42NSAyNDguNzNjLTczLjgxMi0yNC44ODctMTM1LjAyLTY0Ljc0Mi0xNzUtMTA5LjUyLTEyOC40IDM5Mi42MSA1My40MjYgNDcwLjAzIDUzLjQyNiA0NzAuMDNzMTg2Ljg0IDYzIDMyNy4xOC0zNDEuNjdjLTU4LjkzOCAxMS40MS0xMzEuNzkgNi4wNTA4LTIwNS42LTE4Ljg0NHptLTExMC41OSA3NC44ODNjMTkuMjAzIDYuNDcyNyAzMS4xMDIgMjYuNDQ1IDMyLjc5NyA1MC42NDggMCAwLTE4LjM5NS0yNi0zOC43ODUtMzIuODc1LTIwLjM5MS02Ljg3NS01MC43NzcgMi42NzE5LTUwLjc3NyAyLjY3MTkgMTYuMDA0LTE4LjIzOCAzNy41NjYtMjYuOTI2IDU2Ljc2Ni0yMC40NDV6bTM2Ljg3NSAxNDMuNzFjLTQ4LjA1NS0xNi4yMDctMTE1Ljg5LTQuODM1OS0xMTUuODktNC44MzU5IDMzLjIzLTI5LjY5NSA4MS4wMi00MS4xODQgMTI2LjI3LTI1LjkzIDQ1LjI0NiAxNS4yNjIgNzYuMzA5IDUzLjM0OCA4NC43NzcgOTcuMDk4IDAuMDAzOTA3IDAuMDA3ODEyLTQ3LjA5NC01MC4xMjUtOTUuMTQ4LTY2LjMzMnptMTEwLjM4LTc0LjI1NGMtMjAuMzk4LTYuODc1LTUwLjc3NyAyLjY3MTktNTAuNzc3IDIuNjcxOSAxNi4wMDQtMTguMjM4IDM3LjU3LTI2LjkyMiA1Ni43Ny0yMC40NDUgMTkuMjAzIDYuNDcyNyAzMS4xMDIgMjYuNDQ1IDMyLjc4OSA1MC42NDggMC4wMDc4MTIgMC0xOC4zODMtMjYtMzguNzgxLTMyLjg3NXoiIGZpbGw9IiNkYzU1YzUiLz4KIDwvZz4KPC9zdmc+Cg==" alt="Drama Theatre Of Ancient Greece Comedy Mask - Theatre Masks">
      <p class="zero-matches__text">
        Sorry. We couldn't find any matches
      </p>
    </div>
  `;
}

/* ======================
Render events
====================== */

function renderEvents(events) {
  list.classList.remove("no-events");

  const markup = events
    .map(ev => {
      const img = ev.images?.[0]?.url || "";
      const name = ev.name || "";
      const date = ev.dates?.start?.localDate || "";
      const venue = ev._embedded?.venues?.[0] || {};
      const place = venue.name || "";
      const lat = venue.location?.latitude || "";
      const lng = venue.location?.longitude || "";

      return `
      <li class="event-card" data-id="${ev.id}">
        <img class="event-img" src="${img}" alt="${name}">
        <h3 class="event-title">${name}</h3>
        <p class="event-date">${date}</p>

        <p class="event-place"
           data-lat="${lat}"
           data-lng="${lng}"
           data-place="${place}">
          ${place}
          

          <svg class="event-svg" width="7" height="10" viewBox="0 0 7 10">
            <path d="M3.5 0C1.57 0 0 1.56 0 3.47C0 5.88 3.5 10 3.5 10C3.5 10 7 5.76 7 3.47C7 1.56 5.43 0 3.5 0Z" fill="white"/>
          </svg>

        </p>
      </li>
    `;
    })
    .join("");

  list.innerHTML = markup;

  addMapEvents();
}

/* ======================
Map click
====================== */

function addMapEvents() {
  document.querySelectorAll(".event-place").forEach(placeEl => {
    placeEl.addEventListener("click", () => {
      const lat = placeEl.dataset.lat;
      const lng = placeEl.dataset.lng;
      const name = placeEl.dataset.place;

      modal.classList.remove("is-hidden");
      body.style.overflow = "hidden";

      if (lat && lng) {
        modalWrap.innerHTML = `
          <h3 style="color:#fff">${name}</h3>

          <iframe
            width="100%"
            height="400"
            style="border:0"
            loading="lazy"
            allowfullscreen
            src="https://www.google.com/maps/embed/v1/place?key=${GOOGLE_MAPS_KEY}&q=${lat},${lng}">
          </iframe>
        `;
      } else {
        modalWrap.innerHTML = `
          <h3>${name}</h3>
          <p style="color:#fff;padding:20px">
            No map available for this location
          </p>
        `;
      }
    });
  });
}

/* ======================
Pagination
====================== */

function renderPagination() {

  pagination.innerHTML = "";

  const maxVisible = 5;

  let start = Math.max(0, currentPage - 2);
  let end = Math.min(totalPages, start + maxVisible);

  if (end - start < maxVisible) {
    start = Math.max(0, end - maxVisible);
  }

  if (start > 0) {
    createPageBtn(0);

    if (start > 1) {
      const dots = document.createElement("span");
      dots.textContent = "...";
      pagination.appendChild(dots);
    }
  }

  for (let i = start; i < end; i++) {
    createPageBtn(i);
  }

  if (end < totalPages) {
    if (end < totalPages - 1) {
      const dots = document.createElement("span");
      dots.textContent = "...";
      pagination.appendChild(dots);
    }

    createPageBtn(totalPages - 1);
  }
}

function createPageBtn(page) {
  const btn = document.createElement("button");

  btn.className = "page-btn";
  btn.textContent = page + 1;

  if (page === currentPage) {
    btn.classList.add("active");
  }

  btn.addEventListener("click", () => loadEvents(page));

  pagination.appendChild(btn);
}

/* ======================
Modal close
====================== */

closeBtn.addEventListener("click", closeModal);

modal.addEventListener("click", e => {
  if (e.target === modal) {
    closeModal();
  }
});

function closeModal() {
  modal.classList.add("is-hidden");
  modalWrap.innerHTML = "";
  body.style.overflow = "";
}

/* ======================
Start
====================== */

loadEvents();