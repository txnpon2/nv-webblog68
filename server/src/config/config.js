module.exports = {
  port: 8081,
  db: {
    database: process.env.DB_NAME || "nv-webblog",
    user: process.env.DB_USER || "nv-webblog",
    password: process.env.DB_PASSWORD || "nv-webblog",
    options: {
      dialect: process.env.DIALECT || "sqlite",
      host: process.env.HOST || "localhost",
      storage: "./nv-webblog.sqlite",
    },
  },
  authentication: {
    jwtSecret: process.env.JWT_SECRET || "secret",
  },
};
