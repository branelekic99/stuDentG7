const db = require("../models");
const News = db.News;

const multiparty = require('multiparty');
const fs = require('fs');   
const path = require('path');
const mmm = require('mmmagic');

exports.create = async (req, res) => {
    try {
        let form = new multiparty.Form();

        form.parse(req, function(err, fields, files) {
            if(fields != null && fields.title != null && fields.content != null) {
                if(fields.content[0].length <= 5000) {
                    if(files.image != null) {
                        try {
                            const magic = new mmm.Magic(mmm.MAGIC_MIME_TYPE);
                            magic.detectFile(files.image[0].path, function(err, result) {
                                if(result.startsWith('image')) {
                                    const randomFileName = Math.random().toString(36).substr(2, 70);
                                    const location = 'images' + path.sep +  randomFileName + '.' + files.image[0].headers['content-type'].split('/')[1];
                                    
                                    try {
                                        fs.copyFileSync(files.image[0].path, location);

                                        News.create({
                                            title: fields.title[0],
                                            content: fields.content[0],
                                            imageUrl: location
                                        }).then(
                                            news => {
                                                res.send(news);
                                            }
                                        ).catch(err => {res.status(500).send({ message: err.message });});
                                    } catch(err) {
                                        res.status(500).send({ message: err.message });
                                    }
                                
                                } else {
                                    res.status(401).send({ message: "Please upload image" });
                                }
                            });
                        } catch(err) {
                            res.status(500).send({ message: err.message });
                        }
                    } else {
                        News.create({
                            title: fields.title[0],
                            content: fields.content[0]
                        }).then(
                            news => {
                                res.send(news);
                            }
                        ).catch(err => {res.status(500).send({ message: err.message });});
                    }
                } else {
                    res.status(401).send({ message: "Content length must be shorter than 5000 characters" });
                }
            } else {
                res.status(401).send({ message: "Title and content are required" });
            }
        });
    } catch(err) {
        res.status(500).send({ message: err.message });
    }
}

exports.update = async (req, res) => {
    try {
        let form = new multiparty.Form();

        form.parse(req, function(err, fields, files) {
            if(fields != null && fields.title != null && fields.content != null) {
                if(fields.content[0].length <= 5000) {
                    News.findByPk(req.params.id).then(news => {
                        if(files.image != null) {
                            try {
                                if(news.imageUrl != null) {
                                    fs.unlinkSync(news.imageUrl);
                                } 
                                const magic = new mmm.Magic(mmm.MAGIC_MIME_TYPE);
                                magic.detectFile(files.image[0].path, function(err, result) {
                                    if(result.startsWith('image')) {
                                        const randomFileName = Math.random().toString(36).substr(2, 70);
                                        const location = 'images' + path.sep +  randomFileName + '.' + files.image[0].headers['content-type'].split('/')[1];
                                        
                                        try {
                                            fs.copyFileSync(files.image[0].path, location);

                                            news.title = fields.title[0];
                                            news.content = fields.content[0];
                                            news.imageUrl = location;
                                            news.save()
                        
                                            res.send(news);
                                        } catch(err) {
                                            res.status(500).send({ message: err.message });
                                        }
                                    }  else {
                                        res.status(401).send({ message: "Please upload image" });
                                    }
                                });
                            } catch(err) {
                                res.status(500).send({ message: err.message });
                            }
                        } else { 
                            news.title = fields.title[0];
                            news.content = fields.content[0];
                            news.save()
                            
                            res.send(news);
                        }
                    });
                } else {
                    res.status(401).send({ message: "Content length must be shorter than 5000 characters" });
                }
            } else {
                res.status(401).send({ message: "Title and content are required" });
            }
        });
    } catch(err) {
        res.status(500).send({ message: err.message });
    }
}

exports.delete = async (req, res) => {
    try {
        const news = await getNewsById(req.params.id); 

        if(news.imageUrl != null) {
            const location = 'images' + path.sep +  news.imageUrl.split(path.sep).pop();
            fs.unlinkSync(location);
        }

        news.destroy();
        
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