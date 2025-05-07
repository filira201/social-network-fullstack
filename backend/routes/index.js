const express = require("express");
const router = express.Router();
const multer = require("multer");
const { UserController, PostController } = require("../controllers");
const authenticateToken = require("../middleware/auth");

const destination = "uploads";

//Показываем, место хранения файлов
const storage = multer.diskStorage({
  destination,
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const uploads = multer({ storage });

//Роуты для пользователя
router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.get("/current", authenticateToken, UserController.current);
router.get("/users/:id", authenticateToken, UserController.getUserById);
router.put("/users/:id", authenticateToken, UserController.updateUser);

//Роуты для постов
router.post("/posts", authenticateToken, PostController.createPost);
router.get("/posts", authenticateToken, PostController.getAllPosts);
router.get("/posts/:id", authenticateToken, PostController.getPostById);
router.delete("/posts/:id", authenticateToken, PostController.deletePost);

module.exports = router;
