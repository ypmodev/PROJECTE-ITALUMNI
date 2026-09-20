# 🎓 ITAlumni

## Description

ITAlumni is a web platform designed to connect the community of former students from IT Academy at Barcelona Activa.

It allows users to network with technical profiles and browse job opportunities and events.

> Academic project — Front-end developed with HTML, CSS and Vanilla JavaScript, using simulated data (mock data).

## 🛠 Technologies

- HTML5
- CSS3
- JavaScript (ES6+)
- JSON (mock data)
- Vitest
- Git / GitHub
- Figma
- Trello

## 🚀 Installation

### 1. Clone the repository

```bash
git clone https://github.com/ypmodev/PROJECTE-ITALUMNI.git
cd Kickoff
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the tests

```bash
npm run test
```

### 4. Run the project

Open the project using a local development server.

## 📁 Project Structure

```text
Kickoff/
├── assets/                    # Images, icons and logos
│   ├── icons/
│   ├── images/
│   └── logos/
│
├── data/                      # Simulated JSON data
│   ├── events.json
│   ├── jobs.json
│   └── networking.json
│
├── pages/                     # HTML pages
│   ├── welcome.html
│   ├── register.html
│   ├── alumni-connect.html
│   └── construction.html
│
├── scripts/                   # JavaScript files
│   ├── alumni-connect/
│   │   ├── alumni-connect.js
│   │   ├── home.js
│   │   ├── networking.js
│   │   └── job-opportunity.js
│   ├── utils.js
│   ├── welcome.js
│   └── register.js
│
├── styles/                    # CSS styles
│   ├── components/
│   ├── pages-styles/
│   └── style.css
│
├── tests/                     # Unit tests
│   └── test....
│
├── .gitignore
├── package.json
└── package-lock.json
```

## 💻 Features

### Networking

- View alumni profiles.
- Search by name and skills.
- Filter profiles.

### Job Opportunities

- View job offers.
- Search by job title and tech stack.
- Filter by tech stack, contract type and location.

### Navigation

- Navigate between the different sections of the platform.

## 🧪 Testing

Unit tests are implemented using Vitest.

To run the tests:

```bash
npm run test
```

## 🎨 Design

The design was created following the wireframes and design system defined in Figma.

## 📱 Responsive Design

The project follows a Mobile First approach and includes breakpoints for tablet and desktop devices.

## 👤 Authors

Project developed by **Yanet Pérez**.
IT Academy — Barcelona Activa
