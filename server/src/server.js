const http = require('http');
const { Server } = require('socket.io');
const mongoLoader = require('./loaders/mongoLoader');
const passportLoader = require('./loaders/passportLoader');
const errorResponseMiddleware = require('./middlewares/errorResponseMiddleware');
const routerLoader = require('./loaders/routerLoader');
const app = require('./app');
const express = require('express');
const path = require('path');
const serveIndex = require('serve-index');

const ScuntLeaderboardSocketManger = require('./websockets/ScuntLeaderboardSocketManager');
const LeaderboardSubscription = require('./subscribers/leaderboardSubscriber');
const SettingsSubscription = require('./subscribers/scuntGameSettingsSubscription');

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/uploads', serveIndex(path.join(__dirname, 'uploads'), { icons: true }));

mongoLoader(app).then(async () => {
  const server = http.createServer(app);
  const io = new Server(server, {
    cors: { origin: '*', methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'] },
  });
  passportLoader(app);
  routerLoader(app);
  app.use(errorResponseMiddleware);

  const scuntLeaderboardManager = new ScuntLeaderboardSocketManger(io.of('/leaderboard'));

  await scuntLeaderboardManager.initSettings();

  scuntLeaderboardManager.listenToScores(LeaderboardSubscription);
  scuntLeaderboardManager.listenToSettings(SettingsSubscription);

  server.listen(process.env.PORT || 5001, () => {
    console.log(`Server is running on: ${process.env.API_BASE_URL}`);
  });
});
