const PROXY_CONFIG = [
  {
    context: [
      "/diagnose",
    ],
    target: "http://localhost:5063",
    secure: false
  }
]

module.exports = PROXY_CONFIG;
