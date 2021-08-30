const db = require("../models");
const Message = db.Message;

exports.deleteRequestMessages = async (requestId) => {
    await Message.destroy({
        where: {
            requestId: requestId
        }
    });
}

exports.getRequestMessages = async (requestId) => {
    return await Message.findAll({
        where: {
            requestId: requestId
        },
        order: [
            ['createdAt', 'DESC']
        ], 
    });
}

exports.sendMessage = async (requestId, message, patientId, adminId) => {
    return await Message.create({
        requestId: requestId,
        message: message,
        patientId: patientId,
        adminId: adminId
    });
}