const PROXY_CONFIG = [
  {
    context: [
      "/accounts",
      "/configuration",
      "/diagnose",
    ],
    target: "http://localhost:5063",
    secure: false
  }
]

module.exports = PROXY_CONFIG;
