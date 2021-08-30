const db = require("../models");
const config = require("../config/authConfig");
const Patient = db.Patient;
const emailController = require('../controllers/emailController');
const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = async (req, res) => {
    try{
        const randomPassword = Math.random().toString(36).substr(2, 8);
        await Patient.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,
            age: req.body.age,
            password: bcrypt.hashSync(randomPassword, 8)
        });

        emailController.sendEmail(req.body.email, randomPassword);

        res.send({ message: "Patient was registered successfully!" });
    } catch(err) {
        res.status(500).send({ message: err.message });
    }
};

exports.signin = async (req, res) => {
    try {
        const patient = await Patient.findOne({
            where: {
                email: req.body.email
            }
        });

        if (patient == null) {
            return res.status(404).send({ message: "Signin failed!" });
        }

        var passwordIsValid = bcrypt.compareSync(
            req.body.password,
            patient.password
        );

        if (!passwordIsValid) {
            return res.status(401).send({
                accessToken: null,
                message: "Signin failed!"
            });
        }

        var token = jwt.sign({ id: patient.id, type: 'patient' }, config.secret, {
            expiresIn: 86400 // 24 hours
        });

        patient.token = token;
        patient.save();

        res.status(200).send({
            id: patient.id,
            firstName: patient.firstName,
            lastName: patient.lastName,
            email: patient.email,
            phoneNumber: patient.phoneNumber,
            age: patient.age,
            accessToken: token
        });
    } catch(err) {
        res.status(500).send({ message: err.message });
    }
};

exports.update = async (req, res) => {
    try{
        await Patient.update({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,
            age: req.body.age,
        }, {where: {
            id: req.params.id
        }});

        const patient = await getPatientById(req.params.id);
        
        res.send({
            id: patient.id,
            firstName: patient.firstName,
            lastName: patient.lastName,
            email: patient.email,
            phoneNumber: patient.phoneNumber,
            age: patient.age
        });
    } catch(err) {
        res.status(500).send({ message: err.message });
    }
};

exports.updatePassword = async (req, res) => { 
    try {
        if (req.body.oldPassword == req.body.newPassword) {
            return res.status(401).send({
                message: "New password cannot be the same as old pasword!"
            });
        }

        const patient = await Patient.findOne({
            where: {
                id: req.userId
            }
        });

        var passwordIsValid = bcrypt.compareSync(
            req.body.oldPassword,
            patient.password
        );

        if (!passwordIsValid) {
            return res.status(401).send({
                message: "Old password is not valid!"
            });
        }

        patient.password = bcrypt.hashSync(req.body.newPassword, 8);
        patient.save();

        res.send({message: "Password updated!"});
    } catch(err) {
        res.status(500).send({ message: err.message });
    }
};

exports.getPatient = async (req, res) => {
    try{
        const patient = await getPatientById(req.params.id);
        
        res.send({
            id: patient.id,
            firstName: patient.firstName,
            lastName: patient.lastName,
            email: patient.email,
            phoneNumber: patient.phoneNumber,
            age: patient.age
        });
    } catch(err) {
        res.status(500).send({ message: err.message });
    }
};

getPatientById = async (id) => {
    const patient = await Patient.findOne({where: {
        id: id
    }});
    
    return patient;
}

exports.logout = async (req, res) => {
    try {
        const patient = await Patient.findOne({
            where: {
                id: req.userId
            }
        });

        patient.token = null;
        patient.save();

        res.status(200).send({
           message: "User is logged out!"
        });
    } catch(err) {
        res.status(500).send({ message: err.message });
    }
};