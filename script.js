document.addEventListener("DOMContentLoaded", function () {
    
    /*** 1️⃣ FAQ Section: Toggle Expand/Collapse ***/
    const faqItems = document.querySelectorAll(".faq-item");
    faqItems.forEach((item) => {
        item.addEventListener("click", () => {
            const feedbackSection = item.nextElementSibling;

            // Collapse all other sections before expanding a new one
            document.querySelectorAll(".faq-feedback").forEach(section => {
                if (section !== feedbackSection) {
                    section.classList.remove("visible");
                }
            });

            // Toggle the clicked section
            if (feedbackSection) {
                feedbackSection.classList.toggle("visible");
            }
        });
    });

    /*** 2️⃣ PC Availability: Toggle Status ***/
    const pcElements = document.querySelectorAll(".pc");
    pcElements.forEach(pc => {
        pc.addEventListener("click", () => {
            pc.classList.toggle("available");
            pc.classList.toggle("occupied");
        });
    });

    /*** 3️⃣ Schedule Form Validation ***/
    const scheduleForm = document.querySelector(".schedule-form");
    if (scheduleForm) {
        scheduleForm.addEventListener("submit", (event) => {
            const startTime = document.getElementById("start-time").value;
            const endTime = document.getElementById("end-time").value;
            const pcNumber = document.getElementById("pc-number").value;

            if (!startTime || !endTime || !pcNumber) {
                alert("Please fill in all fields.");
                event.preventDefault();
            }
        });
    }

    /*** 4️⃣ Adjust Google Calendar Responsiveness ***/
    const calendarIframe = document.querySelector("iframe");
    if (calendarIframe) {
        function adjustCalendarSize() {
            if (window.innerWidth < 800) {
                calendarIframe.style.width = "100%";
                calendarIframe.style.height = "500px";
            } else {
                calendarIframe.style.width = "80%";
                calendarIframe.style.height = "600px";
            }
        }
        adjustCalendarSize();
        window.addEventListener("resize", adjustCalendarSize);
    }

    /*** 5️⃣ Auto-Assign Feedback to First Available FAQ Topic ***/
    const feedbackForm = document.querySelector(".feedback-form form");
    if (feedbackForm) {
        feedbackForm.addEventListener("submit", (event) => {
            event.preventDefault();

            const nameInput = document.querySelector(".feedback-form input[type='text']").value;
            const feedbackInput = document.querySelector(".feedback-form textarea").value;

            if (!nameInput || !feedbackInput) {
                alert("Please enter your name and feedback.");
                return;
            }

            const topicContainers = document.querySelectorAll(".faq-feedback .feedback-list");

            for (let topic of topicContainers) {
                if (topic.children.length < 3) {
                    const feedbackEntry = document.createElement("div");
                    feedbackEntry.classList.add("feedback-entry");
                    feedbackEntry.innerHTML = `<strong>${nameInput}:</strong> ${feedbackInput}`;
                    topic.appendChild(feedbackEntry);

                    const feedbackSection = topic.closest(".faq-feedback");
                    feedbackSection.classList.add("visible");

                    document.querySelector(".feedback-form input[type='text']").value = "";
                    document.querySelector(".feedback-form textarea").value = "";

                    return;
                }
            }

            alert("All FAQ topics are full. No more feedback can be added.");
        });
    }

});
