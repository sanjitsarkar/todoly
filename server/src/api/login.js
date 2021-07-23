const express = require("express");
const passport = require("passport");
// const { isUserAuthenticated } = require("../middlewares/auth");

const router = express.Router();

// const successLoginUrl = "http://localhost:5000/login/success";
// const errorLoginUrl = "http://localhost:5000/login/error";
// router.get("/login/success", (_, res) => {
//     res.json({"status":"Login Successfull"})
// }
// )
// router.get("/login/error", (_, res) => {
//     res.json({"status":"Login Unsuccessfull"})
// }
// )
router.get(
  "/login/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureMessage: "Cannot login to Google, please try again later!",
    // failureMessage: errorLoginUrl,
    // successRedirect: successLoginUrl,
  }),
  (req, res) => {
    // console.log("User: ", req.user);
    res.send("Successfully logged in. Please close the window!!!");
  }
);
router.get('/logout', function (req, res) {
  req.session = null
   req.logout();
        res.json({"status":"logged out"});
});
module.exports = router;