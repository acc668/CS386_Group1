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

const storedEmail = localStorage.getItem("registeredEmail");
const storedPassword = localStorage.getItem("registeredPassword");

loginSubmit.addEventListener("click", function () {
    const enteredEmail = document.getElementById("loginUsername").value.trim();
    const enteredPassword = document.getElementById("loginPassword").value.trim();

    if (enteredEmail === storedEmail && enteredPassword === storedPassword) {
        loginError.style.display = "none";
        loginModal.style.display = "none";

        if (formPendingSubmission) {
            const pcNum = parseInt(document.getElementById("pc-number").value);
            const pcBoxes = document.querySelectorAll(".pc");

            if (pcNum >= 1 && pcNum <= pcBoxes.length) {
                const selected = pcBoxes[pcNum - 1];
                selected.classList.remove("available");
                selected.classList.add("occupied");
                alert(`PC ${pcNum} reserved successfully.`);
            }

            formPendingSubmission = false;
            scheduleForm.reset();
        }
    } else {
        loginError.style.display = "block";
        loginError.textContent = "Invalid email or password.";
    }
});


let formPendingSubmission = false;

document.addEventListener("DOMContentLoaded", function () {
    const scheduleForm = document.querySelector(".schedule-form");
    const loginModal = document.getElementById("loginModal");
    const loginSubmit = document.getElementById("loginSubmit");
    const loginError = document.getElementById("loginError");

    let formPendingSubmission = false;

    if (scheduleForm) {
        scheduleForm.addEventListener("submit", function (e) {
            e.preventDefault();
            formPendingSubmission = true;
            loginModal.style.display = "block"; // 👈 shows modal
        });
    }

    if (loginSubmit) {
        loginSubmit.addEventListener("click", function () {
            const email = document.getElementById("loginUsername").value;
            const password = document.getElementById("loginPassword").value;

            const storedEmail = localStorage.getItem("registeredEmail");
            const storedPassword = localStorage.getItem("registeredPassword");

            if (email === storedEmail && password === storedPassword) {
                loginError.style.display = "none";
                loginModal.style.display = "none";

                if (formPendingSubmission) {
                    const pcNum = parseInt(document.getElementById("pc-number").value);
                    const pcBoxes = document.querySelectorAll(".pc");
                    const selected = pcBoxes[pcNum - 1];

                    if (selected) {
                        selected.classList.remove("available");
                        selected.classList.add("occupied");
                    }

                    alert(`PC ${pcNum} reserved successfully.`);
                    formPendingSubmission = false;
                    scheduleForm.reset();
                }
            } else {
                loginError.style.display = "block";
            }
        });
    }

    window.addEventListener("click", function (e) {
        if (e.target === loginModal) {
            loginModal.style.display = "none";
        }
    });
});
