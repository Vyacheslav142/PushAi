# Changelog

All notable changes to this project will be documented in this file.

## [1.0.0] - 2024-01-29

### Added
- Initial project setup with Node.js, Express, and TypeScript
- PostgreSQL database with Prisma ORM
- Database schema with 5 tables (users, workouts, room_items, user_room_inventory, user_points)
- ESLint 9 and Prettier configuration for code quality
- Winston logger for application logging
- CORS middleware configured for Telegram Mini App
- Error handling middleware with custom AppError class
- Authentication endpoints (Telegram login)
- User management endpoints (profile, points)
- Workout tracking endpoints (record workout, history)
- Room/Shop endpoints (items list, buy item, inventory)
- Database seed script with initial room items
- Comprehensive API documentation
- Development and production configurations
- Health check endpoint

### Structure
- `/api/auth` - Authentication routes
- `/api/user` - User management routes
- `/api/workout` - Workout tracking routes
- `/api/room` - Room/Shop management routes
- `/health` - Health check endpoint

### Technical Details
- TypeScript strict mode enabled
- Async error handling with custom wrapper
- Connection pooling for PostgreSQL
- Environment-based configuration
- Graceful shutdown handling
- Source maps for debugging
