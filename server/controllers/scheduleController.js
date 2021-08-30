const db = require("../models");
const Schedule = db.Schedule;
const categoryController = require("./categoryController");
const apointmentController = require("./apointmentController");

const Op = db.Sequelize.Op;

exports.create = async (req, res) => {
    try {
        const category = await categoryController.getCategoryById(req.body.categoryId);
        if(category == null) {
            res.status(404).send({
                message: "Category does not exist!"
            });
        }

        const schedule = await Schedule.create({
            categoryId: req.body.categoryId,
            startTime:  new Date(req.body.startTime).getTime(),
            endTime:  new Date(req.body.endTime).getTime()
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
        
        schedule.dataValues.apointments = apointments;
        res.send(schedule);
    } catch(err) {
        res.status(500).send({ message: err.message });
    }
}

exports.getScheduleById = async (req, res) => {
    try {
        const schedule = await Schedule.findOne({ 
            where: {
                id: req.params.id
            }
        });

        let apointments = await apointmentController.getAvailableApointmentsByScheduleId(req.params.id);

        schedule.dataValues.apointments = apointments;
        res.send(schedule);
    } catch(err) {
        res.status(500).send({ message: err.message });
    }
}

exports.getSchedules = async (req, res) => {
    try {
        const category = await categoryController.getCategoryById(req.params.id);
        if(category == null) {
            res.status(404).send({
                message: "Category does not exist!"
            });
        }

        const schedules = await Schedule.findAll({
            where: {
                startTime: {
                    [Op.gte]: Date.now()
                },
                categoryId: category.id
            }
        });

        res.send(schedules);
    } catch(err) {
        res.status(500).send({ message: err.message });
    }
}

exports.getAvailableApointmentsByCategoryId = async (req, res) => {
    try {
        const category = await categoryController.getCategoryById(req.params.id);
        if(category == null) {
            res.status(404).send({
                message: "Category does not exist!"
            });
        }

        const schedules = await Schedule.findAll({
            where: {
                startTime: {
                    [Op.gte]: Date.now()
                },
                categoryId: category.id
            }
        });

        const apointments = new Array();
        for(let i = 0; i < schedules.length; i++) {
            const schedule = schedules[i];
            const apointment = await apointmentController.getAvailableApointmentsByScheduleId(schedule.id);
            apointments.push(...apointment);
        }

        res.send(apointments);
    } catch(err) {
        res.status(500).send({ message: err.message });
    }
}

exports.getReservedApointmentsByCategoryId = async (req, res) => {
    try {
        const category = await categoryController.getCategoryById(req.params.id);
        if(category == null) {
            res.status(404).send({
                message: "Category does not exist!"
            });
        }

        const schedules = await Schedule.findAll({
            where: {
                startTime: {
                    [Op.gte]: Date.now()
                },
                categoryId: category.id
            }
        });

        const apointments = new Array();
        for(let i = 0; i < schedules.length; i++) {
            const schedule = schedules[i];
            const apointment = await apointmentController.getReservedApointmentsByScheduleId(schedule.id);
            apointments.push(...apointment);
        }

        res.send(apointments);
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