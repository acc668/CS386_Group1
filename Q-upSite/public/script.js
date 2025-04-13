document.addEventListener("DOMContentLoaded", function () {
    const availabilityForm = document.getElementById("availabilityForm");
    const pcContainer = document.getElementById("pcContainer");
    const pcGrid = document.getElementById("pcGrid");
    const loginModal = document.getElementById("loginModal");
    const loginSubmit = document.getElementById("loginSubmit");
    const loginError = document.getElementById("loginError");
    const summaryDiv = document.getElementById("reservationSummary");
  
    let selectedPC = null;
    let selectedDate = null;
    let selectedStartTime = null;
    let selectedEndTime = null;
  
    const storedEmail = localStorage.getItem("registeredEmail");
    const storedPassword = localStorage.getItem("registeredPassword");
  
    const reservations = [
      { date: "2025-04-12", start: "15:00", end: "16:00", pc: 2 },
      { date: "2025-04-12", start: "15:30", end: "16:30", pc: 5 }
    ];
  
    function isOverlapping(start1, end1, start2, end2) {
      return start1 < end2 && start2 < end1;
    }
  
    availabilityForm?.addEventListener("submit", function (e) {
      e.preventDefault();
      selectedDate = document.getElementById("reservation-date").value;
      selectedStartTime = document.getElementById("reservation-start-time").value;
      selectedEndTime = document.getElementById("reservation-end-time").value;
  
      if (!selectedDate || !selectedStartTime || !selectedEndTime) return;
  
      // Build PC Grid
      pcGrid.innerHTML = "";
  
      for (let i = 1; i <= 12; i++) {
        const pcDiv = document.createElement("div");
        pcDiv.classList.add("pc");
  
        const isReserved = reservations.some(r =>
          r.date === selectedDate &&
          r.pc === i &&
          isOverlapping(selectedStartTime, selectedEndTime, r.start, r.end)
        );
  
        if (isReserved) {
          pcDiv.classList.add("occupied");
        } else {
          pcDiv.classList.add("available");
          pcDiv.addEventListener("click", function () {
            selectedPC = i;
            loginModal.style.display = "block";
          });
        }
  
        pcDiv.textContent = i;
        pcGrid.appendChild(pcDiv);
      }
  
      // Show Reservation Summary
      const reservationMap = {};
      reservations.forEach(r => {
        if (r.date === selectedDate) {
          if (!reservationMap[r.pc]) reservationMap[r.pc] = [];
          reservationMap[r.pc].push(`${r.start}–${r.end}`);
        }
      });
  
      let summaryHTML = `<h3>📅 Reservations for ${selectedDate}</h3>`;
      for (let i = 1; i <= 12; i++) {
        const slots = reservationMap[i] || ["(none)"];
        summaryHTML += `<p><strong>PC ${i}:</strong> ${slots.join(", ")}</p>`;
      }
      summaryDiv.innerHTML = summaryHTML;
  
      pcContainer.style.display = "flex";
    });
  
    loginSubmit?.addEventListener("click", function () {
      const email = document.getElementById("loginUsername").value.trim();
      const password = document.getElementById("loginPassword").value.trim();
  
      if (email === storedEmail && password === storedPassword && selectedPC) {
        reservations.push({
          date: selectedDate,
          start: selectedStartTime,
          end: selectedEndTime,
          pc: selectedPC
        });
  
        alert(`PC ${selectedPC} reserved on ${selectedDate} from ${selectedStartTime} to ${selectedEndTime}`);
        loginModal.style.display = "none";
        pcContainer.style.display = "none";
        availabilityForm.reset();
        selectedPC = null;
      } else {
        loginError.style.display = "block";
        loginError.textContent = "Invalid credentials.";
      }
    });
  
    window.addEventListener("click", function (e) {
      if (e.target === loginModal) {
        loginModal.style.display = "none";
      }
    });
  });
  
