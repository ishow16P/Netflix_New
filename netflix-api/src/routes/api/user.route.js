const router = require('express').Router();
const user = require('../../controllers/user.ctrl');

router.post("/add", user.addTolikedMovies)
router.put("/delete", user.removeFromLikedMovies);
router.get("/liked/:email", user.getLikedMovies);

module.exports = router;