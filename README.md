# Telegram Fitness Mini App Backend

Backend для Telegram фитнес-мини-приложения, построенный на Node.js, Express, TypeScript и PostgreSQL.

## 🚀 Технологии

- **Node.js** - Runtime environment
- **Express** - Web framework
- **TypeScript** - Type safety
- **Prisma ORM** - Database ORM
- **PostgreSQL** - Database
- **Winston** - Logging
- **ESLint & Prettier** - Code quality

## 📋 Требования

- Node.js >= 18.x
- PostgreSQL >= 14.x
- npm или yarn

## 🛠️ Установка

1. Клонируйте репозиторий:
```bash
git clone <repository-url>
cd telegram-fitness-app
```

2. Установите зависимости:
```bash
npm install
```

3. Настройте переменные окружения:
```bash
cp .env.example .env
```

Отредактируйте `.env` файл и укажите ваши настройки.

4. Сгенерируйте Prisma Client:
```bash
npm run prisma:generate
```

5. Запустите миграции базы данных:
```bash
npm run prisma:migrate
```

## 🎯 Запуск

### Development
```bash
npm run dev
```

### Production
```bash
npm run build
npm start
```

## 📚 API Endpoints

### Authentication
- `POST /api/auth/login` - Авторизация через Telegram

### User
- `GET /api/user/profile/:telegramId` - Получить профиль пользователя
- `GET /api/user/points/:telegramId` - Получить баллы пользователя

### Workout
- `POST /api/workout/record-workout` - Записать тренировку
- `GET /api/workout/history/:telegramId` - История тренировок

### Room
- `GET /api/room/items` - Список доступных предметов
- `POST /api/room/buy-item` - Купить предмет
- `GET /api/room/inventory/:telegramId` - Инвентарь пользователя

## 🗃️ Database Schema

### Users
- Хранит информацию о пользователях Telegram

### Workouts
- Записывает выполненные тренировки

### Room Items
- Каталог доступных предметов для покупки

### User Room Inventory
- Инвентарь пользователя

### User Points
- Система баллов пользователя

## 🧪 Скрипты

- `npm run dev` - Запуск в development режиме
- `npm run build` - Сборка для production
- `npm start` - Запуск production версии
- `npm run lint` - Проверка кода
- `npm run lint:fix` - Исправление ошибок линтера
- `npm run format` - Форматирование кода
- `npm run format:check` - Проверка форматирования
- `npm run prisma:generate` - Генерация Prisma Client
- `npm run prisma:migrate` - Запуск миграций
- `npm run prisma:studio` - Открыть Prisma Studio

## 📁 Структура проекта

```
src/
├── config/          # Конфигурация приложения
├── controllers/     # Контроллеры API
├── middleware/      # Middleware функции
├── models/          # Модели данных (будущие)
├── routes/          # API маршруты
├── utils/           # Утилиты
├── database/        # Database connection
├── app.ts           # Express app
└── index.ts         # Точка входа

prisma/
└── schema.prisma    # Database schema
```

## 🔐 Environment Variables

См. `.env.example` для полного списка переменных окружения.

## 📝 Следующие шаги

- [ ] Интеграция pose detection
- [ ] WebSocket для real-time обновлений
- [ ] JWT аутентификация
- [ ] Rate limiting
- [ ] Unit & Integration тесты
- [ ] Frontend интеграция
- [ ] Deployment

## 📄 License

ISC
