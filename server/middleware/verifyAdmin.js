const db = require("../models");
const Admin = db.Admin;

const checkDuplicateUsername = async (req, res, next) => {
    const admin = await Admin.findOne({
        where: {
            username: req.body.username
        }
    });

    if (admin) {
        res.status(400).send({
            message: "Failed! Username is already in use!"
        });
        return;
    } else {
        next();
    }
};

const checkIfAdminExists = async (req, res, next) => {
    const admin = await Admin.findOne({
        where: {
            id: req.userId
        }
    });

    if(admin == null) {
        res.status(404).send({
            message: "Admin does not exist!"
        });
    } else {
        next();
    }
};

const checkIfAdminIsSuperuser = async (req, res, next) => {
    const admin = await Admin.findOne({
        where: {
            id: req.userId
        }
    });

    if(admin.isSuperuser == false) {
        res.status(401).send({
            message: "Admin is not superuser!"
        });
    } else {
        next();
    }
};

const verifyAdmin = {
    checkDuplicateUsername: checkDuplicateUsername,
    checkIfAdminExists: checkIfAdminExists,
    checkIfAdminIsSuperuser: checkIfAdminIsSuperuser
};

module.exports = {verifyAdmin};