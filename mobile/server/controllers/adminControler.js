const db = require("../models");
const config = require("../config/authConfig");
const Admin = db.Admin;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.create = async (req, res) => {
    try {
        const admin = await Admin.create({
            username: req.body.username,
            isSuperuser: req.body.isSuperuser,
            password: bcrypt.hashSync(req.body.password, 8)
        });
        
        res.send({ message: "Admin was created successfully!" });
    } catch(err) {
        res.status(500).send({ message: err.message });
    }
}


exports.updatePassword = (req, res) => { 
    try {
        Admin.update(
            {
                password: bcrypt.hashSync(req.body.password, 8)
            }, {  
            where: {
                id: req.userId
            }
        });

        res.send({message: "Password updated!"});
    } catch(err) {
        res.status(500).send({ message: err.message });
    }
};

exports.signin = async (req, res) => {
    try {
        const admin = await Admin.findOne({
            where: {
                username: req.body.username
            }
        });

        if (admin == null) {
            return res.status(404).send({ message: "Admin Not found." });
        }

        var passwordIsValid = bcrypt.compareSync(
            req.body.password,
            admin.password
        );

        if (!passwordIsValid) {
            return res.status(401).send({
                accessToken: null,
                message: "Invalid Password!"
            });
        }

        var token = jwt.sign({ id: admin.id }, config.secret, {
            expiresIn: 86400 // 24 hours
        });


        res.status(200).send({
            id: admin.id,
            username: admin.username,
            isSuperuser: admin.isSuperuser,
            accessToken: token
        });
    } catch(err) {
        res.status(500).send({ message: err.message });
    }
};
