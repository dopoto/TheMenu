const PROXY_CONFIG = [
  {
    context: [
      "/weatherforecast",
    ],
    target: "https://localhost:5063",
    secure: false
  }
]

module.exports = PROXY_CONFIG;
