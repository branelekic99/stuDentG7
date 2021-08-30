const db = require("../models");
const Apointment = db.Apointment;

exports.create = async (scheduleId, startTime, endTime) => {
    const result = await Apointment.create({
        ScheduleId: scheduleId,
        startTime: startTime,
        endTime: endTime,
        reserved: false
    });
    
    return result;
}

exports.getApointmentsByScheduleId = async (scheduleId) => {
    const result = await Apointment.findAll({ where: {
        ScheduleId: scheduleId
    }});
    
    return result;
}

exports.deleteApointmentsByScheduleId = async (scheduleId) => {
    await Apointment.destroy({ where: {
        ScheduleId: scheduleId
    }});
}