const { verifyAdmin } = require("../middleware/verifyAdmin");
const { authJwt } = require("../middleware/authJwt");
const adminAuthControler = require("../controllers/adminControler");

module.exports = function (app) {
    app.post("/admin/create", [authJwt.verifyToken, verifyAdmin.checkIfAdminIsSuperuser, verifyAdmin.checkDuplicateUsername], adminAuthControler.create);

    app.post("/admin/signin", adminAuthControler.signin);

    app.put("/admin/update_password", [authJwt.verifyToken, verifyAdmin.checkIfAdminExists], adminAuthControler.updatePassword);
};
