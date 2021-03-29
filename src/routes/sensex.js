const router = require("express").Router();
const {checkToken} = require("./../services/authService");
const {getSensexList, addSensex} = require('./../controllers/sensexController');

/**
 * get sensex list
 */
router.get("/list", checkToken, getSensexList);

/**
 * add new sensex
 */
router.post("/add", checkToken, addSensex);


module.exports = router;