const newsController = require("../controllers/newsController");
const { authJwt } = require("../middleware/authJwt");
const { verifyNews } = require("../middleware/verifyNews");

module.exports = function (app) {
   


    app.get("/get/news/paginated", [authJwt.verifyToken], newsController.getNewsPaginated);

    app.get("/get/news/:id", [authJwt.verifyToken, verifyNews.checkIfNewsExists], newsController.getNews);

    app.post("/admin/create/news", [authJwt.verifyToken], newsController.create);

    app.put("/admin/update/news/:id", [authJwt.verifyToken, verifyNews.checkIfNewsExists], newsController.update);

    app.delete("/admin/delete/news/:id", [authJwt.verifyToken, verifyNews.checkIfNewsExists], newsController.delete);

};