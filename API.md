# API Documentation

## Base URL
```
http://localhost:3000/api
```

## Endpoints

### Authentication

#### POST /auth/login
Авторизация пользователя через Telegram

**Request Body:**
```json
{
  "telegramId": "123456789",
  "username": "john_doe"
}
```

**Response:**
```json
{
  "status": "success",
  "message": "Login successful",
  "data": {
    "user": {
      "id": 1,
      "telegramId": "123456789",
      "username": "john_doe",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  }
}
```

---

### User

#### GET /user/profile/:telegramId
Получить профиль пользователя

**Response:**
```json
{
  "status": "success",
  "message": "Profile retrieved successfully",
  "data": {
    "user": {
      "id": 1,
      "telegramId": "123456789",
      "username": "john_doe",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z",
      "userPoints": {
        "totalPoints": 150
      },
      "workouts": [],
      "userRoomInventory": []
    }
  }
}
```

#### GET /user/points/:telegramId
Получить баллы пользователя

**Response:**
```json
{
  "status": "success",
  "message": "Points retrieved successfully",
  "data": {
    "points": 150
  }
}
```

---

### Workout

#### POST /workout/record-workout
Записать тренировку

**Request Body:**
```json
{
  "telegramId": "123456789",
  "pushupsCount": 50,
  "duration": 120
}
```

**Response:**
```json
{
  "status": "success",
  "message": "Workout recorded successfully",
  "data": {
    "workout": {
      "id": 1,
      "userId": 1,
      "pushupsCount": 50,
      "duration": 120,
      "completedAt": "2024-01-01T00:00:00.000Z"
    },
    "pointsEarned": 5
  }
}
```

**Points calculation:** 10 pushups = 1 point

#### GET /workout/history/:telegramId
История тренировок пользователя

**Response:**
```json
{
  "status": "success",
  "message": "Workout history retrieved successfully",
  "data": {
    "workouts": [
      {
        "id": 1,
        "userId": 1,
        "pushupsCount": 50,
        "duration": 120,
        "completedAt": "2024-01-01T00:00:00.000Z"
      }
    ]
  }
}
```

---

### Room

#### GET /room/items
Получить список доступных предметов

**Response:**
```json
{
  "status": "success",
  "message": "Room items retrieved successfully",
  "data": {
    "items": [
      {
        "id": 1,
        "name": "Коврик для йоги",
        "priceInPoints": 50,
        "description": "Удобный коврик для упражнений"
      }
    ]
  }
}
```

#### POST /room/buy-item
Купить предмет

**Request Body:**
```json
{
  "telegramId": "123456789",
  "itemId": 1
}
```

**Response:**
```json
{
  "status": "success",
  "message": "Item purchased successfully",
  "data": {
    "item": {
      "id": 1,
      "name": "Коврик для йоги",
      "priceInPoints": 50,
      "description": "Удобный коврик для упражнений"
    }
  }
}
```

**Error Responses:**
- `400` - Insufficient points
- `404` - Item not found or User not found

#### GET /room/inventory/:telegramId
Получить инвентарь пользователя

**Response:**
```json
{
  "status": "success",
  "message": "User inventory retrieved successfully",
  "data": {
    "inventory": [
      {
        "id": 1,
        "userId": 1,
        "itemId": 1,
        "quantity": 2,
        "acquiredAt": "2024-01-01T00:00:00.000Z",
        "item": {
          "id": 1,
          "name": "Коврик для йоги",
          "priceInPoints": 50,
          "description": "Удобный коврик для упражнений"
        }
      }
    ]
  }
}
```

---

## Error Responses

### Standard Error Format
```json
{
  "status": "error",
  "message": "Error message here"
}
```

### Common Status Codes
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `404` - Not Found
- `500` - Internal Server Error

---

## Health Check

#### GET /health
Проверка работоспособности сервера

**Response:**
```json
{
  "status": "success",
  "message": "Server is running",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```
