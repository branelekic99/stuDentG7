const db = require("../models");
const config = require("../config/authConfig");
const Admin = db.Admin;
const Patient = db.Patient;

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


exports.updatePassword = async (req, res) => { 
    try {
        if (req.body.oldPassword == req.body.newPassword) {
            return res.status(401).send({
                message: "New password cannot be the same as old pasword!"
            });
        }

        const admin = await Admin.findOne({
            where: {
                id: req.userId
            }
        });

        var passwordIsValid = bcrypt.compareSync(
            req.body.oldPassword,
            admin.password
        );

        if (!passwordIsValid) {
            return res.status(401).send({
                message: "Old password is not valid!"
            });
        }

        admin.password = bcrypt.hashSync(req.body.newPassword, 8);
        admin.save();

        res.send({message: "Password updated!"});
    } catch(err) {
        res.status(500).send({ message: err.message });
    }
};

exports.getCurrnetUser = async (req, res) => { 
    try {
        let result;
        if(req.userType == 'admin') {
            result = await Admin.findOne({
                where: {
                    id: req.userId
                }
            });

            res.send({
                id: result.id,
                username: result.username,
                isSuperuser: result.isSuperuser,
                createdAt: result.createdAt,
                updatedAt: result.updatedAt
            });
        } else {
            result = await Patient.findOne({
                where: {
                    id: req.userId
                }
            });

            res.send({
                id: result.id,
                firstName: result.firstName,
                lastName: result.lastName,
                email: result.emailj,
                phoneNumber: result.phoneNumber,
                age: result.age,
                createdAt: result.createdAt,
                updatedAt: result.updatedAt
            });
        }
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
            return res.status(404).send({ message: "Signin failed!" });
        }

        var passwordIsValid = bcrypt.compareSync(
            req.body.password,
            admin.password
        );

        if (!passwordIsValid) {
            return res.status(401).send({
                accessToken: null,
                message: "Signin failed!"
            });
        }

        var token = jwt.sign({ id: admin.id, type: 'admin' }, config.secret, {
            expiresIn: 86400 // 24 hours
        });

        admin.token = token;
        admin.save();

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

exports.logout = async (req, res) => {
    try {
        const admin = await Admin.findOne({
            where: {
                id: req.userId
            }
        });

        admin.token = null;
        admin.save();

        res.status(200).send({
           message: "User is logged out!"
        });
    } catch(err) {
        res.status(500).send({ message: err.message });
    }
};
