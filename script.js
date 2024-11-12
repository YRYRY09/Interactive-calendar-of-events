document.addEventListener('DOMContentLoaded', function () {
    const calendarBody = document.getElementById('calendar-body');
    const monthYearDisplay = document.getElementById('month-year');
    const prevMonthButton = document.getElementById('prev-month');
    const nextMonthButton = document.getElementById('next-month');
    const eventModal = document.getElementById('event-modal');
    const eventTitleInput = document.getElementById('event-title');
    const eventDescriptionInput = document.getElementById('event-description');
    const saveEventButton = document.getElementById('save-event');
    const deleteEventButton = document.getElementById('delete-event');
    const closeModal = document.querySelector('.close');

    let currentDate = new Date();
    let selectedDate = null;
    let events = {};

function renderCalendar() {
    calendarBody.innerHTML = '';
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();

    // Правильний розрахунок першого дня місяця: понеділок - 1, неділя - 7
    const firstDay = (new Date(year, month, 1).getDay() || 7) - 1;  // Приводимо до індексації, де понеділок - 0
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    monthYearDisplay.textContent = `${currentDate.toLocaleString('uk', { month: 'long' })} ${year}`;

    let date = 1;
    for (let i = 0; i < 6; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < 7; j++) {
            const cell = document.createElement('td');
            if (i === 0 && j < firstDay) {
                cell.innerHTML = '';
            } else if (date > daysInMonth) {
                break;
            } else {
                cell.innerHTML = date;
                const cellDate = new Date(year, month, date);
                const dateKey = cellDate.toDateString();

                // Якщо є подія на цей день, додаємо стилі
                if (events[dateKey]) {
                    cell.classList.add('event-day');
                    const eventMarker = document.createElement('div');
                    eventMarker.classList.add('event-marker');
                    eventMarker.textContent = events[dateKey].title;
                    cell.appendChild(eventMarker);
                }

                // Додаємо слухача для відкриття модального вікна
                cell.addEventListener('click', function () {
                    selectedDate = cellDate;
                    openModal();
                });

                date++;
            }
            row.appendChild(cell);
        }
        calendarBody.appendChild(row);
    }
}

    function openModal() {
        const event = events[selectedDate.toDateString()] || { title: '', description: '' };
        eventTitleInput.value = event.title;
        eventDescriptionInput.value = event.description;
        eventModal.style.display = 'block';
    }

    function closeModalWindow() {
        eventModal.style.display = 'none';
    }

    saveEventButton.addEventListener('click', function () {
        const title = eventTitleInput.value;
        const description = eventDescriptionInput.value;
        if (title.trim()) {
            events[selectedDate.toDateString()] = { title, description };
            renderCalendar();
        }
        closeModalWindow();
    });

    deleteEventButton.addEventListener('click', function () {
        delete events[selectedDate.toDateString()];
        renderCalendar();
        closeModalWindow();
    });

    closeModal.addEventListener('click', closeModalWindow);

    window.addEventListener('click', function (e) {
        if (e.target === eventModal) {
            closeModalWindow();
        }
    });

    prevMonthButton.addEventListener('click', function () {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar();
    });

    nextMonthButton.addEventListener('click', function () {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar();
    });

    renderCalendar();
});
// Created by Yurii Obukhovskyi