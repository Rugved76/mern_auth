const { Signup, Login } = require("../controllers/authcontroller.js");
const { userVerification } = require("../authmiddlewares/authmiddleware.js");
const router = require("express").Router();

router.post("/signup", Signup);
router.post("/login", Login);
router.post('/', userVerification)

module.exports = router;