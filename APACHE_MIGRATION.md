# Міграція з Nginx на Apache

## Для AlmaLinux/RHEL (CentOS)

На AlmaLinux Apache називається **httpd**. Використовуйте файл `httpd.conf.almalinux` замість `apache.conf.example`.

## Кроки міграції на VPS (AlmaLinux)

### 1. Встановіть Apache (httpd) та необхідні модулі

```bash
sudo dnf install httpd mod_ssl mod_proxy_html

# Модулі вже включені в httpd на RHEL/AlmaLinux
# Перевірити доступні модулі:
httpd -M
```

## Кроки міграції на VPS (Ubuntu/Debian)

### 1. Встановіть Apache та необхідні модулі

```bash
sudo apt update
sudo apt install apache2

# Увімкніть необхідні модулі
sudo a2enmod rewrite
sudo a2enmod proxy
sudo a2enmod proxy_http
sudo a2enmod headers
sudo a2enmod deflate
sudo a2enmod expires
sudo a2enmod ssl
```

### 2. Зупиніть Nginx

```bash
sudo systemctl stop nginx
sudo systemctl disable nginx
```

### 3. Налаштуйте Apache

Скопіюйте файл конфігурації:
```bash
sudo cp apache.conf.example /etc/apache2/sites-available/andriy-iryna.conf
```

Увімкніть сайт:
```bash
sudo a2ensite andriy-iryna
sudo a2dissite 000-default  # вимкнути дефолтний сайт
```

Перевірте конфігурацію:
```bash
sudo apache2ctl configtest
```

### 4. Скопіюйте .htaccess файл

```bash
# Цей файл має бути в директорії з frontend файлами
sudo cp frontend/.htaccess /var/www/andriy-iryna/.htaccess
```

### 5. Запустіть Apache

```bash
sudo systemctl start apache2
sudo systemctl enable apache2
```

### 6. Налаштуйте SSL (Let's Encrypt)

```bash
sudo apt install certbot python3-certbot-apache
sudo certbot --apache -d andriy-iryna.co.ua -d www.andriy-iryna.co.ua
```

### 7. Перевірте роботу

- Відкрийте http://andriy-iryna.co.ua
- Перевірте що API працює: http://andriy-iryna.co.ua/api/
- Перевірте що роутинг React працює (перейдіть на різні сторінки та оновіть)

## Порівняння конфігурацій

| Функція | Nginx | Apache |
|---------|-------|--------|
| Проксування API | `proxy_pass` | `ProxyPass` / `ProxyPassReverse` |
| React Router | `try_files` | `mod_rewrite` |
| Gzip | `gzip on;` | `mod_deflate` |
| Кешування | `expires` + `add_header` | `mod_expires` + `mod_headers` |
| Конфігурація | `/etc/nginx/sites-available/` | `/etc/apache2/sites-available/` |
| .htaccess | Не підтримується | Підтримується |

## Важливі відмінності

1. **Apache використовує .htaccess** - це дозволяє налаштувати правила на рівні директорії
2. **Модулі потрібно увімкнювати** - використовуйте `a2enmod`
3. **Синтаксис директив** - `ProxyPass` замість `proxy_pass`, `Header` замість `add_header`
4. **Продуктивність** - Nginx зазвичай швидший для статичних файлів, але Apache має більше можливостей через .htaccess

## Відкат (якщо щось піде не так)

```bash
sudo systemctl stop apache2
sudo systemctl disable apache2
sudo systemctl start nginx
sudo systemctl enable nginx
```

## Корисні команди Apache

```bash
# Перезавантажити конфігурацію
sudo systemctl reload apache2

# Перевірити конфігурацію
sudo apache2ctl configtest

# Переглянути увімкнені модулі
apache2ctl -M

# Переглянути увімкнені сайти
ls -la /etc/apache2/sites-enabled/

# Логи
sudo tail -f /var/log/apache2/andriy-iryna-access.log
sudo tail -f /var/log/apache2/andriy-iryna-error.log
```