const db = require("../models");
const Apointment = db.Apointment;
const Request = db.Request;

const verifyApointmentForRequest = async (req, res, next) => {
    const apointment = await Apointment.findOne({ 
        where: {
            id: req.body.apointmentId
        }
    });

    if(apointment == null) {
        res.status(404).send({
            message: "Apointment does not exist!"
        });
    } else if(new Date(apointment.startTime) < Date.now()) {
        res.status(422).send({
            message: "Apointment must be in the future!"
        });
    } else if(apointment.reserved) {
        res.status(422).send({
            message: "Apointment is taken!"
        });
    } else {
        next();
    }
};

const verifyApointmentForReserve = async (req, res, next) => {
    const apointment = await Apointment.findOne({ 
        where: {
            id: req.params.id
        }
    });

    if(apointment == null) {
        res.status(404).send({
            message: "Apointment does not exist!"
        });
    } else if(new Date(apointment.startTime) < Date.now()) {
        res.status(422).send({
            message: "Apointment must be in the future!"
        });
    } else if(apointment.reserved) {
        res.status(422).send({
            message: "Apointment is taken!"
        });
    } else {
        next();
    }
};

const verifyRequestExists = async (req, res, next) => {
    const result = await Request.findOne({
        where: {
            id: req.params.id
        }
    });

    if(result == null) {
        res.status(404).send({
            message: "Request does not exist!"
        });
    } else {
        next();
    }
};

const verifyRequest = {
    verifyApointmentForRequest: verifyApointmentForRequest,
    verifyRequestExists: verifyRequestExists,
    verifyApointmentForReserve: verifyApointmentForReserve
};

module.exports = {verifyRequest};