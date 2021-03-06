const { authJwt } = require("../middleware/authJwt");
const galleryController = require("../controllers/galleryController");

module.exports = function (app) {
    app.post("/add/gallery/image", [authJwt.verifyToken], galleryController.addImage);

    app.get("/get/gallery", galleryController.getAllImages);

    app.get("/get/gallery/image/:id", galleryController.getImageById);

    app.delete("/delete/gallery/image/:id", [authJwt.verifyToken], galleryController.deleteImage);
};