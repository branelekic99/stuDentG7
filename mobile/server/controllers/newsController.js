const db = require("../models");
const News = db.News;

exports.create = async (req, res) => {
    try {
        const news = await News.create({
            title: req.body.title,
            content: req.body.content,
            // imageUrl: imageUrl
        });
        
        res.send(news);
    } catch(err) {
        res.status(500).send({ message: err.message });
    }
}

exports.update = async (req, res) => {
    try {   
        await News.update(
            {
                title: req.body.title,
                content: req.body.content,
            }, {  
            where: {
                id: req.params.id
            }
        });

        const news = await getNewsById(req.params.id);
        
        res.send(news);
    } catch(err) {
        res.status(500).send({ message: err.message });
    }
}

exports.delete = async (req, res) => {
    try {
        await News.destroy({where: {
            id: req.params.id
        }});
        
        res.send({ message: "News was deleted successfully!" });
    } catch(err) {
        res.status(500).send({ message: err.message });
    }
}

exports.getNewsPaginated = async (req, res) => {
    try {
        const result = await News.findAndCountAll({
            offset: req.query.offset,
            limit: req.query.limit
        });
        
        res.send({
            offset: req.query.offset,
            ...result
        });
    } catch(err) {
        res.status(500).send({ message: err.message });
    }
}

exports.getNews = async (req, res) => {
    try {
        const news = await getNewsById(req.params.id);
        
        res.send(news);
    } catch(err) {
        res.status(500).send({ message: err.message });
    }
}

getNewsById = async (id) => {
    const news = await News.findOne({where: {
        id: id
    }});
    
    return news;
}