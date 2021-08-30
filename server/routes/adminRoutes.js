const { verifyAdmin } = require("../middleware/verifyAdmin");
const { authJwt } = require("../middleware/authJwt");
const adminControler = require("../controllers/adminControler");

module.exports = function (app) {
    app.post("/admin/create", [authJwt.verifyToken, verifyAdmin.checkIfAdminIsSuperuser, verifyAdmin.checkDuplicateUsername], adminControler.create);

    app.post("/admin/signin", adminControler.signin);

    app.post("/admin/logout", [authJwt.verifyToken], adminControler.logout);

    app.put("/admin/update_password", [authJwt.verifyToken, verifyAdmin.checkIfAdminExists], adminControler.updatePassword);

    app.get("/current/user", [authJwt.verifyToken], adminControler.getCurrnetUser);
};
