# Інструкція з розміщення на VPS (hostiq.ua)

## Переваги VPS підходу
- ✅ Все на одному сервері (frontend + backend)
- ✅ Повний контроль над налаштуваннями
- ✅ Простіше налаштування CORS
- ✅ Один SSL сертифікат для всього
- ✅ Швидше з'єднання між frontend та backend

---

## ЧАСТИНА 1: Оренда та початкове налаштування VPS

### Крок 1: Оренда VPS на hostiq.ua

1. Перейдіть на https://hostiq.ua/vps
2. Оберіть план (рекомендації):
   - **RAM**: мінімум 1GB (краще 2GB)
   - **CPU**: 1-2 ядра
   - **Диск**: 20-40GB
   - **ОС**: Ubuntu 22.04 LTS або 24.04 LTS

3. При замовленні:
   - Оберіть **Ubuntu 22.04 LTS** або **24.04 LTS**
   - Збережіть дані для SSH доступу (IP, root пароль)

### Крок 2: Підключення до VPS через SSH

**Windows (PowerShell або Terminal):**
```bash
ssh root@YOUR_VPS_IP
# Введіть пароль, який ви отримали від hostiq.ua
```

**При першому підключенні:**
```bash
# Оновіть пароль root (якщо потрібно)
passwd

# Оновіть систему
apt update && apt upgrade -y
```

### Крок 3: Створення користувача (опціонально, але рекомендовано)

```bash
# Створіть нового користувача
adduser deploy

# Додайте до sudo групи
usermod -aG sudo deploy

# Переключіться на нового користувача
su - deploy
```

---

## ЧАСТИНА 2: Встановлення необхідного ПЗ

### Крок 1: Встановлення Node.js

```bash
# Встановіть Node.js 20.x (LTS)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Перевірка
node -v
npm -v
```

### Крок 2: Встановлення Nginx

```bash
sudo apt install -y nginx

# Перевірка
sudo systemctl status nginx
```

### Крок 3: Встановлення PM2 (Process Manager для Node.js)

```bash
sudo npm install -g pm2

# Перевірка
pm2 -v
```

### Крок 4: Встановлення Git

```bash
sudo apt install -y git

# Налаштуйте git
git config --global user.name "Your Name"
git config --global user.email "your@email.com"
```

---

## ЧАСТИНА 3: Завантаження проекту на VPS

### Варіант А: Через Git (рекомендовано)

```bash
# Перейдіть у домашню директорію
cd ~

# Створіть папку для проектів
mkdir -p projects
cd projects

# Клонуйте репозиторій (якщо є на GitHub)
git clone https://github.com/YOUR_USERNAME/wedding-site.git
cd wedding-site
```

### Варіант Б: Завантаження через SCP/SFTP

**З вашого локального комп'ютера (Windows PowerShell):**

```bash
# Створіть архів проекту (виключаючи node_modules)
# У PowerShell:
cd C:\Users\kaktu\Desktop\site-weding-nodejs
Compress-Archive -Path backend,frontend,credentials -DestinationPath wedding-site.zip

# Завантажте на сервер
scp wedding-site.zip root@YOUR_VPS_IP:/root/

# На сервері:
cd ~
unzip wedding-site.zip
```

---

## ЧАСТИНА 4: Налаштування Backend

### Крок 1: Встановлення залежностей

```bash
cd ~/projects/wedding-site/backend
npm install --production
```

### Крок 2: Створення .env файлу

```bash
nano .env
```

Додайте:
```env
PORT=5000
NODE_ENV=production
GOOGLE_SHEETS_SPREADSHEET_ID=1eCQM5fRz2bugHyKw8QFxmCplvzrpcS7oyD5tkV6z27E
GOOGLE_SHEETS_SHEET_NAME=Sheet1
GOOGLE_SHEETS_CREDENTIALS_PATH=./credentials/credentials.json
CORS_ALLOWED_ORIGINS=https://andriy-iryna.co.ua,http://andriy-iryna.co.ua
```

Збережіть: `Ctrl+X`, потім `Y`, потім `Enter`

### Крок 3: Перевірка credentials.json

```bash
# Переконайтеся, що файл існує
ls -la credentials/credentials.json

# Якщо файлу немає, завантажте його з локального комп'ютера:
# На локальному ПК:
# scp C:\Users\kaktu\Desktop\site-weding-nodejs\backend\credentials\credentials.json root@YOUR_VPS_IP:~/projects/wedding-site/backend/credentials/
```

### Крок 4: Тестовий запуск

```bash
npm start
# Перевірте, чи працює без помилок
# Ctrl+C для зупинки
```

### Крок 5: Запуск через PM2

```bash
# Запустіть backend через PM2
pm2 start server.js --name wedding-backend

# Налаштуйте автозапуск при перезавантаженні
pm2 startup
pm2 save

# Перевірка статусу
pm2 status
pm2 logs wedding-backend
```

---

## ЧАСТИНА 5: Налаштування Frontend

### Крок 1: Створення production .env

```bash
cd ~/projects/wedding-site/frontend
nano .env.production
```

Додайте:
```env
REACT_APP_API_URL=https://andriy-iryna.co.ua/api
```

Збережіть: `Ctrl+X`, `Y`, `Enter`

### Крок 2: Встановлення залежностей та збірка

```bash
npm install
npm run build
```

Після збірки з'явиться папка `build` з готовим сайтом.

### Крок 3: Копіювання до Nginx директорії

```bash
# Створіть директорію для сайту
sudo mkdir -p /var/www/andriy-iryna

# Скопіюйте файли
sudo cp -r build/* /var/www/andriy-iryna/

# Встановіть правильні права
sudo chown -R www-data:www-data /var/www/andriy-iryna
```

---

## ЧАСТИНА 6: Налаштування Nginx

### Крок 1: Створення конфігурації сайту

```bash
sudo nano /etc/nginx/sites-available/andriy-iryna
```

Додайте:
```nginx
server {
    listen 80;
    server_name andriy-iryna.co.ua www.andriy-iryna.co.ua;

    # Frontend - статичні файли React
    root /var/www/andriy-iryna;
    index index.html;

    # Логи
    access_log /var/log/nginx/andriy-iryna-access.log;
    error_log /var/log/nginx/andriy-iryna-error.log;

    # Backend API
    location /api/ {
        proxy_pass http://localhost:5000/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # React Router - всі інші запити йдуть до index.html
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Кешування статичних файлів
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

Збережіть: `Ctrl+X`, `Y`, `Enter`

### Крок 2: Активація конфігурації

```bash
# Створіть symlink
sudo ln -s /etc/nginx/sites-available/andriy-iryna /etc/nginx/sites-enabled/

# Видаліть дефолтний конфіг (опціонально)
sudo rm /etc/nginx/sites-enabled/default

# Перевірте конфігурацію
sudo nginx -t

# Перезапустіть Nginx
sudo systemctl restart nginx
```

---

## ЧАСТИНА 7: Налаштування SSL (HTTPS)

### Крок 1: Встановлення Certbot

```bash
sudo apt install -y certbot python3-certbot-nginx
```

### Крок 2: Отримання SSL сертифікату

```bash
# Переконайтеся, що домен вже вказує на IP вашого VPS!
sudo certbot --nginx -d andriy-iryna.co.ua -d www.andriy-iryna.co.ua
```

Certbot автоматично:
- Отримає сертифікат Let's Encrypt
- Налаштує Nginx для HTTPS
- Налаштує автоматичне перенаправлення HTTP → HTTPS

### Крок 3: Тест автоматичного оновлення

```bash
sudo certbot renew --dry-run
```

Сертифікат буде автоматично оновлюватись кожні 90 днів.

---

## ЧАСТИНА 8: Налаштування домену

### Крок 1: DNS налаштування в hostiq.ua

1. Увійдіть у панель управління hostiq.ua
2. Перейдіть до управління доменом `andriy-iryna.co.ua`
3. Налаштуйте DNS записи:

```
Тип: A
Ім'я: @
Значення: YOUR_VPS_IP
TTL: 3600

Тип: A
Ім'я: www
Значення: YOUR_VPS_IP
TTL: 3600
```

4. Збережіть зміни
5. Зачекайте 5-30 хвилин для DNS propagation

---

## ЧАСТИНА 9: Оновлення Frontend.jsx

### Важливо! Оновіть шлях до API

У вашому `frontend/src/components/Questions/Question.jsx` переконайтеся:

```javascript
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';
```

Тепер API буде доступний за адресою `https://andriy-iryna.co.ua/api` завдяки Nginx proxy.

---

## ЧАСТИНА 10: Перевірка та тестування

### Перевірка backend:

```bash
pm2 status
pm2 logs wedding-backend
curl http://localhost:5000/submit-answers
```

### Перевірка nginx:

```bash
sudo nginx -t
sudo systemctl status nginx
```

### Перевірка SSL:

```bash
curl -I https://andriy-iryna.co.ua
```

### Відкрийте сайт:

1. https://andriy-iryna.co.ua
2. Заповніть форму
3. Перевірте Google Таблицю

---

## Корисні команди для управління

### PM2:
```bash
pm2 list                    # Список процесів
pm2 logs wedding-backend    # Логи backend
pm2 restart wedding-backend # Перезапуск
pm2 stop wedding-backend    # Зупинка
pm2 delete wedding-backend  # Видалення
```

### Nginx:
```bash
sudo systemctl status nginx   # Статус
sudo systemctl restart nginx  # Перезапуск
sudo nginx -t                 # Тест конфігурації
sudo tail -f /var/log/nginx/andriy-iryna-error.log  # Логи помилок
```

### Системні ресурси:
```bash
htop                # Моніторинг ресурсів (встановіть: sudo apt install htop)
df -h               # Використання диску
free -h             # Використання RAM
```

---

## Оновлення сайту після змін

### Оновлення Backend:

```bash
cd ~/projects/wedding-site/backend
git pull  # Якщо використовуєте git
npm install
pm2 restart wedding-backend
```

### Оновлення Frontend:

```bash
cd ~/projects/wedding-site/frontend
git pull  # Якщо використовуєте git
npm install
npm run build
sudo cp -r build/* /var/www/andriy-iryna/
```

---

## Можливі проблеми та рішення

### Backend не запускається:
```bash
pm2 logs wedding-backend
# Перевірте логи на помилки
```

### Nginx видає 502 Bad Gateway:
```bash
# Перевірте, чи працює backend
pm2 status
curl http://localhost:5000/submit-answers
```

### SSL не працює:
```bash
# Переконайтеся, що DNS записи налаштовані
# Перезапустіть certbot
sudo certbot --nginx -d andriy-iryna.co.ua -d www.andriy-iryna.co.ua --force-renewal
```

### CORS помилки:
```bash
# Перевірте .env в backend:
cat ~/projects/wedding-site/backend/.env
# Переконайтеся, що CORS_ALLOWED_ORIGINS містить ваш домен
```

---

## Firewall (опціонально, але рекомендовано)

```bash
# Встановіть ufw
sudo apt install -y ufw

# Дозвольте SSH, HTTP, HTTPS
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'

# Увімкніть firewall
sudo ufw enable

# Перевірка
sudo ufw status
```

---

## Бекап (рекомендації)

### Бекап проекту:
```bash
cd ~
tar -czf wedding-backup-$(date +%Y%m%d).tar.gz projects/wedding-site
```

### Бекап бази даних (якщо буде):
Дані зберігаються в Google Sheets, тому окремий бекап не потрібен.

---

## Вартість та ресурси

**Рекомендований VPS план для цього проекту:**
- 1-2GB RAM
- 1-2 CPU cores
- 20GB SSD
- Ubuntu 22.04 LTS

**Приблизна вартість на hostiq.ua:** 150-300 грн/місяць

---

Створено: 2026-05-02
Автор: Claude Code
