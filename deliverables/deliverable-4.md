# Q-Up: AML Reservation and Match Scheduling System

## Introduction
Q-Up is an advanced scheduling application designed to streamline match organization and PC reservations in the Advanced Media Lab (AML). It enhances the AML experience by providing a structured Reservation System for PCs, real-time PC Availability tracking, and an integrated Calendar for listing events and match schedules. Competitive Players can reserve specific PCs in advance, with priority for official matches, while Casual Players can also utilize available PCs. Automated Notifications prevent double bookings and alert users of schedule changes, ensuring smooth coordination and minimizing conflicts. Q-Up improves communication, reduces scheduling confusion, and creates a more organized and engaging environment for all AML participants.

**GitHub Link:** [Q-Up Repository](https://github.com/acc668/CS386_Group1)

---

## Requirements
List of implemented requirements and corresponding pull requests:

### Frontend
- **Requirement:** User authentication  
  **Issue:** [#1 - User Authentication](<link to issue>)  
  **Pull request:** [#12 - Implement Authentication](https://github.com/acc668/CS386_Group1/pull/12)  
  **Implemented by:** Alice Johnson  
  **Approved by:** Bob Smith  
  **Print screen:** ![Authentication Screenshot](<insert image link>)

- **Requirement:** Real-time availability display  
  **Issue:** [#2 - Real-time Display](<link to issue>)  
  **Pull request:** [#15 - Availability Display](https://github.com/acc668/CS386_Group1/pull/15)  
  **Implemented by:** Charlie Brown  
  **Approved by:** Alice Johnson  
  **Print screen:** ![Availability Display Screenshot](<insert image link>)

- **Requirement:** Basic admin controls  
  **Issue:** [#3 - Admin Controls](<link to issue>)  
  **Pull request:** [#18 - Admin Panel](https://github.com/acc668/CS386_Group1/pull/18)  
  **Implemented by:** Bob Smith  
  **Approved by:** Charlie Brown  
  **Print screen:** ![Admin Controls Screenshot](<insert image link>)

### Backend
- **Requirement:** PC reservation system  
  **Issue:** [#4 - PC Reservation](<link to issue>)  
  **Pull request:** [#21 - Reservation System](https://github.com/acc668/CS386_Group1/pull/21)  
  **Implemented by:** Daniel Lee  
  **Approved by:** Alice Johnson  
  **Print screen:** ![Reservation System Screenshot](<insert image link>)

- **Requirement:** Automated notifications  
  **Issue:** [#5 - Notifications](<link to issue>)  
  **Pull request:** [#23 - Notifications System](https://github.com/acc668/CS386_Group1/pull/23)  
  **Implemented by:** Ethan White  
  **Approved by:** Bob Smith  
  **Print screen:** ![Notifications Screenshot](<insert image link>)

---

## Technology
### Adopted Technologies:
- **Express JS:** Backend framework for handling HTTP requests efficiently.
- **Node JS:** JavaScript runtime for backend processing.
- **QT:** Framework for building cross-platform desktop applications.
- **BCrypt:** Secure hashing for user passwords.
- **Express Session:** Session management for authentication.
- **Passport:** Authentication middleware for Node.js.
- **MySQL:** Relational database for storing reservation and user data.
- **GLFW:** Windowing library for configuring OpenGL usage in desktop applications.
- **Dear ImGui (Desktop Version):** Lightweight UI library for seamless graphics integration.

---

## Deployment
- **Link to production system:** [Q-Up Live System](https://aan266.z13.web.core.windows.net/)
- **Deployment Details:**
    - Hosted on **Azure** using Azure App Services for easy deployment and scaling.
    - Continuous Integration and Continuous Deployment (CI/CD) pipeline set up with **GitHub Actions** for automatic testing and deployment to Azure.
    - **Azure SQL Database** is used for the MySQL database to handle reservations and user data.
    - **Azure Monitor** is configured for real-time performance monitoring and logging of the system in production.

---

## Licensing
We adopted the **MIT License** because it is a permissive license that allows broad use, modification, and distribution of the software. It ensures that anyone can use the software in private or commercial projects while providing minimal restrictions. The simplicity and permissiveness of the MIT License make it a great choice for promoting collaboration and innovation while still protecting the authors by requiring attribution.

---

## Readme and Documentation
- **Readme File:** [README.md](https://github.com/acc668/CS386_Group1/blob/main/README.md)  
- **Contributing Guidelines:** [CONTRIBUTING.md](https://github.com/acc668/CS386_Group1/blob/main/CONTRIBUTING.md)  
- **License File:** [LICENSE](https://github.com/acc668/CS386_Group1/blob/main/LICENSE)  
- **Code of Conduct:** [CODE_OF_CONDUCT.md](https://github.com/acc668/CS386_Group1/blob/main/CODE_OF_CONDUCT.md)  

---

## UX Design
The user interface was designed to mirror the aesthetic of existing university websites, utilizing blue and yellow to provide a consistent experience. The system is intuitive and easy to navigate, ensuring users can quickly access available features. Below are some screenshots demonstrating the interface:

- **Login Page:** ![Login Screenshot](<insert image link>)
- **PC Availability Display:** ![Availability Screenshot](<insert image link>)
- **Admin Control Panel:** ![Admin Panel Screenshot](<insert image link>)

---

## Lessons Learned
During this first release, the team learned the importance of maintaining clear communication and consistent version control practices. Some challenges included managing concurrent pull requests and ensuring consistent styling across the frontend and backend. Moving forward, we plan to:
- Implement a stricter code review process.
- Enhance unit test coverage.
- Introduce detailed documentation to onboard new contributors efficiently.

---

## Demo
**Video Link:** [Q-Up System Demo](<insert demo link here>)
