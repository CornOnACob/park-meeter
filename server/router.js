const Router = require("koa-router");
const router = new Router();

const parking = require("./controllers/parking.js");

router.get("/parking", parking.getAll);

module.exports = router;
