# Tabbed Menu Web Application

A responsive web application with a tabbed interface that simulates REST API calls for each menu item. Built for the Higher Institute of Science midterm assignment using modern frontend technologies and deployed via Docker.

## Table of Contents

- [Tabbed Menu Web Application](#tabbed-menu-web-application)
  - [Project Summary](#project-summary)
  - [Core Features](#core-features)
  - [Menu Structure](#menu-structure)
  - [Technologies Used](#technologies-used)
  - [Project Structure](#project-structure)
  - [Docker Deployment](#docker-deployment)
    - [Build the Image](#build-the-image)
    - [Run the Container](#run-the-container)
  - [Local Setup](#local-setup)
    - [Clone the Repository](#clone-the-repository)
    - [Navigate to Project Folder](#navigate-to-project-folder)
  - [How to Use](#how-to-use)
  - [Contributors](#contributors)

---

## Project Summary

This web application was designed as a course project to showcase how frontend interfaces can mimic backend behavior. When the user interacts with a menu item, the application simulates a REST API call with a status response, delay, and loading states — all inside a clean tabbed layout.

---

## Core Features

**Tabbed Navigation**
- 3 distinct tabs with separate categories
- Active tab highlighting and smooth transitions

**Simulated REST API**
- Emulates network calls with loading, success, and error states
- Feedback is shown in a fixed bottom bar
- Prevents multiple concurrent requests

**Responsive & User-Friendly UI**
- Optimized for desktop and mobile
- Clean design with hover and click animations
- Semantic HTML and accessible structure

---

## Menu Structure

- **Tab 1**: 5 menu items (Main Dishes)  
- **Tab 2**: 4 menu items (Beverages)  
- **Tab 3**: 3 menu items (Desserts)

---

## Technologies Used

| Feature            | Stack                  |
|--------------------|------------------------|
| Frontend           | HTML5, CSS3, JavaScript|
| Web Server         | Apache httpd (in Docker) |
| Container Platform | Docker                 |
| Version Control    | Git, GitHub            |

---

## Project Structure

```text
Tabbed-Menu-WebApp/
├── index.html         # Core HTML file
├── style.css          # All UI styling
├── script.js          # JavaScript logic and interactivity
├── Dockerfile         # Docker build configuration
└── README.md          # Project documentation
```

---

## Docker Deployment

Apache is already included inside the Docker container — no need to install it manually.

### Build the Image
```bash
docker build -t tabbed-menu-app .
```

### Run the Container
```bash
docker run -d -p 8081:80 tabbed-menu-app
```

Then open your browser at: [http://localhost:8081](http://localhost:8081)

---

## Local Setup

### Clone the Repository
```bash
git clone https://github.com/Abdelhakk1/Tabbed-Menu-WebApp.git
```

### Navigate to Project Folder
```bash
cd Tabbed-Menu-WebApp
```

---

## How to Use

1. Select a tab to view menu items by category
2. Click a menu item to trigger a simulated API call
3. A message will appear in the status bar:
   - Blue “Loading...” state
   - Green “Success” ✅ or red “Error” ❌ after 1–3 seconds
4. While a call is in progress, interactions are temporarily disabled

---

## Contributors

- **Abdelkader Kheddaoui**
- **Abdelhak** ([GitHub](https://github.com/Abdelhakk1) · [DockerHub](https://hub.docker.com/u/abdellhak))
- **Gueni Mohamed**
