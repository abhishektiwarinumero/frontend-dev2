cd /home/forge/staging.kingboosting.com
git checkout .
git pull origin develop
npm install --production
npm run build
pm2 start npm --name "staging.kingboosting.com" --watch -- start
