const db = require("../models");
const News = db.News;

const checkIfNewsExists = async (req, res, next) => {
    const news = await News.findOne({
        where: {
            id: req.params.id
        }
    });

    if(news == null) {
        res.status(404).send({
            message: "News does not exist!"
        });
    }

    next();
};

const verifyNews = {
    checkIfNewsExists: checkIfNewsExists
};

module.exports = {verifyNews};