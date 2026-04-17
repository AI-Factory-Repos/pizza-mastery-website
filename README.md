# Pizza Mastery Website

A comprehensive educational web application designed for intermediate home cooks who want to master the art of pizza making. Learn authentic techniques for creating Margherita, Pepperoni, and BBQ Chicken pizzas in both NY-style and Deep Dish variations with detailed step-by-step instructions and visual guides.

## Live Demo

🍕 **[View Live Site](https://pizza-mastery-website.netlify.app)**

## Features

- **6 Authentic Pizza Recipes** — Margherita, Pepperoni, and BBQ Chicken each available in NY-style and Deep Dish variations
- **Interactive Step-by-Step Instructions** — Expandable accordion interface with detailed technique explanations
- **Visual Learning** — Recipe images and step illustrations to guide the cooking process
- **Recipe Comparison** — Side-by-side comparison tool to understand differences between styles
- **Print-Friendly Format** — Clean printable recipe cards with QR codes for easy kitchen reference
- **Responsive Design** — Works seamlessly on desktop, tablet, and mobile devices
- **Italian-Themed Aesthetic** — Warm, rustic design inspired by traditional wood-fired pizza ovens
- **Smart Filtering** — Filter recipes by pizza type, style, or difficulty level

## Tech Stack

**Backend:**
- Node.js with Express.js
- MongoDB with Mongoose ODM
- Multer for image upload handling
- Sharp for image processing

**Frontend:**
- Vanilla HTML5, CSS3, and JavaScript
- Responsive CSS Grid and Flexbox
- CSS animations and transitions
- Print-specific stylesheets

**Deployment:**
- Netlify for static frontend hosting
- MongoDB Atlas for database hosting

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd pizza-mastery-website
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   cp .env.example .env
   ```

3. **Configure Environment Variables**
   
   Edit `backend/.env` with your values:
   ```
   MONGO_URI=mongodb://localhost:27017/pizza-mastery
   PORT=3000
   UPLOAD_DIR=uploads
   ```

4. **Seed the Database**
   ```bash
   npm run seed
   ```

5. **Start the Backend Server**
   ```bash
   npm start
   ```

6. **Frontend Setup**
   
   Open a new terminal and serve the frontend (using any static server):
   ```bash
   cd frontend
   # Using Python 3
   python -m http.server 8000
   
   # Or using Node.js http-server
   npx http-server -p 8000
   ```

7. **Access the Application**
   
   Open your browser and navigate to `http://localhost:8000`

## Project Structure

```
pizza-mastery-website/
├── backend/                 # Node.js/Express API server
│   ├── config/             # Database and upload configuration
│   ├── models/             # MongoDB/Mongoose schemas
│   ├── routes/             # API route handlers
│   ├── scripts/            # Utility scripts (bulk upload)
│   ├── seeds/              # Database seeding data and scripts
│   └── utils/              # Helper utilities (image processing)
├── frontend/               # Static web frontend
│   ├── css/               # Stylesheets (main, print)
│   ├── js/                # JavaScript modules
│   ├── index.html         # Homepage with recipe grid
│   ├── recipe.html        # Individual recipe detail page
│   └── compare.html       # Recipe comparison page
└── netlify.toml           # Netlify deployment configuration
```

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/health` | Server health check |
| GET | `/api/recipes` | Get all recipes with optional filtering |
| GET | `/api/recipes/:id` | Get specific recipe by ID |
| GET | `/api/recipes/:id/steps` | Get step-by-step instructions for a recipe |
| POST | `/api/upload` | Upload recipe images |

## License

MIT