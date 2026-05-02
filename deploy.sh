#!/bin/bash

# Скрипт для деплоймента на VPS
# Використання: ./deploy.sh [frontend|backend|all]

set -e

PROJECT_DIR="/root/projects/wedding-site"
FRONTEND_BUILD_DIR="$PROJECT_DIR/frontend/build"
NGINX_DIR="/var/www/andriy-iryna"
BACKEND_DIR="$PROJECT_DIR/backend"

deploy_frontend() {
    echo "🚀 Деплой Frontend..."
    cd $PROJECT_DIR/frontend

    echo "📦 Встановлення залежностей..."
    npm install

    echo "🏗️ Збірка production build..."
    npm run build

    echo "📋 Копіювання файлів до Nginx..."
    sudo cp -r build/* $NGINX_DIR/

    echo "✅ Frontend оновлено!"
}

deploy_backend() {
    echo "🚀 Деплой Backend..."
    cd $BACKEND_DIR

    echo "📦 Встановлення залежностей..."
    npm install --production

    echo "🔄 Перезапуск PM2..."
    pm2 restart wedding-backend

    echo "📊 Статус PM2..."
    pm2 status

    echo "✅ Backend оновлено!"
}

case "$1" in
    frontend)
        deploy_frontend
        ;;
    backend)
        deploy_backend
        ;;
    all)
        deploy_frontend
        deploy_backend
        echo "🎉 Повний деплой завершено!"
        ;;
    *)
        echo "Використання: ./deploy.sh [frontend|backend|all]"
        echo "  frontend - оновити тільки frontend"
        echo "  backend  - оновити тільки backend"
        echo "  all      - оновити все"
        exit 1
        ;;
esac

echo "✨ Готово!"
