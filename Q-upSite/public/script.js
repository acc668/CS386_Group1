document.addEventListener("DOMContentLoaded", function () {
    // Handle PC Availability Toggle
    const pcs = document.querySelectorAll(".pc");
    pcs.forEach(pc => {
        pc.addEventListener("click", function () {
            this.classList.toggle("available");
            this.classList.toggle("occupied");
        });
    });

    // Handle Calendar Navigation
    let currentDate = new Date();
    const monthYear = document.getElementById("month-year");
    const calendarGrid = document.querySelector(".calendar-grid");
    const prevMonthBtn = document.getElementById("prev-month");
    const nextMonthBtn = document.getElementById("next-month");

    function renderCalendar() {
        calendarGrid.innerHTML = "";
        const firstDayIndex = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
        const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
        monthYear.textContent = currentDate.toLocaleDateString("en-US", { month: "long", year: "numeric" });

        for (let i = 0; i < firstDayIndex; i++) {
            const emptyCell = document.createElement("div");
            emptyCell.classList.add("empty-day");
            calendarGrid.appendChild(emptyCell);
        }
        
        for (let day = 1; day <= lastDay; day++) {
            const dayCell = document.createElement("div");
            dayCell.classList.add("calendar-day");
            dayCell.textContent = day;
            dayCell.addEventListener("click", () => alert(`Selected date: ${day} ${monthYear.textContent}`));
            calendarGrid.appendChild(dayCell);
        }
    }

    prevMonthBtn.addEventListener("click", () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar();
    });

    nextMonthBtn.addEventListener("click", () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar();
    });

    renderCalendar();

    // FAQ Toggle
    document.querySelectorAll(".faq-item").forEach(item => {
        item.addEventListener("click", function () {
            this.classList.toggle("expanded");
        });
    });

    // Form Handling
    document.getElementById('event-form')?.addEventListener('submit', function (event) {
        event.preventDefault();
        const date = document.getElementById('event-date').value;
        const name = document.getElementById('event-name').value;
        alert(`Event '${name}' added on ${date}`);
    });
});