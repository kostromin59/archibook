import events from "./events.json";

function makeEventTemplate(date, event) {
  // Шаблон для основной информации о событии
  const dayInfoTemplate = `
    <div class="events__about-day">
      <time datetime="${date}">
        ${event.dateText}
        <span>${event.weekday}</span>
      </time>
      <h3 class="events__topic">${event.topic}</h3>
      <div class="events__sponsor">
        <a href="${event.sponsor.link}" target="_blank">
          <p>
            Спонсор дня:<br />
            <span>${event.sponsor.text}</span>
          </p>
          <img src="${event.sponsor.image}" alt="${event.sponsor.text}" class="${event.sponsor.isRounded ? "rounded" : ""}" loading="lazy" />
        </a>
      </div>
    </div>
  `;

  // Шаблон для списка мероприятий
  const eventListTemplate = `
    <ol aria-label="Мероприятия">
      ${event.events
        .map(
          (eventItem) =>
            `<li class="events__event event">
              <time datetime="${date}">${eventItem.time}</time>
              <div class="event__info">
                <div>
                  <h4>${eventItem.title}</h4>
                  <p>${eventItem.description}</p>
                </div>
                ${
                  eventItem.speakers.length
                    ? `<ul class="event__speakers" aria-label="Спикеры">
                        ${eventItem.speakers
                          .map(
                            (speaker) =>
                              `<li><img src="${speaker.image}" alt="${speaker.name}" loading="lazy" /><p>Спикер:<br /><span>${speaker.name}</span></p></li>`,
                          )
                          .join("")}
                      </ul>`
                    : ""
                }
              </div>
            </li>`,
        )
        .join("")}
    </ol>
  `;

  const html = `${dayInfoTemplate}${eventListTemplate}`;

  return html;
}

const buttons = Array.from(document.querySelectorAll(".day-button"));
const content = document.getElementById("event-content");

buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    e.preventDefault();
    // Убрать везде активные
    buttons.forEach((btn) => btn.classList.remove("active"));
    // Сделать кнопку активной
    e.currentTarget.classList.add("active");


    // Заменить контент
    const day = e.currentTarget.dataset.day;
    window.sessionStorage.setItem("day", day)
    content.innerHTML = makeEventTemplate(day, events[day]);
  });
});

const day = window.sessionStorage.getItem("day") || "2024-05-22"
buttons.forEach((btn) => btn.classList.remove("active"));
buttons.find((btn) => btn.dataset.day === day).classList.add("active")


content.innerHTML = makeEventTemplate(day, events[day]);
