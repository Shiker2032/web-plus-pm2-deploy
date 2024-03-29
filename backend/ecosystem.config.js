require("dotenv").config({ path: "deploy.env" });

const {
  DEPLOY_USER,
  DEPLOY_HOST,
  DEPLOY_PATH,
  DEPLOY_REF = "origin/master",
  DEPLOY_REPO,
} = process.env;

module.exports = {
  apps: [
    {
      name: "api-service",
      script: "./dist/app.js",
    },
  ],

  // Настройка деплоя
  deploy: {
    production: {
      user: DEPLOY_USER,
      host: DEPLOY_HOST,
      ref: DEPLOY_REF,
      repo: DEPLOY_REPO,
      path: DEPLOY_PATH,
      "local-pre-deploy": `scp ./*.env ${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_PATH}/source/backend`,
      "post-deploy":
        "cd /home/walter2032/web-plus-pm2-deploy/source/backend && npm i && npm run build",
    },
  },
};
