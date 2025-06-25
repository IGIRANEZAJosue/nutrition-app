# NutritionHD API Documentation

## Overview
The NutritionHD API is a comprehensive meal planning system that uses TensorFlow models, wearable device data, and nutrition history to generate personalized meal recommendations. The API now includes user authentication, MongoDB persistence, and enhanced personalization features.

## Base URL
```
http://localhost:8080
```

## Authentication
The API uses JWT (JSON Web Tokens) for authentication. Most endpoints require authentication via the `Authorization` header:

```
Authorization: Bearer <access_token>
```

## Database Schema

### Collections

#### Users
```json
{
  "_id": "ObjectId",
  "username": "string",
  "email": "string",
  "hashed_password": "string",
  "first_name": "string",
  "last_name": "string",
  "is_active": "boolean",
  "is_verified": "boolean",
  "profile": "object",
  "preferences": "object",
  "created_at": "datetime",
  "updated_at": "datetime",
  "last_login": "datetime"
}
```

#### Heart Rate Data
```json
{
  "_id": "ObjectId",
  "user_id": "string",
  "timestamp": "datetime",
  "bpm": "number",
  "hrv": "number",
  "created_at": "datetime"
}
```

#### Sleep Data
```json
{
  "_id": "ObjectId",
  "user_id": "string",
  "date": "string (YYYY-MM-DD)",
  "duration_hours": "number",
  "quality_score": "number",
  "sleep_efficiency": "number",
  "deep_sleep_hours": "number",
  "rem_sleep_hours": "number",
  "created_at": "datetime"
}
```

#### Activity Data
```json
{
  "_id": "ObjectId",
  "user_id": "string",
  "timestamp": "datetime",
  "steps": "number",
  "calories_burned": "number",
  "activity_type": "string",
  "intensity": "string",
  "created_at": "datetime"
}
```

#### Stress Data
```json
{
  "_id": "ObjectId",
  "user_id": "string",
  "timestamp": "datetime",
  "stress_level": "string",
  "stress_score": "number",
  "created_at": "datetime"
}
```

#### Meals
```json
{
  "_id": "ObjectId",
  "user_id": "string",
  "timestamp": "datetime",
  "meal_type": "string",
  "recipe_name": "string",
  "calories": "number",
  "nutrients": "object",
  "satisfaction_rating": "number",
  "created_at": "datetime"
}
```

## Authentication Endpoints

### Register User
**POST** `/auth/register`

Register a new user account.

**Request Body:**
```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "securepassword123",
  "first_name": "John",
  "last_name": "Doe",
  "profile": {
    "weight_kg": 70,
    "height_cm": 175,
    "age": 30,
    "gender": "male"
  },
  "preferences": {
    "dietary_restrictions": ["vegetarian"],
    "allergies": ["nuts"]
  }
}
```

**Response:**
```json
{
  "message": "User registered successfully",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "username": "john_doe",
    "email": "john@example.com",
    "first_name": "John",
    "last_name": "Doe",
    "is_active": true,
    "is_verified": false
  }
}
```

### Login User
**POST** `/auth/login`

Authenticate user and get access tokens.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "securepassword123"
}
```

**Response:**
```json
{
  "access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
  "refresh_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
  "token_type": "bearer",
  "expires_in": 1800,
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "username": "john_doe",
    "email": "john@example.com",
    "first_name": "John",
    "last_name": "Doe",
    "is_active": true,
    "is_verified": false
  }
}
```

### Refresh Token
**POST** `/auth/refresh`

Refresh an expired access token.

**Request Body:**
```json
{
  "refresh_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9..."
}
```

**Response:**
```json
{
  "access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
  "token_type": "bearer",
  "expires_in": 1800
}
```

### Get Current User
**GET** `/auth/me`

Get current user information.

**Headers:**
```
Authorization: Bearer <access_token>
```

**Response:**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "username": "john_doe",
  "email": "john@example.com",
  "first_name": "John",
  "last_name": "Doe",
  "is_active": true,
  "is_verified": false,
  "profile": {
    "weight_kg": 70,
    "height_cm": 175,
    "age": 30,
    "gender": "male"
  }
}
```

### Update Profile
**PUT** `/auth/profile`

Update user profile information.

**Headers:**
```
Authorization: Bearer <access_token>
```

**Request Body:**
```json
{
  "first_name": "Johnny",
  "profile": {
    "weight_kg": 72,
    "height_cm": 175,
    "age": 31,
    "gender": "male"
  }
}
```

## Wearable Data Endpoints

### Add Wearable Data
**POST** `/wearable/data`

Add wearable device data for the authenticated user.

**Headers:**
```
Authorization: Bearer <access_token>
```

**Request Body:**
```json
{
  "heart_rate": [
    {
      "timestamp": "2024-01-15T10:30:00Z",
      "bpm": 75,
      "hrv": 45
    }
  ],
  "sleep": [
    {
      "date": "2024-01-15",
      "duration_hours": 7.5,
      "quality_score": 0.8,
      "sleep_efficiency": 0.85,
      "deep_sleep_hours": 2.0,
      "rem_sleep_hours": 1.8
    }
  ],
  "activity": [
    {
      "timestamp": "2024-01-15T08:00:00Z",
      "steps": 8500,
      "calories_burned": 450,
      "activity_type": "walking",
      "intensity": "moderate"
    }
  ],
  "stress": [
    {
      "timestamp": "2024-01-15T12:00:00Z",
      "stress_level": "low",
      "stress_score": 30
    }
  ]
}
```

### Get Daily Summary
**GET** `/wearable/summary/{date}`

Get wearable data summary for a specific date.

**Headers:**
```
Authorization: Bearer <access_token>
```

**Response:**
```json
{
  "date": "2024-01-15",
  "heart_rate": {
    "average": 75.2,
    "max": 120,
    "min": 65,
    "variability": 55.0
  },
  "stress": {
    "level": "low",
    "score": 30.0
  },
  "activity": {
    "total_steps": 8500,
    "calories_burned": 450.0,
    "intensity": "moderate",
    "activity_count": 1
  },
  "sleep": {
    "duration_hours": 7.5,
    "quality_score": 0.8,
    "efficiency": 0.85,
    "deep_sleep_hours": 2.0,
    "rem_sleep_hours": 1.8,
    "sleep_quality": "good"
  },
  "overall_health_score": 78.5
}
```

### Get Current Summary
**GET** `/wearable/summary`

Get today's wearable data summary.

**Headers:**
```
Authorization: Bearer <access_token>
```

### Get Wearable History
**GET** `/wearable/history?days=7`

Get wearable data history for the specified number of days.

**Headers:**
```
Authorization: Bearer <access_token>
```

## Nutrition History Endpoints

### Add Nutrition History
**POST** `/nutrition/history`

Add a meal to nutrition history.

**Headers:**
```
Authorization: Bearer <access_token>
```

**Request Body:**
```json
{
  "timestamp": "2024-01-15T12:30:00Z",
  "meal_type": "lunch",
  "recipe_name": "Grilled Chicken Salad",
  "calories": 450,
  "nutrients": {
    "protein": 35,
    "carbs": 25,
    "fat": 20,
    "fiber": 8
  },
  "satisfaction_rating": 4
}
```

### Get Nutrition Trends
**GET** `/nutrition/trends?days=7`

Get nutrition trends from recent history.

**Headers:**
```
Authorization: Bearer <access_token>
```

**Response:**
```json
{
  "average_daily_calories": 1850.5,
  "nutrient_averages": {
    "protein": 120.3,
    "carbs": 200.1,
    "fat": 65.2,
    "fiber": 25.8
  },
  "meal_patterns": {
    "breakfast": 7,
    "lunch": 7,
    "dinner": 7
  },
  "satisfaction_trend": 3.8,
  "calorie_variance": 245.6
}
```

### Get Food Preferences
**GET** `/nutrition/preferences?top_n=10`

Get user's food preferences and avoidances.

**Headers:**
```
Authorization: Bearer <access_token>
```

**Response:**
```json
{
  "preferred_foods": [
    "Grilled Chicken Salad",
    "Quinoa Bowl",
    "Avocado Toast"
  ],
  "avoided_foods": [
    "Spicy Tacos",
    "Heavy Pasta"
  ]
}
```

### Get Nutrition Insights
**GET** `/nutrition/insights?days=30`

Get insights from nutrition history.

**Headers:**
```
Authorization: Bearer <access_token>
```

**Response:**
```json
{
  "user_id": "507f1f77bcf86cd799439011",
  "analysis_period_days": 30,
  "calorie_trend": {
    "average_daily": 1850.5,
    "variance": 245.6,
    "consistency": "good"
  },
  "meal_patterns": {
    "breakfast": 30,
    "lunch": 30,
    "dinner": 30
  },
  "satisfaction_trend": 3.8,
  "preferences": {
    "preferred_foods": ["Grilled Chicken Salad"],
    "avoided_foods": ["Spicy Tacos"]
  },
  "recommendations": [
    "Consider trying new recipes to improve meal satisfaction"
  ]
}
```

### Get Recent Meals
**GET** `/nutrition/meals?days=7`

Get recent meals for the user.

**Headers:**
```
Authorization: Bearer <access_token>
```

## Enhanced Meal Planning Endpoints

### Wearable-Enhanced Meal Plan
**POST** `/meal-plan/wearable-enhanced`

Generate personalized meal plan using wearable data and nutrition history.

**Headers:**
```
Authorization: Bearer <access_token>
```

**Request Body:**
```json
{
  "weight_kg": 70,
  "height_cm": 175,
  "age": 30,
  "gender": "male",
  "goal": "maintain",
  "diseases": [],
  "allergies": ["nuts"],
  "intolerances": []
}
```

### Contextual Meal Plan
**POST** `/meal-plan/contextual`

Generate meal plan based on current context (time, mood, etc.).

**Headers:**
```
Authorization: Bearer <access_token>
```

**Request Body:**
```json
{
  "weight_kg": 70,
  "height_cm": 175,
  "age": 30,
  "gender": "male",
  "goal": "maintain",
  "diseases": [],
  "allergies": ["nuts"],
  "intolerances": []
}
```

### Health Score
**GET** `/health/score?date=2024-01-15`

Get overall health score based on wearable data.

**Headers:**
```
Authorization: Bearer <access_token>
```

**Response:**
```json
{
  "user_id": "507f1f77bcf86cd799439011",
  "date": "2024-01-15",
  "health_score": 78.5,
  "breakdown": {
    "heart_rate_score": 75.2,
    "stress_score": 30.0,
    "activity_score": 8500,
    "sleep_score": 85.0
  },
  "recommendations": [
    "Great job on your sleep quality!",
    "Consider increasing your daily steps to reach 10,000"
  ]
}
```

### Weekly Meal Preview
**POST** `/meal-plan/weekly-preview`

Generate a weekly meal plan preview.

**Headers:**
```
Authorization: Bearer <access_token>
```

**Request Body:**
```json
{
  "weight_kg": 70,
  "height_cm": 175,
  "age": 30,
  "gender": "male",
  "goal": "maintain",
  "diseases": [],
  "allergies": ["nuts"],
  "intolerances": []
}
```

## Standard Meal Planning Endpoints

### Activity-Based Meal Plan
**POST** `/meal-plan/activity`

Generate meal plan based on activity level and user profile.

**Request Body:**
```json
{
  "weight_kg": 70,
  "height_cm": 175,
  "age": 30,
  "gender": "male",
  "activity_level": "moderately_active",
  "goal": "maintain",
  "diseases": [],
  "allergies": ["nuts"],
  "intolerances": [],
  "dietary_restrictions": ["vegetarian"],
  "variety_level": "maximum"
}
```

### Simple Meal Plan
**POST** `/meal-plan/simple`

Generate simple meal plan based on daily calories.

**Request Body:**
```json
{
  "daily_calories": 2000,
  "variety_level": "maximum"
}
```

### Health-Aware Meal Plan
**POST** `/meal-plan/health-aware`

Generate meal plan considering health conditions.

**Request Body:**
```json
{
  "daily_calories": 2000,
  "diseases": ["diabetes"],
  "allergies": ["nuts"],
  "intolerances": ["lactose"],
  "dietary_restrictions": ["low-sodium"],
  "variety_level": "maximum"
}
```

## Recipe Endpoints

### Random Recipe Recommendations
**POST** `/recipes/random`

Get random recipe recommendations.

**Request Body:**
```json
{
  "meal_type": "all",
  "target_calories": 400,
  "number": 5
}
```

### Maximum Variety Recipes
**POST** `/recipes/maximum-variety`

Get recipes with maximum variety.

**Request Body:**
```json
{
  "meal_type": "all",
  "target_calories": 400,
  "number": 10,
  "variety_level": "maximum"
}
```

### Recipes by Cuisine
**POST** `/recipes/by-cuisine`

Get recipes filtered by cuisine.

**Request Body:**
```json
{
  "cuisine": "mediterranean",
  "meal_type": "dinner",
  "target_calories": 500,
  "number": 5
}
```

## Model Endpoints

### Model Prediction
**POST** `/predict`

Get nutrition predictions from the TensorFlow model.

**Request Body:**
```json
{
  "input": [2000, 0, 0, 0, 0, 0, 0, 0, 0]
}
```

### Model Information
**GET** `/model-info`

Get information about the loaded model.

## Error Responses

All endpoints return consistent error responses:

```json
{
  "error": "Error message description"
}
```

Common HTTP status codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

## Rate Limiting

The API implements rate limiting to prevent abuse:
- 100 requests per minute for authenticated users
- 20 requests per minute for unauthenticated users

## Data Persistence

All data is stored in MongoDB with the following features:
- Automatic indexing for performance
- Data validation
- User isolation (users can only access their own data)
- Automatic timestamps
- Soft deletion support

## Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Token expiration and refresh
- User session management
- Input validation and sanitization
- CORS protection
- Rate limiting

## Usage Examples

### Complete Workflow

1. **Register a user:**
```bash
curl -X POST http://localhost:8080/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "password123",
    "first_name": "Test",
    "last_name": "User"
  }'
```

2. **Login and get token:**
```bash
curl -X POST http://localhost:8080/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

3. **Add wearable data:**
```bash
curl -X POST http://localhost:8080/wearable/data \
  -H "Authorization: Bearer <access_token>" \
  -H "Content-Type: application/json" \
  -d '{
    "heart_rate": [{"timestamp": "2024-01-15T10:30:00Z", "bpm": 75}],
    "activity": [{"timestamp": "2024-01-15T08:00:00Z", "steps": 8500, "calories_burned": 450}]
  }'
```

4. **Get personalized meal plan:**
```bash
curl -X POST http://localhost:8080/meal-plan/wearable-enhanced \
  -H "Authorization: Bearer <access_token>" \
  -H "Content-Type: application/json" \
  -d '{
    "weight_kg": 70,
    "height_cm": 175,
    "age": 30,
    "gender": "male",
    "goal": "maintain"
  }'
```

## Environment Variables

Set these environment variables for production:

```bash
JWT_SECRET_KEY=your-secure-secret-key
SPOONACULAR_API_KEY=your-spoonacular-api-key
FLASK_ENV=production
```

## Database Connection

The API connects to MongoDB using the provided connection string:
```
mongodb+srv://wizzysharifivk:sVEwExnolyvad7cS@cluster0.xgkbwkt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
```

Database name: `nutrition_hd_db`

## Support

For API support and questions, please refer to the project documentation or create an issue in the repository. 