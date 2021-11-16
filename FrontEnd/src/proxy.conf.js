// TODO generic /api settings. see proxy.conf.js
const PROXY_CONFIG = [
  {
    context: [
      "/accounts",
      "/configuration",
      "/demo",
      "/diagnose",
      "/locations",
      "/orders",
      "/token",
    ],
    target: "http://localhost:5063",
    secure: false
  }
]

module.exports = PROXY_CONFIG;
