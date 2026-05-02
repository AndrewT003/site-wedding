// PM2 конфігурація для production
// Використання: pm2 start ecosystem.config.js

module.exports = {
  apps: [{
    name: 'wedding-backend',
    script: './server.js',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '500M',
    env_production: {
      NODE_ENV: 'production',
      PORT: 5000
    },
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_file: './logs/combined.log',
    time: true,
    merge_logs: true
  }]
};
