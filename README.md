# VibeUp - Event Discovery & Management Platform

## 🚀 Overview

**VibeUp** is a modern, responsive web application designed to help users discover, host, and manage local events. Built with a "Mobile-First" philosophy, it offers a seamless experience across desktop and mobile devices, featuring interactive maps, real-time filtering, and social engagement tools.

This project demonstrates a full-stack implementation with a focus on **Clean Architecture**, **Responsive UX**, and **Modern React Patterns**.

## ✨ Key Features (MVP)

The Minimum Viable Product (MVP) includes the following core functionalities:

- **📱 Hybrid Responsive Design**:
  - **Desktop**: Full split-screen view with interactive map and side-by-side event list.
  - **Mobile**: Native-app-like experience with bottom navigation, touch-optimized swipeable filters, and a vertical scrolling grid.
- **🌍 Interactive Map Integration**:
  - Visual discovery of events using Google Maps API.
  - Dynamic clustering and location-based filtering.
- **🎉 Event Management**:
  - **Create/Host**: intuitive multi-step forms for creating public events.
  - **RSVP System**: Users can attend events and manage their schedule.
  - **My Events Dashboard**: A personalized hub for tracking hosted and attended events.
- **🔐 Authentication**: Secure Google OAuth 2.0 integration for one-tap sign-in.
- **🌐 Internationalization (i18n)**: Full multi-language support (English & Bulgarian) with auto-detection and mobile-specific language switchers.

## 🛠️ Tech Stack

### Frontend

- **Framework**: [React 19](https://react.dev/) + [Vite](https://vitejs.dev/) - Utilizing the latest React features for optimal performance.
- **Language**: [TypeScript](https://www.typescriptlang.org/) - For type safety and scalable code quality.
- **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/) - Centralized state for user sessions and global app data.
- **Styling**:
  - [Tailwind CSS](https://tailwindcss.com/) - Utility-first styling for rapid UI development.
  - [Material Tailwind](https://www.material-tailwind.com/) - Accessible, modern UI components.
  - [Framer Motion](https://www.framer.com/motion/) - Smooth layout transitions and micro-interactions.
- **Routing**: [React Router v7](https://reactrouter.com/) - enabling robust client-side navigation.
- **Maps**: `@react-google-maps/api` - Deep integration with Google Maps Platform.
- **Localization**: `i18next` - Enterprise-grade internationalization framework.

### Backend (Overview)

- **API**: RESTful API built with Node.js/TypeScript.
- **Database**: PostgreSQL for robust relational data management.
- **Architecture**: Domain-Driven Design (DDD) principles to ensure scalability and maintainability.

## 📦 Getting Started

1.  **Clone the repository**

    ```bash
    git clone https://github.com/yourusername/vibeup-frontend.git
    cd vibeup-frontend
    ```

2.  **Install dependencies**

    ```bash
    npm install
    ```

3.  **Environment Setup**
    Create a `.env` file in the root directory and add your keys:

    ```env
    VITE_GOOGLE_MAPS_API_KEY=your_key_here
    VITE_GOOGLE_CLIENT_ID=your_oauth_client_id
    VITE_API_URL=http://localhost:3000
    ```

4.  **Run Development Server**
    ```bash
    npm run dev
    ```

## 🔮 Future Enhancements

- **Social & Chat**: Real-time chat for event attendees.
- **Ticketing**: Payment integration for paid events (Stripe).
- **Advanced Recommendations**: AI-driven event suggestions based on user interests.

---

_Built with ❤️ for the community._
