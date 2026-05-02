# Інструкція з розміщення сайту andriy-iryna.co.ua

## Архітектура
- **Frontend** (React) → hostiq.ua (домен: andriy-iryna.co.ua)
- **Backend** (Node.js) → Render.com (безкоштовно)

---

## ЧАСТИНА 1: Розміщення Backend на Render.com

### Крок 1: Створення GitHub репозиторію для backend

1. Перейдіть на https://github.com
2. Натисніть "New repository"
3. Назва: `wedding-backend`
4. Visibility: Private (приватний)
5. Натисніть "Create repository"

### Крок 2: Завантаження backend коду на GitHub

Відкрийте термінал у папці backend:

```bash
cd C:\Users\kaktu\Desktop\site-weding-nodejs\backend

# Ініціалізація git (якщо ще не зроблено)
git init

# Додавання всіх файлів
git add .

# Створення коміту
git commit -m "Initial backend setup"

# Додавання remote repository (замініть YOUR_USERNAME на ваш GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/wedding-backend.git

# Відправка коду
git branch -M main
git push -u origin main
```

### Крок 3: Деплой на Render.com

1. Перейдіть на https://render.com і увійдіть
2. Натисніть **"New +"** → **"Web Service"**
3. Підключіть GitHub репозиторій `wedding-backend`
4. Налаштування:
   - **Name**: `wedding-backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: `Free`

5. **Environment Variables** (змінні середовища):
   Додайте наступні змінні:

   ```
   PORT = 8080
   NODE_ENV = production
   GOOGLE_SHEETS_SPREADSHEET_ID = 1eCQM5fRz2bugHyKw8QFxmCplvzrpcS7oyD5tkV6z27E
   GOOGLE_SHEETS_SHEET_NAME = Sheet1
   GOOGLE_SHEETS_CREDENTIALS_PATH = ./credentials/credentials.json
   CORS_ALLOWED_ORIGINS = https://andriy-iryna.co.ua,http://andriy-iryna.co.ua,https://www.andriy-iryna.co.ua,http://www.andriy-iryna.co.ua
   ```

6. **ВАЖЛИВО - Завантаження credentials.json**:
   - Після деплою перейдіть в розділ "Shell" вашого сервісу
   - Створіть файл credentials вручну або використайте File Upload (якщо доступно)
   - Альтернатива: використайте змінну середовища GOOGLE_CREDENTIALS з вмістом JSON

7. Натисніть **"Create Web Service"**

8. Зачекайте ~5-10 хвилин поки Render задеплоїть ваш backend

9. **Збережіть URL вашого backend** - він буде виглядати так:
   `https://wedding-backend.onrender.com`

---

## ЧАСТИНА 2: Підготовка Frontend

### Крок 1: Створення production .env файлу

Створіть файл `.env.production` у папці `frontend`:

```
REACT_APP_API_URL=https://wedding-backend.onrender.com
```

⚠️ **ВАЖЛИВО**: Замініть `wedding-backend.onrender.com` на реальний URL з Render!

### Крок 2: Збірка Frontend

Відкрийте термінал у папці frontend:

```bash
cd C:\Users\kaktu\Desktop\site-weding-nodejs\frontend

# Встановіть залежності (якщо ще не зроблено)
npm install

# Створіть production build
npm run build
```

Після виконання з'явиться папка `build` з усіма файлами для сайту.

---

## ЧАСТИНА 3: Завантаження на hostiq.ua

### Крок 1: Вхід в панель управління hostiq.ua

1. Перейдіть на https://hostiq.ua
2. Увійдіть в особистий кабінет
3. Виберіть ваш хостинг

### Крок 2: Завантаження файлів

1. Знайдіть **File Manager** (Файловий менеджер) або **FTP доступ**
2. Перейдіть у папку `public_html` або `www` (корінь сайту)
3. Завантажте **ВСІ файли** з папки `frontend/build`:
   - `index.html`
   - `static/*`
   - `manifest.json`
   - `robots.txt`
   - `favicon.ico`
   - і всі інші файли

### Крок 3: Налаштування для React SPA

Створіть файл `.htaccess` у папці `public_html`:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteCond %{REQUEST_FILENAME} !-l
  RewriteRule . /index.html [L]
</IfModule>
```

---

## ЧАСТИНА 4: Налаштування домену andriy-iryna.co.ua

### Якщо домен вже прив'язаний до hostiq.ua:

1. У панелі hostiq.ua знайдіть розділ **"Домени"**
2. Переконайтеся, що `andriy-iryna.co.ua` прив'язаний до вашого хостингу
3. Якщо є опція "Основний домен" - встановіть `andriy-iryna.co.ua`

### Налаштування SSL (HTTPS):

1. У панелі hostiq.ua знайдіть **"SSL сертифікати"**
2. Увімкніть **Let's Encrypt** для `andriy-iryna.co.ua`
3. Активуйте автоматичне перенаправлення HTTP → HTTPS

---

## ЧАСТИНА 5: Перевірка

1. Відкрийте https://andriy-iryna.co.ua
2. Заповніть форму з питаннями
3. Натисніть "Надіслати"
4. Перевірте Google Таблицю - дані мають з'явитися!

---

## Можливі проблеми та рішення

### Backend не запускається на Render:
- Перевірте логи в Render Dashboard
- Переконайтеся, що всі змінні середовища додані
- Перевірте, чи завантажено credentials.json

### Форма не відправляє дані:
- Відкрийте консоль браузера (F12)
- Перевірте CORS помилки
- Переконайтеся, що REACT_APP_API_URL правильний у .env.production
- Перевірте, що домен додано в CORS_ALLOWED_ORIGINS на backend

### Домен не працює:
- Зачекайте 24-48 годин для DNS propagation
- Перевірте налаштування DNS у hostiq.ua
- Переконайтеся, що файли в public_html

---

## Контакти підтримки

- hostiq.ua: https://hostiq.ua/support
- Render.com: https://render.com/docs

---

Створено: 2026-05-01
