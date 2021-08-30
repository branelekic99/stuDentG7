const db = require("../models");
const Image = db.Image;
const galleryController = require("./galleryController");
const multiparty = require('multiparty');
const fs = require('fs');   
const path = require('path');   

const Op = db.Sequelize.Op;

const mmm = require('mmmagic');

exports.addImage = async (req, res) => {
    try {
        let form = new multiparty.Form();

        form.parse(req, function(err, fields, files) {
            if(files != null && files.image != null) {
                try {
                    const magic = new mmm.Magic(mmm.MAGIC_MIME_TYPE);
                    magic.detectFile(files.image[0].path, function(err, result) {
                        if(result.startsWith('image')) {
                            const randomFileName = Math.random().toString(36).substr(2, 70);
                            const location = 'images' + path.sep +  randomFileName + '.' + files.image[0].headers['content-type'].split('/')[1];
                            
                            try {
                                fs.copyFileSync(files.image[0].path, location);

                                Image.create({
                                    imageUrl: 'http://127.0.0.1:8000' + '/' + location
                                }).then(
                                    image => {
                                        res.send(image);
                                    }
                                ).catch(err => {res.status(500).send({ message: err.message });});
                            } catch {
                                res.status(500).send({ message: err.message });
                            }
                        } else {
                            res.status(401).send({ message: "Please upload image" });
                        }
                    });
                } catch {
                    res.status(500).send({ message: err.message });
                }
            } else {
                res.status(401).send({ message: "Please upload image" });
            }
        });
    } catch(err) {
        res.status(500).send({ message: err.message });
    }
}

exports.getImageById = async (req, res) => {
    try {
        const image = await Image.findOne({ 
            where: {
                id: req.params.id
            }
        });

        if(image == null) {
            res.status(404).send({ message: "Image does not exist" });
        }

        res.send(image);
    } catch(err) {
        res.status(500).send({ message: err.message });
    }
}

exports.deleteImage = async (req, res) => {
    try {
        const image = await Image.findOne({ 
            where: {
                id: req.params.id
            }
        });

        if(image == null) {
            res.status(404).send({ message: "Image does not exist" });
        }

        const location = 'images' + path.sep +  image.imageUrl.split(path.sep).pop();
        fs.unlinkSync(location);

        image.destroy();

        res.send({ message: "Image deleted!" });
    } catch(err) {
        res.status(500).send({ message: err.message });
    }
}

exports.getAllImages = async (req, res) => {
    try {
        const images = await Image.findAll();

        res.send(images);
    } catch(err) {
        res.status(500).send({ message: err.message });
    }
}