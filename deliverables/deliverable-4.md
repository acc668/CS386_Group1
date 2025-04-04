# Q-Up: AML Reservation and Match Scheduling System

## Introduction
Q-Up is an advanced scheduling application designed to streamline match organization and PC reservations in the Advanced Media Lab (AML). It enhances the AML experience by providing a structured Reservation System for PCs, real-time PC Availability tracking, and an integrated Calendar for listing events and match schedules. Competitive Players can reserve specific PCs in advance, with priority for official matches, while Casual Players can also utilize available PCs. Automated Notifications prevent double bookings and alert users of schedule changes, ensuring smooth coordination and minimizing conflicts. Q-Up improves communication, reduces scheduling confusion, and creates a more organized and engaging environment for all AML participants.

**GitHub Link:** [Q-Up Repository](https://github.com/acc668/CS386_Group1)

---

## Requirements
List of implemented requirements and corresponding pull requests:

### Frontend
- **Requirement:** User authentication  
  **Issue:** [#13 - User Authentication](https://github.com/acc668/CS386_Group1/issues/13)  
  **Pull request:** [#73 - Implement Authentication](https://github.com/acc668/CS386_Group1/pull/73)  
  **Implemented by:** Clayton Ramsey  
  **Approved by:** Anthony Narvaez  
  **Print screen:**  
  ![User Authentication](./images/userAuthentication.png)

- **Requirement:** Real-time availability display  
  **Issue:** [#15 - Real-time Display](https://github.com/acc668/CS386_Group1/issues/15)  
  **Pull request:** [#89 - Availability Display](https://github.com/acc668/CS386_Group1/pull/89)  
  **Implemented by:** Zackary Pond  
  **Approved by:** Vince Carrillo  
  **Print screen:**  
  ![Availability Display](./images/availabilityDisplay.png)

### Backend
- **Requirement:** PC reservation system  
  **Issue:** [#17 - PC Reservation](https://github.com/acc668/CS386_Group1/issues/17)  
  **Pull request:** [#92 - Reservation System](https://github.com/acc668/CS386_Group1/pull/92)  
  **Implemented by:** Anthony Narvaez  
  **Approved by:** Alexandra Curry  
  **Print screen:**  
  ![PC Reservation](./images/pcReservation.png)

- **Requirement:** Automated End-of-reservation notification  
  **Issue:** [#9 - Notifications](https://github.com/acc668/CS386_Group1/issues/9)  
  **Pull request:** [#56 - Notifications System](https://github.com/acc668/CS386_Group1/pull/56)  
  **Implemented by:** Vince Carrillo  
  **Approved by:** Alexandra Curry  
  **Print screen:**  
  ![Automated Notification](./images/automatedNotification.png)

---

## Tests
We attempted to implement automated tests to verify the correct functionality of our code. However, we encountered challenges with setting up automated tests for our website. As a result, we decided to focus our efforts on other aspects of the project. We plan to revisit automated testing in future iterations to ensure comprehensive testing of the system's core components.

---

## Technology
### Adopted Technologies
- **Express JS**: Handles HTTP requests and responses, managing data crucial for system functionality.
- **Node JS**: Cross-platform runtime for executing JavaScript code server-side.
- **QT**: Used via QML for building desktop application UIs.
- **BCrypt**: Hashes passwords securely for database storage.
- **Express Session**: Middleware enabling session management for user authentication.
- **Passport**: Simplifies login and user authentication in Node.js.
- **MySQL**: Relational database system used for storing reservations and user data.
- **GLFW**: Configures OpenGL graphics API usage in desktop applications.
- **Dear ImGui (Desktop Version)**: Lightweight graphics UI library for building interfaces in C++.
- **Microsoft Azure**: Hosts the website and manages cloud-based resources.

---

## Deployment
- **Link to production system:** [Q-Up Live System](https://aan266.z13.web.core.windows.net/)
- **Deployment Details:**
    - Hosted on **Azure** using Azure App Services for easy deployment and scaling.
    - CI/CD pipeline set up with **GitHub Actions** for automatic testing and deployment to Azure.
    - **Azure SQL Database** handles reservations and user data.
    - **Azure Monitor** monitors real-time performance and logs system activity.

---

## Licensing
We adopted the **MIT License** because it is a permissive license that allows broad use, modification, and distribution of the software. It ensures that anyone can use the software in private or commercial projects while providing minimal restrictions. The simplicity and permissiveness of the MIT License make it a great choice for promoting collaboration and innovation while still protecting the authors by requiring attribution.

---

## Readme and Documentation
- **Readme File:** [README.md](https://github.com/acc668/CS386_Group1/blob/main/Readme.md)
- **Contributing Guidelines:** [CONTRIBUTING.md](https://github.com/acc668/CS386_Group1/blob/main/CONTRIBUTING.md)
- **License File:** [LICENSE](https://github.com/acc668/CS386_Group1/blob/main/LICENSE)
- **Code of Conduct:** [CODE_OF_CONDUCT.md](https://github.com/acc668/CS386_Group1/blob/main/CODE_OF_CONDUCT.md)

---

## UX Design
The user interface was designed to mirror the aesthetic of existing university websites, utilizing blue and yellow to provide a consistent experience. The system is intuitive and easy to navigate, ensuring users can quickly access available features.

---

## Lessons Learned
During this first release, the team learned the importance of maintaining clear communication and consistent version control practices. Some challenges included managing concurrent pull requests and ensuring consistent styling across the frontend and backend. Moving forward, we plan to:
- Implement a stricter code review process.
- Enhance unit test coverage.
- Introduce detailed documentation to onboard new contributors efficiently.

---

## Demo
**Video Link:** [Q-Up System Demo](https://youtu.be/WsSoMz9_Xo0)

