const mysql=require('mysql');
const connection=mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', 
    database:'studentdb'
})

connection.connect((err)=>{
    if(err) {
        console.log("not connected with DB");
    }
    else{
        console.log("connection established");
    }
})

module.exports =connection;
