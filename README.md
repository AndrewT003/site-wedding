# Wedding Website - Node.js Express Version

Весільний сайт з формою RSVP. Backend переписаний з Spring Boot на Node.js Express.

## Технології

### Backend
- **Node.js** 18
- **Express.js** 4.18
- **Google Sheets API** - зберігання RSVP відповідей
- **Docker** - контейнеризація

### Frontend
- **React** 19
- **Bootstrap** 5.3
- **Nginx** - статичний веб-сервер

## Структура проекту

```
site-weding-nodejs/
├── backend/                    # Node.js Express API
│   ├── controllers/            # Контролери
│   │   ├── userController.js
│   │   └── questionController.js
│   ├── services/               # Сервіси
│   │   └── googleSheetsService.js
│   ├── server.js               # Головний файл
│   ├── package.json
│   ├── Dockerfile
│   └── .env.example
├── frontend/                   # React додаток
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── Dockerfile
├── docker-compose.yml
└── render.yaml                 # Render.com deployment
```

## API Endpoints

### GET /api/users
Тестовий endpoint, повертає список користувачів.

**Response:**
```json
["Alice", "Bob", "Charlie"]
```

### POST /api/submit-questions
Приймає дані форми RSVP та зберігає їх у Google Sheets.

**Request Body:**
```json
{
  "name": "Ім'я гостя",
  "willAttend": "yes",
  "drinks": ["Вино", "Шампанське"],
  "food": "Преференції щодо їжі"
}
```

**Response (успіх):**
```json
{
  "status": "success",
  "message": "Дані успішно збережено!"
}
```

### GET /actuator/health
Health check endpoint для Docker та Render.

## Налаштування

### 1. Google Sheets API

1. Створіть проект у Google Cloud Console
2. Увімкніть Google Sheets API
3. Створіть Service Account та завантажте credentials.json
4. Помістіть credentials.json у backend/credentials/
5. Надайте Service Account доступ до вашої Google таблиці

### 2. Environment Variables

Створіть файл .env у папці backend/ на основі .env.example

## Запуск локально

### З Docker Compose (рекомендовано)

```bash
docker-compose up --build
```

Додаток буде доступний:
- Frontend: http://localhost
- Backend: http://localhost:8080

### Без Docker

**Backend:**
```bash
cd backend
npm install
npm start
```

**Frontend:**
```bash
cd frontend
npm install
npm start
```

## Deployment на Render.com

1. Завантажте проект на GitHub
2. Оновіть render.yaml з вашим репозиторієм
3. Налаштуйте змінні середовища
4. Deploy через Render Dashboard

## Відмінності від Spring Boot версії

- **Runtime**: Node.js 18 замість Java 17
- **Framework**: Express.js замість Spring Boot
- **Менеджер залежностей**: npm замість Maven
- **Розмір Docker image**: ~150MB замість ~350MB
- **Час запуску**: швидше (~1s замість ~5s)
- **Пам'ять**: менше використання (~100MB замість ~300MB)
