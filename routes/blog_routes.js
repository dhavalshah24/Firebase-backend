const router = require("express").Router();
const upload = require("../middleware/fileupload");
const userlogin =  require("../middleware/userlogin")
const { writeBlog, getAllBlogs, getMyBlogs } = require("../services/blogs");
const { signupEmailPassowrd, loginEmailPassword, logout } = require("../services/auth");

router.post("/write", upload, writeBlog);
router.get("/getAllBlogs", getAllBlogs);
router.get("/getMyBlogs", getMyBlogs);
router.post("/signupEmailPassowrd", signupEmailPassowrd);
router.post("/loginEmailPassword", loginEmailPassword);
router.get("/logout", logout);

module.exports = {
    routes: router
};