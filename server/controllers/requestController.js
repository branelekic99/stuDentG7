const apointmentController = require("../controllers/apointmentController");
const messageController = require("../controllers/messageController");
const db = require("../models");
const schedule = require("../models/schedule");
const Request = db.Request;
const Apointment = db.Apointment;
const Schedule = db.Schedule;
const Category = db.Category;
const Patient = db.Patient;
const Admin = db.Admin;

const Op = db.Sequelize.Op;

exports.create = async (req, res) => {
    try {
        const request = await Request.create({
            patientId: req.userId,
            apointmentId: req.body.apointmentId,
            description: req.body.description,
            approved: false
        });

        await apointmentController.reserveApointment(req.body.apointmentId);
        
        res.send(request);
    } catch(err) {
        res.status(500).send({ message: err.message });
    }
}

exports.reserveApointment = async (req, res) => {
    try {
        await apointmentController.reserveApointment(req.params.id);

        const request = await Request.create({
            apointmentId: req.params.id,
            description: req.body.description,
            approved: true
        });
        
        res.send({message: "Appointment reserved!"});
    } catch(err) {
        res.status(500).send({ message: err.message });
    }
}

exports.releseApointment = async (req, res) => {
    try {
        const requests = await Request.findAll({where : {apointmentId: req.params.id}});

        for(let i = 0; i < requests.length; i++) {        
            await messageController.deleteRequestMessages(requests[i].id);
        }

        await Request.destroy({
            where: {
                apointmentId: req.params.id
            }
        });
        
        await apointmentController.declainApointment(req.params.id);

        res.send({message: "Appointment available!"});
    } catch(err) {
        res.status(500).send({ message: err.message });
    }
}

exports.getRequestById = async (id) => {
    const result = await Request.findOne({
        where: {id: id}
    });
    
    return result;
}

exports.declainRequest = async (req, res) => {
    try {
        const request = await this.getRequestById(req.params.id);

        if(request == null) {
            res.status(404).send({
                message: "Request does not exist!"
            });
        } else {

            if(req.userType == 'patient' && request.patientId != req.userId) {
                res.status(403).send({
                    message: "Patient is not owner of reqest!"
                });
            } else {

                await apointmentController.declainApointment(request.apointmentId);
                
                await messageController.deleteRequestMessages(request.id);

                await Request.destroy({
                    where: {
                        id: req.params.id
                    }
                });

                res.send({
                    message: "Request is declined successfully!"
                });
            }
        }
    } catch(err) {
        res.status(500).send({ message: err.message });
    }
}

exports.approveRequest = async (req, res) => {
    try {
        const request = await this.getRequestById(req.params.id);

        if(request == null) {
            res.status(404).send({
                message: "Request does not exist!"
            });
        }

        await Request.update({
                approved: true
            }, {  
                where: {
                    id: req.params.id
                }
            });

        res.send({
            message: "Request is approved successfully!"
        });
    } catch(err) {
        res.status(500).send({ message: err.message });
    }
}

exports.getFutureRequests = async (req, res) => {
    try {
        const request = await Request.findAll({
            where: {
                approved: false
            },
            include: [{
                model: Apointment,
                order: [
                    ['startTime', 'ASC']
                ], 
                where: {
                    startTime: {
                        [Op.gte]: Date.now()
                    },
                }, 
                include: {
                    model: Schedule,
                    attributes: ['categoryId'],
                    include: {
                        model: Category,
                        attributes: ['name']
                    }
                }
            }, {
                model: Patient,
                attributes: ['firstName', 'lastName', 'email', 'imageUrl']
            }]
        });
        
        res.send(request);
    } catch(err) {
        res.status(500).send({ message: err.message });
    }
}

exports.getPatientRequests = async (req, res) => {
    try {
        const request = await Request.findAll({
            where: {
                patientId: req.userId
            },
            include: {
                model: Apointment,
                order: [
                    ['startTime', 'ASC']
                ], 
                where: {
                    startTime: {
                        [Op.gte]: Date.now()
                    },
                }, 
                include: {
                    model: Schedule,
                    attributes: ['categoryId'],
                    include: {
                        model: Category,
                        attributes: ['name']
                    }
                }
            }
        });
        
        res.send(request);
    } catch(err) {
        res.status(500).send({ message: err.message });
    }
}

exports.getRequest = async (req, res) => {
    try {
        const request = await Request.findOne({
            where: {
                id: req.params.id
            },
            include: {
                model: Apointment,
                order: [
                    ['startTime', 'ASC']
                ], 
                where: {
                    startTime: {
                        [Op.gte]: Date.now()
                    },
                }, 
                include: {
                    model: Schedule,
                    attributes: ['categoryId'],
                    include: {
                        model: Category,
                        attributes: ['name']
                    }
                }
            }
        });

        const messages = await messageController.getRequestMessages(req.params.id);
        
        res.send({
            id: request.id,
            patientId: request.patientId,
            apointmentId: request.apointmentId,
            description: request.description,
            createdAt: request.createdAt,
            updatedAt: request.updatedAt,
            Apointment: request.Apointment,
            messages: messages
        });
    } catch(err) {
        res.status(500).send({ message: err.message });
    }
}

exports.sendRequestMessage = async (req, res) => {
    try {
        if(req.userType == 'admin') {
            const result = await Admin.findOne({
                where: {
                    id: req.userId
                }
            });
                
            if(result == null) {
                res.status(404).send({
                    message: "Admin does not exist!"
                });
            }

            const message = await messageController.sendMessage(req.params.id, req.body.message, null, req.userId);

            res.send(message);
        } else {
            const result = await Patient.findOne({
                where: {
                    id: req.userId
                }
            });

            if(result == null) {
                res.status(404).send({
                    message: "Patient does not exist!"
                });
            }

            const message = await messageController.sendMessage(req.params.id, req.body.message, req.userId, null);

            res.send(message);
        }
    } catch(err) {
        res.status(500).send({ message: err.message });
    }
}