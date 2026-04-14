# TravelSnap - Travel Journal App

A Progressive Web App (PWA) for documenting travel experiences with photos and location data. Built with React, Vite, and Tailwind CSS.

## Features

- **CRUD Operations**: Create, read, update, and delete travel journal entries
- **Camera Integration**: Capture photos using device camera or upload from gallery
- **Geolocation**: Automatically record GPS coordinates for each entry
- **Interactive Map**: View all entries on an interactive Leaflet map
- **Persistent Storage**: All data stored locally using IndexedDB (via Dexie.js)
- **PWA Support**: Installable on mobile devices, works offline
- **Responsive Design**: Mobile-first UI optimised for all screen sizes
- **Search**: Filter entries by title or description

## Tech Stack

- **React 19** - UI framework
- **Vite** - Build tool
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Dexie.js** - IndexedDB wrapper for persistent storage
- **Leaflet / React-Leaflet** - Interactive maps
- **Lucide React** - Icon library
- **Service Worker** - Offline caching and PWA support

## Prerequisites

- **Node.js** >= 18.x
- **npm** >= 9.x

## Installation

1. Clone the repository:

```bash
git clone <your-repo-url>
cd travel-snap
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open `http://localhost:5173` in your browser.

## Build for Production

```bash
npm run build
```

The built files will be in the `dist/` folder, ready for deployment.

## Deployment

This app can be deployed to **Netlify**, **Vercel**, or any static hosting platform:

### Netlify

1. Push your code to GitHub.
2. Connect your GitHub repository to Netlify.
3. Set build command to `npm run build` and publish directory to `dist`.

### Vercel

1. Push your code to GitHub.
2. Import the repository in Vercel.
3. Vercel will auto-detect Vite and configure the build.

## Usage Guide

1. **Create an Entry**: Tap the "New Entry" button in the header. Fill in the title, date, description. Use "Take Photo" to capture an image or "Upload" to select from your gallery. Tap "Get Current Location" to record your GPS position. Save the entry.

2. **View Entries**: The home page displays all journal entries as cards. Use the search bar to filter entries.

3. **Edit / Delete**: Tap any entry card to view details. Use the "Edit" button to modify or "Delete" to remove.

4. **Map View**: Navigate to the Map tab to see all entries with location data plotted on an interactive map.

5. **Install as PWA**: On a mobile browser, use "Add to Home Screen" to install the app.

## Project Structure

```
travel-snap/
├── public/
│   ├── icons/          # PWA icons
│   ├── manifest.json   # PWA manifest
│   └── sw.js           # Service worker
├── src/
│   ├── components/     # Reusable UI components
│   ├── db/             # Dexie.js database layer
│   ├── hooks/          # Custom React hooks
│   ├── pages/          # Page components
│   ├── App.jsx         # Root component with routing
│   ├── main.jsx        # Entry point
│   └── index.css       # Global styles + Tailwind
├── index.html
├── vite.config.js
└── package.json
```

## Licence

This project is created for academic purposes as part of COMP10013 Dynamic Web Technologies at UWS.
