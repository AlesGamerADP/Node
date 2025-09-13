const express = require("express");
const router = express.Router();
const mainController = require("../controllers/mainController")
const videoGameController = require("../controllers/videoGameController");


router.get("/",mainController.home);
router.get("/about",mainController.about);
router.get("/contact",mainController.contact);
router.post("/contact", mainController.saveContact);
router.get("/admin",mainController.admin);
router.get("/videogames", videoGameController.list);
router.post("/videogames", videoGameController.save);

module.exports = router