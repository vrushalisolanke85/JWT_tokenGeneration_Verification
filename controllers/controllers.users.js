const connection = require('./mysql.connection');
const bcrypt = require('bcrypt');
const {validationResult} =require('express-validator');
module.exports = {
    getUsers: (req, res) => {
        //SELECT * FROM student`
        connection.query(`SELECT StudID, Name, Email, Mobile, Age FROM student where StudID=${req.user.StudID}`, (err, result) => {
            if (err) {
                res.send({ error: true, message: err })
            } else {
                res.send({ error: false, data: result });
            }

        })
    },

    searchUsers: (req, res) => {
        connection.query(`SELECT StudID, Name, Email, Mobile, Age FROM student where StudID=${req.params.id}`, (err, result) => {
            if (err) {
                res.send({ error: true, message: err })
            } else {
                res.send({ error: false, data: result });
            }

        })
    },
    createUser: (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        } else {
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(req.body.Password, salt);
            connection.query(`INSERT INTO student(StudID, Name, Email, Mobile, Age, password) VALUES (0,'${req.body.Name}','${req.body.Email}','${req.body.Mobile}',${req.body.Age},'${hash}')`, (err, result) => {
                if (err) {
                    res.send({ error: true, message: err })
                } else {
                    if (result.affectedRows > 0) {
                        res.send({ error: false, message: "New record Added with ID " + result.insertId });
                    }

                }

            })
        }


    }
}