const db = require("../models");
const config = require("../config/authConfig");
const Patient = db.Patient;
const emailController = require('../controllers/emailController');
const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const multiparty = require('multiparty');
const fs = require('fs');   
const path = require('path');
const mmm = require('mmmagic');

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
        let form = new multiparty.Form();
        form.parse(req, function(err, fields, files) {
            if(fields != null && fields.firstName != null && fields.lastName != null && fields.email != null && fields.phoneNumber != null && fields.age != null) {
                if(files.image != null) {
                    try {
                        const magic = new mmm.Magic(mmm.MAGIC_MIME_TYPE);
                        magic.detectFile(files.image[0].path, function(err, result) {
                            if(result.startsWith('image')) {
                                const randomFileName = Math.random().toString(36).substr(2, 70);
                                const location = 'images' + path.sep +  randomFileName + '.' + files.image[0].headers['content-type'].split('/')[1];
                                
                                try {
                                    fs.copyFileSync(files.image[0].path, location);

                                    Patient.update({
                                        firstName: fields.firstName[0],
                                        lastName: fields.lastName[0],
                                        email: fields.email[0],
                                        phoneNumber: fields.phoneNumber[0],
                                        age: fields.age[0],
                                        imageUrl: 'http://127.0.0.1:8000' + '/' + location
                                    }, {where: {
                                        id: req.params.id
                                    }}).then(
                                        () => {
                                            Patient.findOne({where: {
                                                id: req.params.id
                                            }}).then(
                                                patient => {
                                                res.send({
                                                    id: patient.id,
                                                    firstName: patient.firstName,
                                                    lastName: patient.lastName,
                                                    email: patient.email,
                                                    phoneNumber: patient.phoneNumber,
                                                    age: patient.age,
                                                    imageUrl: patient.imageUrl
                                                });
                                            }).catch(err => {res.status(500).send({ message: err.message });});
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
                    Patient.update({
                        firstName: fields.firstName[0],
                        lastName: fields.lastName[0],
                        email: fields.email[0],
                        phoneNumber: fields.phoneNumber[0],
                        age: fields.age[0],
                        imageUrl: null
                    }, {where: {
                        id: req.params.id
                    }}).then(
                        () => {
                            Patient.findOne({where: {
                                id: req.params.id
                            }}).then(
                                patient => {
                                res.send({
                                    id: patient.id,
                                    firstName: patient.firstName,
                                    lastName: patient.lastName,
                                    email: patient.email,
                                    phoneNumber: patient.phoneNumber,
                                    age: patient.age,
                                    imageUrl: patient.imageUrl
                                });
                            }).catch(err => {res.status(500).send({ message: err.message });});
                        }
                    ).catch(err => {res.status(500).send({ message: err.message });});
                }
            } else {
                res.status(401).send({ message: "First name, last name, email, phone number and age are required" });
            }
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