const PROXY_CONFIG = [
  {
    context: [
      "/diagnose",
      "/accounts",
    ],
    target: "http://localhost:5063",
    secure: false
  }
]

module.exports = PROXY_CONFIG;
