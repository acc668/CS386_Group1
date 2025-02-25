# Deliverable 2

## 1. Positioning

### Problem Statement  
The problem of **unreliable and inefficient scheduling in the Advanced Media Lab (AML)** affects **all participants, including players, organizers, and spectators**, the impact of which is **confusion, missed matches, and a fragmented experience**. Poor scheduling leads to difficulty in coordinating games, last-minute cancellations, and inconsistent event flow, ultimately reducing engagement and diminishing the overall enjoyment of the league.

### Product Position Statement  
For **AML participants, including players, organizers, and spectators**, who struggle with **unreliable and inefficient scheduling that leads to missed matches, confusion, and decreased engagement**, **Q-Up** is an **advanced scheduling application** that **streamlines match organization by providing a reservation system for PCs, a calendar for listing events, and tools for tracking team reservations, ensuring smoother coordination and better communication**. Unlike **manual scheduling methods or generic scheduling tools**, our product **is specifically designed for AML, offering a centralized platform to manage PC availability and event scheduling, reducing conflicts and improving the overall league experience**.

### Value Proposition and Customer Segment  
**Value Proposition:**  
Q-Up gives **Competitive Players** reassurance that they will have PCs for games, while ensuring **Casual Players** can still utilize the space by allowing AML attendees to reserve PCs.

**Customer Segment:**  
AML attendees, including **Competitive Players, Casual Players, and Advisors** who have differing spatial needs.

## 2. Stakeholders

1. **Casual Gamer** - Not in E-Sports but wants a seamless experience at AML, ensuring they can game at the desired time.
2. **Competitive Gamer** - E-Sports member who needs guaranteed PC access for training or matches.
3. **Spectators** - Interested in watching games and require an up-to-date event schedule.
4. **Group 1 Developers** - Responsible for designing maintainable and updatable code.
5. **NAU IT Staff** - Ensures the application complies with university security standards.

## 3. Functional Requirements (Features)

- Reserve a certain PC for a specific date and time
- Send notifications and reminders for events and reservations
- Allow users to change or cancel reservations
- Notify users that the end of the session is approaching
- Enforce session time by closing the game

## 4. Non-functional Requirements

1. **User IDs and E-Sports Identification must be secure**  
   - Ensures NAU system security
   - **Measurement:** Username and password fuzzing should not produce crashes
2. **Minimal Overlay Performance Impact**  
   - Maintains control over the game while alerting users about session end
   - **Measurement:** Should produce no more than a 5-frame drop in FPS
3. **App should store and display up-to-date information**  
   - Prevents scheduling confusion
   - **Measurement:** The app event calendar should always match the E-Sports event calendar

![Deliverable Image 4](/mnt/data/extracted_images/page_4.png)

## 5. Minimum Viable Product (MVP)

The MVP for **Q-Up** will include:
- User authentication
- PC reservation system
- Real-time availability display
- Basic admin controls
- Automated notifications for confirmed bookings

![Deliverable Image 5](/mnt/data/extracted_images/page_5.png)

### Validation Process
- **Prototyping**: Low-fidelity wireframes in Figma/Adobe XD
- **Pilot Testing**: Small group usability tests
- **Wizard of Oz Testing**: Simulated advanced scheduling optimizations

![Deliverable Image 6](/mnt/data/extracted_images/page_6.png)

## 6. Use Cases

![UML Diagram](/deliverables/images/UMLDiagram.png)

### **Ali**: Get notified when time on PC ends
- **Actor:** Casual Gamer
- **Trigger:** Reservation time runs out
- **Pre-conditions:**
  - User confirmed reservation start
  - User is currently playing a game
- **Post-condition:**
  - User receives an overlay notification
  - User’s session is closed
- **Success Scenario:**
  1. User accepted reservation
  2. User plays game
  3. User receives first time warning
  4. User receives second time warning
  5. Game is closed

![Game Schedule](/deliverables/images/Ali.png)

### **Anthony**: Make Reservation  
- **Actor:** Casual Gamer, E-Sports Member  
- **Trigger:** User decides to make a reservation  
- **Pre-conditions:**  
  - User is logged in  
  - PC is available at requested time  
- **Post-condition:**  
  - User gets reservation confirmation  
  - Time slot is marked as reserved  
- **Success Scenario:**  
  1. User initiates the reservation request.  
  2. Reservation module confirms availability.  
  3. User confirms request.  
  4. The Reservation Module completes reservation.  
  5. Time slot is marked as taken. 

![Schedule](/deliverables/images/Anthony.png)

### **Clayton**: Update E-Sports Calendar  
- **Actor:** AML Staff  
- **Trigger:** Staff decides to add a new event to the calendar  
- **Pre-conditions:**  
  - Staff member must be logged in  
  - Staff member selects the event date  
- **Post-condition:**  
  - Event is added to the calendar  
  - Calendar is updated to display new addition  
- **Success Scenario:**  
  1. Staff member decides to add a new event to the calendar.  
  2. Staff member logs in.  
  3. Staff member selects date.  
  4. Staff member adds event to the calendar.  
  5. Calendar module updates calendar.

![Game Schedule](/deliverables/images/Clayton.png)

### **Vince**: Cancel/Change Reservation  
- **Actor:** Casual Gamer, E-Sports Member  
- **Trigger:** User decides to change the date and/or time of reservation  
- **Pre-conditions:**  
  - User must be logged in  
  - User must have chosen the reservation in question  
- **Post-condition:**  
  - Time/date for reservation is updated to the new time/date  
- **Success Scenario:**  
  1. User decides to change a reservation’s time/date.  
  2. User logs in.  
  3. User chooses the reservation in question.  
  4. User changes reservation time/date.  
  5. User confirms new info.  
  6. Calendar module updates the calendar.

![Reservation Schedule](/deliverables/images/Vince.png)

### **Zackary**: Access Reservation Schedule  
- **Actor:** Casual Gamers, E-Sports Members, Spectators, Staff  
- **Trigger:** User decides to look at the reservation schedule  
- **Pre-conditions:**  
  - User opens the app  
  - User navigates to the calendar  
- **Post-condition:**  
  - User sees up-to-date reservation information  
- **Success Scenario:**  
  1. User decides to view the reservation schedule.  
  2. User opens the app.  
  3. User navigates to the calendar.  
  4. User sees up-to-date calendar information.

![Reservation Access](/deliverables/images/Zackary.png)

## 7. User Stories

| Role | Description | Priority | Time Estimate |
|------|------------|----------|--------------|
| **Competitive Player** | Wants a detailed event schedule to avoid conflicts | 1 | 6sp |
| **Team Captain** | Wants to reserve PCs for team training | 1 | 4sp |
| **Spectator** | Wants an up-to-date event calendar | 3 | 2sp |
| **Professional Gamer** | Wants to see available PCs to refine skills | 2 | 2sp |
| **Casual Player** | Wants to know event schedules to plan visits | 2 | 2sp |
| **Advisor** | Wants to manage team PC reservations | 1 | 4sp |
| **E-Sports Staff Member** | Wants to override/change reservations | 1 | 6sp |
| **Casual Player** | Wants to see event schedule to avoid conflicts | 2 | 6sp |
| **Coach** | Wants to check PC availability for planning | 1 | 2sp |
| **Casual Player** | Wants to see available PCs before arrival | 3 | 2sp |

## 8. Issue Tracker

GitHub Issue Tracker Link: [GitHub Issues](https://github.com/acc668/CS386_Group1/issues)

Screenshot of Issue Tracker:
![Issue Tracker](/deliverables/images/IssueTracker.png)
