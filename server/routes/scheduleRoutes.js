const { authJwt } = require("../middleware/authJwt");
const { verifySchedule } = require("../middleware/verifySchedule");
const categoryController = require("../controllers/categoryController");
const scheduleController = require("../controllers/scheduleController");

module.exports = function (app) {
    app.get("/get/categories", [authJwt.verifyToken], categoryController.getCategories);

    app.post("/create/category", categoryController.createCategory);

    app.post("/admin/create/schedule", [authJwt.verifyToken, verifySchedule.verifyEndAndStartTime], scheduleController.create);

    app.get("/get/schedule/:id", [authJwt.verifyToken], scheduleController.getScheduleById);

    app.get("/get/schedules/category/:id", [authJwt.verifyToken], scheduleController.getSchedules);

    app.get("/get/available_apointments/category/:id", [authJwt.verifyToken], scheduleController.getAvailableApointmentsByCategoryId);

    app.get("/get/reserved_apointments/category/:id", [authJwt.verifyToken], scheduleController.getReservedApointmentsByCategoryId);

    app.delete("/admin/delete/schedule/:id", [authJwt.verifyToken, verifySchedule.verifyScheduleExists], scheduleController.deleteSchedule);

};
