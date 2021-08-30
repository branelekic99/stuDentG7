const db = require("../models");
const Schedule = db.Schedule;
const categoryController = require("./categoryController");
const apointmentController = require("./apointmentController");

const Op = db.Sequelize.Op;

exports.create = async (req, res) => {
    try {
        const category = await categoryController.getCategoryById(req.body.categoryId);
        res.status(404).send({
            message: "Category does not exist!"
        });

        const schedule = await Schedule.create({
            categoryId: req.body.categoryId,
            startTime: req.body.startTime,
            endTime: req.body.endTime
        }, {
            returning: ['id', 'categoryId', 'startTime', 'endTime', 'updatedAt', 'createdAt']
        });

        let startTime = new Date(req.body.startTime), endTime = new Date(req.body.startTime); 
        endTime.setMinutes(endTime.getMinutes() + category.duration);
        let apointments = new Array();

        while(endTime <= new Date(req.body.endTime)) {
            let apointment = await apointmentController.create(schedule.id, startTime, endTime);
            apointments.push(apointment);

            startTime = new Date(endTime);
            endTime.setMinutes(endTime.getMinutes() + category.duration);
        }
        
        res.send({
            ...schedule.dataValues,
            apointments: apointments
        });
    } catch(err) {
        res.status(500).send({ message: err.message });
    }
}

exports.getScheduleById = async (req, res) => {
    try {
        const schedule = await Schedule.findOne({ 
            attributes: ['id', 'categoryId', 'startTime', 'endTime', 'updatedAt', 'createdAt'],
            where: {
                id: req.params.id
            }
        });

        let apointments = await apointmentController.getApointmentsByScheduleId(req.params.id);

        res.send({
            ...schedule.dataValues,
            apointments: apointments
        });
    } catch(err) {
        res.status(500).send({ message: err.message });
    }
}

exports.getSchedules = async (req, res) => {
    try {
        const schedules = await Schedule.findAll({
            attributes: ['id', 'categoryId', 'startTime', 'endTime', 'updatedAt', 'createdAt'],
            where: {
                startTime: {
                    [Op.gte]: Date.now()
                }
            }
        });

        res.send(schedules);
    } catch(err) {
        res.status(500).send({ message: err.message });
    }
}

exports.deleteSchedule = async (req, res) => {
    try {
        await apointmentController.deleteApointmentsByScheduleId(req.params.id);

        await Schedule.destroy({ where: {
            id: req.params.id
        }});

        res.status(200).send({ message: "Schedule deleted successfully!" });
    } catch(err) {
        res.status(500).send({ message: err.message });
    }
}