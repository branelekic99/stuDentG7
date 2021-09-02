const patientController = require("../controllers/patientController");
const { authJwt } = require("../middleware/authJwt");
const { verifyPatient } = require("../middleware/verifyPatient");

module.exports = function (app) {
   
    app.post("/patient/signup", [verifyPatient.checkDuplicateEmail], patientController.signup);

    app.post("/patient/signin", patientController.signin);

    app.post("/patient/logout", [authJwt.verifyToken], patientController.logout);

    app.put("/patient/update/:id", [authJwt.verifyToken, verifyPatient.checkIfPatientExistsFromParams], patientController.update);

    app.put("/remove/profile/image", [authJwt.verifyToken], patientController.removeProfileImage);

    app.put("/patient/update_password/:id", [authJwt.verifyToken, verifyPatient.checkIfPatientExistsFromParams], patientController.updatePassword);

    app.get("/get/patient/:id", [authJwt.verifyToken, verifyPatient.checkIfPatientExistsFromParams], patientController.getPatient);

};