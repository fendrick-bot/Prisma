const Pusher = require("pusher");

const pusher = new Pusher({
  appId: "1778029",
  key: "5829b290926b8657101a",
  secret: "d4f014baf061a6f77168",
  cluster: "ap2",
  useTLS: true
});

module.exports = {pusher};