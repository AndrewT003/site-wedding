# Інструкція з налаштування

## Швидкий старт

1. **Скопіюйте credentials.json**
   ```bash
   # Скопіюйте ваш файл credentials.json у папку:
   backend/credentials/credentials.json
   ```

2. **Налаштуйте змінні середовища**
   ```bash
   cd backend
   cp .env.example .env
   # Відредагуйте .env файл з вашими даними
   ```

3. **Запустіть проект**
   ```bash
   docker-compose up --build
   ```

## Детальна інструкція

### 1. Google Sheets API Credentials

Якщо у вас вже є `credentials.json` зі старого проекту:
```bash
cp ../site-weding/backend/credentials/credentials.json backend/credentials/
```

Якщо потрібно створити нові:

1. Перейдіть на [Google Cloud Console](https://console.cloud.google.com/)
2. Створіть новий проект або виберіть існуючий
3. Увімкніть Google Sheets API:
   - APIs & Services → Library
   - Знайдіть "Google Sheets API"
   - Натисніть Enable

4. Створіть Service Account:
   - APIs & Services → Credentials
   - Create Credentials → Service Account
   - Заповніть ім'я та опис
   - Натисніть Create and Continue
   - Пропустіть Optional roles
   - Натисніть Done

5. Створіть ключ:
   - Клікніть на створений Service Account
   - Вкладка Keys
   - Add Key → Create new key
   - Виберіть JSON
   - Збережіть файл як `credentials.json`

6. Помістіть файл у проект:
   ```bash
   mv ~/Downloads/credentials.json backend/credentials/
   ```

7. Надайте доступ до Google таблиці:
   - Відкрийте вашу Google таблицю
   - Натисніть Share
   - Додайте email Service Account (з credentials.json)
   - Надайте права Editor

### 2. Environment Variables

Створіть файл `backend/.env`:

```env
PORT=8080
GOOGLE_SHEETS_SPREADSHEET_ID=1eCQM5fRz2bugHyKw8QFxmCplvzrpcS7oyD5tkV6z27E
GOOGLE_SHEETS_CREDENTIALS_PATH=/app/credentials/credentials.json
GOOGLE_SHEETS_SHEET_NAME=Sheet1
CORS_ALLOWED_ORIGINS=http://localhost:3000,http://localhost:80
```

**Як знайти Spreadsheet ID:**
- Відкрийте Google таблицю
- URL виглядає так: `https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/edit`
- Скопіюйте частину між `/d/` та `/edit`

### 3. Структура Google таблиці

Створіть аркуш з назвою `Sheet1` (або вкажіть іншу в `.env`)

Додайте заголовки в перший рядок:

| A | B | C | D | E |
|---|---|---|---|---|
| Timestamp | Name | Will Attend | Drinks | Food |

### 4. Запуск проекту

**З Docker (рекомендовано):**
```bash
# З кореневої директорії проекту
docker-compose up --build
```

**Без Docker:**

Backend:
```bash
cd backend
npm install
npm start
```

Frontend (в іншому терміналі):
```bash
cd frontend
npm install
npm start
```

### 5. Перевірка

- Frontend: http://localhost
- Backend: http://localhost:8080
- Health check: http://localhost:8080/actuator/health
- Test endpoint: http://localhost:8080/api/users

### 6. Тестування форми

1. Відкрийте http://localhost
2. Прокрутіть до форми RSVP
3. Заповніть:
   - Ім'я
   - Чи будете присутні
   - Напої (опціонально)
   - Їжа (опціонально)
4. Натисніть Submit
5. Перевірте Google таблицю - повинен з'явитися новий рядок

## Troubleshooting

### Помилка "Error initializing Google Sheets client"

1. Перевірте, що `credentials.json` існує:
   ```bash
   ls -la backend/credentials/
   ```

2. Перевірте формат файлу - має бути валідний JSON

3. Перевірте шлях у `.env`:
   ```env
   GOOGLE_SHEETS_CREDENTIALS_PATH=/app/credentials/credentials.json
   ```

### Помилка "The caller does not have permission"

1. Відкрийте Google таблицю
2. Натисніть Share
3. Знайдіть email з `credentials.json` (поле `client_email`)
4. Додайте його з правами Editor

### Backend не запускається

1. Перевірте, що Node.js встановлено:
   ```bash
   node --version  # має бути v18+
   ```

2. Перевірте залежності:
   ```bash
   cd backend
   rm -rf node_modules package-lock.json
   npm install
   ```

3. Перевірте порт 8080:
   ```bash
   # Windows
   netstat -ano | findstr :8080
   
   # Linux/Mac
   lsof -i :8080
   ```

### CORS помилки

Додайте URL frontend до `.env`:
```env
CORS_ALLOWED_ORIGINS=http://localhost:3000,http://localhost:80,http://localhost
```

## Deployment на Render.com

1. Push проект на GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Node.js version"
   git remote add origin https://github.com/YOUR_USERNAME/site-weding-nodejs.git
   git push -u origin main
   ```

2. Оновіть `render.yaml`:
   - Змініть `repo` на ваш GitHub URL

3. Створіть новий Web Service на Render.com:
   - Connect your repository
   - Render автоматично визначить `render.yaml`

4. Додайте Secret Files на Render:
   - Backend service → Environment
   - Secret Files → Add Secret File
   - Filename: `/app/credentials/credentials.json`
   - Contents: вміст вашого `credentials.json`

5. Додайте Environment Variables:
   - `GOOGLE_SHEETS_SPREADSHEET_ID`: ваш spreadsheet ID
   - `CORS_ALLOWED_ORIGINS`: URL вашого frontend на Render

6. Deploy!

## Міграція з Spring Boot версії

Якщо ви переходите зі старого проекту:

1. Скопіюйте credentials:
   ```bash
   cp ../site-weding/backend/credentials/credentials.json backend/credentials/
   ```

2. Використовуйте той самий Spreadsheet ID

3. Google таблиця і дані залишаються без змін

4. Frontend працює з тими самими API endpoints

Все працюватиме ідентично, просто backend тепер на Node.js!
