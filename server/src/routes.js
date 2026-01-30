const UserController = require("./controllers/UserController");
const UserAuthenController = require("./controllers/UserAuthenController"); // เพิ่ม
const isAuthenController = require("./controllers/isAuthenController"); // เพิ่ม

module.exports = (app) => {
  /* RESFUL Api for users management */

  // เพิ่ม 2 บรรทัดนี้
  app.post("/login", UserAuthenController.login);
  app.post("/register", UserAuthenController.register);

  // เอา isAuthenController ไปแปะหน้า routes ที่อยากป้องกัน
  app.get("/users", isAuthenController, UserController.index);
  app.get("/user/:userId", UserController.show);
  app.post("/user", UserController.post);
  app.put("/user/:userId", UserController.put);
  app.delete("/user/:userId", UserController.delete);
};
