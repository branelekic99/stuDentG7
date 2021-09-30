const requestController = require("../controllers/requestController");
const apointmentController = require("../controllers/apointmentController");
const { authJwt } = require("../middleware/authJwt");
const { verifyPatient } = require("../middleware/verifyPatient");
const { verifyRequest } = require("../middleware/verifyRequest");
const { verifySchedule } = require("../middleware/verifySchedule");

module.exports = function (app) {
   
    app.post("/patient/create/request", [
        authJwt.verifyToken, 
        verifyRequest.verifyApointmentForRequest
    ], requestController.create);

    app.put("/admin/reserve/apointment/:id", [
        authJwt.verifyToken, 
        verifyRequest.verifyApointmentForReserve
    ], requestController.reserveApointment);

    app.put("/relese/apointment/:id", [
        authJwt.verifyToken 
    ], requestController.releseApointment);

    app.delete("/declain/request/:id", [authJwt.verifyToken], requestController.declainRequest);

    app.put("/approve/request/:id", [authJwt.verifyToken], requestController.approveRequest);

    app.get("/admin/get_unapproved_requests", [authJwt.verifyToken], requestController.getFutureRequests);
    
    app.get("/get/requests/patient", [authJwt.verifyToken, verifyPatient.checkIfPatientExists], requestController.getPatientRequests);
    
    app.get("/get/request/:id", [authJwt.verifyToken, verifyRequest.verifyRequestExists], requestController.getRequest);

    app.post("/send_message/request/:id", [authJwt.verifyToken, verifyRequest.verifyRequestExists], requestController.sendRequestMessage);
};