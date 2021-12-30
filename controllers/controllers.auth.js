const connection = require('./mysql.connection');
module.exports = {
    login: (email, callback) => {
        console.log(`select * from student where Email='${email}'`)
        connection.query(`select * from student where Email='${email}'`, (err, result) => {
            if (err) { console.log(err) }
            else { callback(result); }

        });
    }

}