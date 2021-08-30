const db = require("../models");
const Schedule = db.Schedule;

const verifyEndAndStartTime = async (req, res, next) => {
    if(new Date(req.body.startTime) < Date.now() || new Date(req.body.endTime) < Date.now()) {
        res.status(422).send({
            message: "Failed! Start and end time must be in the future!"
        });
    }

    if(new Date(req.body.startTime) >= new Date(req.body.endTime)) {
        res.status(422).send({
            message: "Failed! End time must be later than start time!"
        });
    }

    next();
};

const verifyScheduleExists = async (req, res, next) => {
    const schedule = await Schedule.findOne({ 
        attributes: ['id', 'categoryId', 'startTime', 'endTime', 'updatedAt', 'createdAt'],
        where: {
            id: req.params.id
        }
    });

    if(schedule == null) {
        res.status(404).send({
            message: "Schedule does not exist!"
        });
    }

    next();
};

const verifySchedule = {
    verifyEndAndStartTime: verifyEndAndStartTime,
    verifyScheduleExists: verifyScheduleExists
};

module.exports = {verifySchedule};