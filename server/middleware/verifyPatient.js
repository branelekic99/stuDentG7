const db = require("../models");
const Patient = db.Patient;

const checkDuplicateEmail = async (req, res, next) => {
    const patient = await Patient.findOne({
        where: {
            email: req.body.email
        }
    });

    if (patient) {
        res.status(400).send({
            message: "Failed! Email is already in use!"
        });
        return;
    } else {
        next();
    }
};

const checkIfPatientExists = async (req, res, next) => {
    const patient = await Patient.findOne({
        where: {
            id: req.userId
        }
    });

    if(patient == null) {
        res.status(404).send({
            message: "Patient does not exist!"
        });
    } else {
        next();
    }
};

const checkIfPatientExistsFromParams = async (req, res, next) => {
    const patient = await Patient.findOne({
        where: {
            id: req.params.id
        }
    });

    if(patient == null) {
        res.status(404).send({
            message: "Patient does not exist!"
        });
    } else {
        next();
    }
};

const checkIfPatientExistsFromBody = async (req, res, next) => {
    const patient = await Patient.findOne({
        where: {
            id: req.body.patientId
        }
    });

    if(patient == null) {
        res.status(404).send({
            message: "Patient does not exist!"
        });
    } else {
        next();
    }
};

const verifyPatient = {
    checkDuplicateEmail: checkDuplicateEmail,
    checkIfPatientExists: checkIfPatientExists,
    checkIfPatientExistsFromParams: checkIfPatientExistsFromParams,
    checkIfPatientExistsFromBody: checkIfPatientExistsFromBody
};

module.exports = {verifyPatient};
