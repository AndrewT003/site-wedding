# ✅ Чеклист деплоймента на VPS

Використовуйте цей чеклист для перевірки всіх кроків деплоймента.

## 1️⃣ Оренда VPS

- [ ] Орендували VPS на hostiq.ua
- [ ] Обрали Ubuntu 22.04 LTS або 24.04 LTS
- [ ] Отримали IP адресу VPS
- [ ] Отримали SSH доступ (root пароль)
- [ ] Підключилися до VPS через SSH

**Команда для підключення:**
```bash
ssh root@YOUR_VPS_IP
```

---

## 2️⃣ Встановлення ПЗ на VPS

- [ ] Оновили систему: `apt update && apt upgrade -y`
- [ ] Встановили Node.js 20.x
- [ ] Встановили Nginx
- [ ] Встановили PM2
- [ ] Встановили Git
- [ ] Налаштували firewall (ufw)

**Швидка перевірка:**
```bash
node -v      # v20.x.x
npm -v       # v10.x.x
nginx -v     # nginx version
pm2 -v       # 5.x.x
git --version
```

---

## 3️⃣ Завантаження проекту

- [ ] Створили папку ~/projects
- [ ] Завантажили код через git або scp
- [ ] Перевірили структуру папок:
  ```
  ~/projects/wedding-site/
  ├── backend/
  ├── frontend/
  └── credentials/
  ```

---

## 4️⃣ Налаштування Backend

- [ ] Перейшли в папку backend: `cd ~/projects/wedding-site/backend`
- [ ] Встановили залежності: `npm install --production`
- [ ] Створили файл `.env` з правильними змінними
- [ ] Перевірили наявність `credentials/credentials.json`
- [ ] Протестували запуск: `npm start`
- [ ] Запустили через PM2: `pm2 start server.js --name wedding-backend`
- [ ] Налаштували автозапуск: `pm2 startup && pm2 save`

**Перевірка:**
```bash
pm2 status
curl http://localhost:5000/submit-answers
```

---

## 5️⃣ Налаштування Frontend

- [ ] Перейшли в папку frontend: `cd ~/projects/wedding-site/frontend`
- [ ] Створили `.env.production` з `REACT_APP_API_URL=https://andriy-iryna.co.ua/api`
- [ ] Встановили залежності: `npm install`
- [ ] Зробили build: `npm run build`
- [ ] Створили папку для Nginx: `sudo mkdir -p /var/www/andriy-iryna`
- [ ] Скопіювали файли: `sudo cp -r build/* /var/www/andriy-iryna/`
- [ ] Встановили права: `sudo chown -R www-data:www-data /var/www/andriy-iryna`

**Перевірка:**
```bash
ls -la /var/www/andriy-iryna/index.html
```

---

## 6️⃣ Налаштування Nginx

- [ ] Створили конфіг: `/etc/nginx/sites-available/andriy-iryna`
- [ ] Скопіювали конфігурацію з `nginx.conf.example`
- [ ] Створили symlink: `ln -s /etc/nginx/sites-available/andriy-iryna /etc/nginx/sites-enabled/`
- [ ] Видалили default: `rm /etc/nginx/sites-enabled/default`
- [ ] Перевірили конфіг: `sudo nginx -t`
- [ ] Перезапустили Nginx: `sudo systemctl restart nginx`

**Перевірка:**
```bash
sudo nginx -t
sudo systemctl status nginx
```

---

## 7️⃣ Налаштування DNS

- [ ] Увійшли в панель hostiq.ua
- [ ] Додали A запис: `@ -> YOUR_VPS_IP`
- [ ] Додали A запис: `www -> YOUR_VPS_IP`
- [ ] Зачекали 5-30 хвилин для DNS propagation

**Перевірка:**
```bash
ping andriy-iryna.co.ua
nslookup andriy-iryna.co.ua
```

---

## 8️⃣ Налаштування SSL

- [ ] Встановили certbot: `apt install -y certbot python3-certbot-nginx`
- [ ] Переконалися, що DNS вже працює (ping домену повертає IP VPS)
- [ ] Отримали сертифікат: `certbot --nginx -d andriy-iryna.co.ua -d www.andriy-iryna.co.ua`
- [ ] Протестували авто-оновлення: `certbot renew --dry-run`

**Перевірка:**
```bash
curl -I https://andriy-iryna.co.ua
```

---

## 9️⃣ Фінальна перевірка

- [ ] Відкрили https://andriy-iryna.co.ua в браузері
- [ ] Сайт завантажується без помилок
- [ ] Заповнили форму з питаннями
- [ ] Дані з'явилися в Google Таблиці

**Відкрийте консоль браузера (F12) та перевірте:**
- [ ] Немає помилок в Console
- [ ] Немає помилок в Network
- [ ] API запити йдуть на `/api/submit-answers`

---

## 🔟 Безпека та оптимізація

- [ ] Налаштували firewall: `ufw allow OpenSSH && ufw allow 'Nginx Full' && ufw enable`
- [ ] Змінили root пароль
- [ ] Створили окремого користувача (опціонально)
- [ ] Налаштували автоматичні оновлення (опціонально)

---

## 📝 Що робити після деплою

### Моніторинг:
```bash
pm2 monit                    # Моніторинг PM2 в реальному часі
htop                         # Використання ресурсів
df -h                        # Вільне місце на диску
free -h                      # Використання RAM
```

### Логи:
```bash
pm2 logs wedding-backend                          # Backend логи
sudo tail -f /var/log/nginx/andriy-iryna-error.log  # Nginx помилки
sudo tail -f /var/log/nginx/andriy-iryna-access.log # Nginx доступ
```

### Оновлення:
```bash
# Використовуйте deploy.sh скрипт:
./deploy.sh all              # Оновити все
./deploy.sh frontend         # Тільки frontend
./deploy.sh backend          # Тільки backend
```

---

## ❓ Допомога

Якщо щось не працює, перегляньте розділ "Можливі проблеми та рішення" в `DEPLOY_VPS.md`

---

**Статус:** ⬜ Не розпочато | 🟨 В процесі | ✅ Завершено

