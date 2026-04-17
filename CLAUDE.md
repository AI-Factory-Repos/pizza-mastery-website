# CLAUDE.md - Pizza Mastery Website

## Project Overview

Pizza Mastery Website is an educational web application designed for intermediate home cooks who want to master the art of pizza making. The platform provides authentic, research-backed recipes for three popular pizza types (Margherita, Pepperoni, BBQ Chicken) across two distinct styles (NY-style and Deep Dish), featuring interactive step-by-step instructions with visual guides. The site emphasizes authentic regional differences in ingredients and techniques while maintaining an Italian wood-fired oven aesthetic.

## Tech Stack

**Backend:**
- Node.js with Express.js framework
- MongoDB with Mongoose ODM
- Multer for file upload handling
- CORS middleware
- Body-parser middleware
- Static file serving middleware

**Frontend:**
- Vanilla HTML5, CSS3, and JavaScript
- Responsive CSS Grid and Flexbox layouts
- CSS custom properties for theming
- Fetch API for backend communication
- Print-specific stylesheets

**Infrastructure:**
- Netlify for frontend hosting
- MongoDB Atlas or local MongoDB instance
- Local filesystem or cloud storage for images

## Architecture

The project follows a traditional client-server architecture with a RESTful API:

```
/
├── backend/
│   ├── models/
│   │   ├── Recipe.js
│   │   └── Step.js
│   ├── routes/
│   │   ├── recipes.js
│   │   └── upload.js
│   ├── middleware/
│   │   └── upload.js
│   ├── data/
│   │   └── seedData.js
│   ├── uploads/
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── css/
│   │   ├── main.css
│   │   ├── print.css
│   │   └── components.css
│   ├── js/
│   │   ├── api.js
│   │   ├── main.js
│   │   ├── recipe.js
│   │   └── comparison.js
│   ├── images/
│   ├── index.html
│   ├── recipe.html
│   └── comparison.html
└── README.md
```

**Communication:** Frontend communicates with backend via REST API using fetch() calls. All data exchange happens through JSON payloads.

## Build & Development Commands

**Backend:**
```bash
cd backend
npm install
npm run dev          # Start development server with nodemon
npm start           # Start production server
npm run seed        # Populate database with recipe data
```

**Frontend:**
```bash
cd frontend
# No build process required - serve static files
# For development: use Live Server extension or:
python -m http.server 8000
# For production: deploy to Netlify or similar static host
```

## Environment Variables

```bash
# Backend .env file
PORT=5000
MONGODB_URI=mongodb://localhost:27017/pizza-mastery
NODE_ENV=development
UPLOAD_PATH=./uploads
MAX_FILE_SIZE=5242880
ALLOWED_FILE_TYPES=image/jpeg,image/png,image/webp
FRONTEND_URL=http://localhost:8000
```

## API Endpoints

| Method | Path | Description | Auth Required |
|--------|------|-------------|---------------|
| GET | `/api/recipes` | List all recipes with optional filtering by pizza_type and style | No |
| GET | `/api/recipes/:id` | Get single recipe with full details | No |
| GET | `/api/recipes/:id/steps` | Get all steps for a specific recipe | No |
| POST | `/api/upload` | Upload recipe step images | No |
| GET | `/uploads/:filename` | Serve uploaded images | No |

**Query Parameters for `/api/recipes`:**
- `pizza_type`: Filter by Margherita, Pepperoni, or BBQ Chicken
- `style`: Filter by NY-style or Deep Dish

## Database Schema

**Recipe Model:**
```javascript
{
  _id: ObjectId,
  name: String (required), // "NY-Style Margherita"
  description: String,
  pizza_type: String (enum: ['Margherita', 'Pepperoni', 'BBQ Chicken']),
  style: String (enum: ['NY-style', 'Deep Dish']),
  prep_time: Number, // minutes
  cook_time: Number, // minutes  
  difficulty: String (enum: ['Easy', 'Medium', 'Hard']),
  ingredients: [{
    name: String,
    amount: String,
    unit: String,
    notes: String
  }],
  image_url: String,
  created_at: Date,
  updated_at: Date
}
```

**Step Model:**
```javascript
{
  _id: ObjectId,
  step_number: Number (required),
  title: String (required),
  description: String (required),
  image_url: String,
  recipe_id: ObjectId (ref: 'Recipe'),
  tips: String,
  timing_notes: String,
  created_at: Date
}
```

**Relationships:**
- Recipe has many Steps (one-to-many via recipe_id foreign key)

## Key Algorithms & Patterns

**Recipe Data Organization:** Each pizza type (Margherita, Pepperoni, BBQ Chicken) exists in two style variations with authentically different ingredients and techniques researched from traditional sources.

**Interactive UI Pattern:** Expandable step containers use CSS transitions and JavaScript toggle states. Steps collapse to show "Step X: [Title]" and expand to reveal full instructions and images.

**Comparison Logic:** Side-by-side recipe comparison filters recipes by pizza_type but different styles, highlighting ingredient and technique differences.

**Image Management:** File uploads are handled with Multer middleware, images are stored locally with URL generation, and proper MIME type validation.

**Error Handling:** Frontend implements loading states, skeleton screens, retry mechanisms, and graceful degradation for network failures.

## What Was Built (Tickets)

**Foundation Phase:**
- **BE-1:** Set up Node.js backend with MongoDB and basic project structure — Established Express server foundation with Mongoose, CORS, middleware stack, and environment configuration
- **BE-2:** Create Recipe and Step data models — Implemented MongoDB schemas with proper relationships, validation rules, and embedded ingredient structures
- **BE-3:** Seed database with pizza recipe data — Researched and created authentic recipe data for all 6 combinations (3 pizza types × 2 styles) with complete ingredients and instructions

**Core Phase:**
- **BE-4:** Create Recipe API endpoints — Built REST API with filtering capabilities, single recipe retrieval, and step-specific endpoints
- **FE-1:** Set up frontend structure with Italian pizza theme — Created responsive HTML/CSS foundation with wood-fired oven aesthetic using warm colors and rustic textures
- **FE-2:** Build homepage with recipe overview grid — Implemented recipe card grid with filtering, difficulty indicators, and cooking time display
- **FE-3:** Create detailed recipe page layout — Built individual recipe template with header sections, ingredients lists, and responsive design
- **FE-4:** Implement expandable step-by-step instructions — Created accordion-style step containers with smooth CSS transitions and JavaScript interactivity

**Integration Phase:**
- **BE-5:** Add image upload and management system — Implemented file upload endpoints with image storage, URL generation, and proper validation
- **FE-5:** Connect frontend to recipe API and implement data fetching — Integrated all API endpoints with loading states and error handling throughout the frontend
- **FE-6:** Add recipe comparison feature — Built side-by-side comparison view highlighting differences between NY-style and Deep Dish variations of same pizza types

**Polish Phase:**
- **FE-7:** Implement print-friendly recipe format — Added print stylesheets and print buttons with clean, expanded layout optimized for physical printing
- **FE-8:** Add loading states and error boundaries — Enhanced UX with skeleton screens, loading spinners, retry mechanisms, and graceful error recovery

## Known Constraints & Notes

**Design Decisions:**
- No user authentication system by design — keeps the site focused purely on educational content without registration barriers
- Local file storage for images — suitable for current scope but may need cloud storage migration for production scaling
- Vanilla JavaScript chosen over frameworks to maintain simplicity and fast loading times

**Technical Constraints:**
- Frontend is static HTML/CSS/JS requiring separate backend deployment
- Image uploads currently stored locally — requires persistent filesystem in production
- MongoDB connection assumes either local instance or Atlas cloud service

**Content Notes:**
- All recipe variations are researched for authenticity — Deep Dish and NY-style have meaningfully different ingredients and techniques
- Step images are expected to be provided via upload system — seed data may reference placeholder images
- Italian aesthetic uses specific color palette and typography choices that should be maintained in future updates

**Future Agent Considerations:**
- Recipe comparison logic assumes exactly 2 styles per pizza type — expanding to more styles requires UI/UX redesign
- Print functionality strips all interactive elements — any new dynamic features need print stylesheet considerations
- Error handling gracefully degrades to show cached/placeholder content when API is unavailable