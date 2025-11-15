# 🔮 DeepfakeDetectorFrontend: Image Forgery Analysis

A modern, React-based web application for instantly detecting deepfake and synthetically generated images using an integrated Machine Learning backend.

## ✨ Features

* **Image Upload & Preview:** Easy drag-and-drop or file selection for image analysis.
* **Real-time Analysis:** Seamless integration with a FastAPI backend to get instant deepfake detection results.
* **Intuitive UI:** Clean, dark-mode interface utilizing **Glassmorphism** and vibrant gradient colors for an engaging user experience.
* **Responsive Design:** Fully optimized for desktop and mobile use.
* **Page Navigation:** Dedicated sections for **Home (Detector)**, **About**, and **Technology** overview.
* **Loading States:** Clear visual feedback using a **Cyan/Purple rotating spinner** during API processing.

---

## 🛠️ Tech Stack

This project is built using a modern JavaScript frontend ecosystem.

### Frontend
* **Framework:** **React** (v19.2.0)
* **Language:** JavaScript (ES6+ / JSX)
* **Styling:** CSS3 (Custom styles with **Glassmorphism**)
* **State Management:** React Hooks (`useState`, `useEffect`)
* **Build Tool:** Create React App (`react-scripts 5.0.1`)

### Backend Integration
* **API Framework:** **FastAPI** (Python)
* **Endpoint:** `/predict/` (POST request with `multipart/form-data`)
* **ML Model:** **EfficientNet-B4** (PyTorch) for image classification.
* **Base URL:** `http://127.0.0.1:8000` (Configurable via `REACT_APP_API_URL` environment variable)

---

## ⚙️ Project Structure

The application follows a standard Create React App structure, organized for clarity and scalability.

### Key Components

* **`App.js`:** Handles image upload, file validation, API integration, result display, and main navigation logic.
* **`Navbar.js`:** Provides navigation links to **Home**, **About**, and **Technology**. Features gradient branding and active link highlighting.
* **`Footer.js`:** Displays copyright information and technology attribution.

---

## 🚀 Getting Started

### Prerequisites

You must have **Node.js (v14+)** and **npm** installed.

**Note:** This is the frontend repository. You will need the corresponding **FastAPI Backend** running locally on port **8000** for the detection features to work.

### Installation

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/Saurav-kan/DeepfakeDetectorFrontend.git](https://github.com/Saurav-kan/DeepfakeDetectorFrontend.git)
    cd DeepfakeDetectorFrontend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

### Running Locally

1.  **Start the application:**
    ```bash
    npm start
    ```
    The application will open in your browser at `http://localhost:3000`. It features **Hot Reload** for efficient development.

2.  *(Optional)* **Configure API URL:**
    To point to a different backend server, create a `.env` file in the root directory and set the environment variable:
    ```
    REACT_APP_API_URL=http://your-backend-url:port
    ```

---

## 🧪 Testing

The project uses **Jest** in conjunction with **React Testing Library** for component and DOM testing.

* **Run tests:**
    ```bash
    npm test
    ```
* **Libraries:** `@testing-library/react`, `@testing-library/dom`, `@testing-library/jest-dom`.
* **Test files:** Located throughout the `src/` directory (e.g., `App.test.js`).

---

## 📦 Building for Production

To create an optimized production build:

```bash
npm run build
