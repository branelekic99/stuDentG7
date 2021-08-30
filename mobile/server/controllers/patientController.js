const db = require("../models");
const config = require("../config/authConfig");
const Patient = db.Patient;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
    // Save Patient to Database
    //TODO

    //create random password and send it to email
    Patient.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        age: req.body.age,
        password: bcrypt.hashSync(req.body.password, 8)
    })
        .then(patient => {

            res.send({ message: "Patient was registered successfully!" });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.signin = (req, res) => {
    Patient.findOne({
        where: {
            username: req.body.username
        }
    })
        .then(patient => {
            if (!patient) {
                return res.status(404).send({ message: "Patient Not found." });
            }

            var passwordIsValid = bcrypt.compareSync(
                req.body.password,
                patient.password
            );

            if (!passwordIsValid) {
                return res.status(401).send({
                    accessToken: null,
                    message: "Invalid Password!"
                });
            }

            var token = jwt.sign({ id: patient.id }, config.secret, {
                expiresIn: 86400 // 24 hours
            });


            res.status(200).send({
                id: patient.id,
                username: patient.username,
                email: patient.email,
                accessToken: token
            });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};
