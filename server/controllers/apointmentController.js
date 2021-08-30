const db = require("../models");
const Apointment = db.Apointment;
const Request = db.Request;

exports.create = async (scheduleId, startTime, endTime) => {
    const result = await Apointment.create({
        ScheduleId: scheduleId,
        startTime:  new Date(startTime).getTime(),
        endTime:  new Date(endTime).getTime(),
        reserved: false
    });
    
    return result;
}

exports.getAvailableApointmentsByScheduleId = async (scheduleId) => {
    const result = await Apointment.findAll({ where: {
        ScheduleId: scheduleId,
        reserved: false
    }});
    
    return result;
}

exports.getReservedApointmentsByScheduleId = async (scheduleId) => {
    const result = await Request.findAll({
        where: {
            approved: true
        },
        include: {
            model: Apointment,
            order: [
                ['startTime', 'ASC']
            ], 
            where: {
                ScheduleId: scheduleId,
                reserved: true
            }
        }
    });
    
    return result;
}

exports.deleteApointmentsByScheduleId = async (scheduleId) => {
    await Apointment.destroy({ where: {
        ScheduleId: scheduleId
    }});
}

exports.reserveApointment = async (id) => { 
    const result = await Apointment.findOne({  
        where: {
            id: id
        }
    });

    result.reserved = true;
    result.save();
};

exports.declainApointment = async (id) => { 
    const result = await Apointment.findOne({  
        where: {
            id: id
        }
    });

    if(result == null) {
        res.status(404).send({ message: "Apointment does not exist!" });
    }

    result.reserved = false;
    result.save();
};