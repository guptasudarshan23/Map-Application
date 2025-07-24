# Doctor-Patient Location Finder App 🗺️

This is a full-stack MERN application that allows patients to:

- Add clinic locations via Google Maps
- Search for nearby doctors using geolocation
- View doctor details based on distance

## 🛠️ Tech Stack

- **Frontend**: React + Vite + Google Maps JS API
- **Backend**: Express + MongoDB + Mongoose
- **Geospatial**: MongoDB $near and 2dsphere index

## 📦 Installation

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/yourrepo.git
cd yourrepo


# For client
cd client
npm install

# For server
cd ../server
npm install


MONGODB_URI=your_mongodb_uri
PORT=5000

npm run dev