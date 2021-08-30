const db = require("../models");
const Category = db.Category;

exports.getCategories = async (req, res) => {
    try {
        const result = await Category.findAll();
        
        res.send(result);
    } catch(err) {
        res.status(500).send({ message: err.message });
    }
}

exports.getCategoryById = async (id) => {
    const result = await Category.findOne({where: {id: id}});
    
    return result;
}

exports.createCategory = async (req, res) => {
    try {
        const result = await Category.create({
            name: req.body.name,
            description: req.body.description,
            duration: req.body.duration
        });
        
        res.send(result);
    } catch(err) {
        res.status(500).send({ message: err.message });
    }
}