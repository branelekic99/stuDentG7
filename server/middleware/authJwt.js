const jwt = require("jsonwebtoken");
const config = require("../config/authConfig.js");
const db = require("../models");
const Admin = db.Admin;
const Patient = db.Patient;

const verifyToken = async (req, res, next) => {
    let token = req.headers["x-access-token"];

    if (!token) {
        return res.status(403).send({
            message: "No token provided!"
        });
    } else {
        jwt.verify(token, config.secret, (err, decoded) => {
            if (err) {
                return res.status(401).send({
                    message: "Unauthorized!"
                });
            } else {
                if(decoded.type == 'admin') {
                    Admin.findByPk(decoded.id, {
                            rejectOnEmpty:true
                        }).then(admin => {
                            if(admin.token != token || admin.token == null) {
                                throw new Error();
                            }
                            req.userId = decoded.id;
                            req.userType = decoded.type;
                            next();
                        }).catch(err=>{
                            return res.status(401).send({
                                message: "Unauthorized!"
                            });
                        });
                        

                } else {
                    Patient.findByPk(decoded.id, {
                            rejectOnEmpty:true
                        }).then(patient => {
                            if(patient.token != token || patient.token == null) {
                                throw new Error();
                            }
                            req.userId = decoded.id;
                            req.userType = decoded.type;
                            next();
                        }).catch(err=>{
                            return res.status(401).send({
                                message: "Unauthorized!"
                            });
                        });
                }    
            }
        });
    }
};


const authJwt = {
    verifyToken: verifyToken
};

module.exports = {authJwt};
