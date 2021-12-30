var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const loginController = require('../controllers/controllers.auth')
/* GET users listing. */

router.post('/login', (req, res, next) => {
  loginController.login(req.body.email, (result) => {
    let isSame = bcrypt.compareSync(req.body.password, result[0].password);
    if (isSame) {
      console.log(isSame);
      let token=jwt.sign({
       Name:result[0].Name,
       StudID:result[0].StudID,
      }, 'secret', { algorithm: 'HS256', expiresIn: '1h' });
      res.send({ error: false,token:token, message: "loged IN" });
    }else{
      res.send({ error: ture,message: "invalid login details" });
    }
  })
});


module.exports = router;
