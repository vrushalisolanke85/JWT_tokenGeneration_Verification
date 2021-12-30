var jwt = require('jsonwebtoken');
module.exports={
    checktoken:(req, res, next) => {
         let token = req.headers.token;
         if(token) {
           jwt.verify(token,'secret',(err,decode)=>{
            if(err) {
                res.send({error:true,message:"unAuthorized user"})
            }else{
                req.user=decode;
                next();
            }
           });
         }else{
             res.send({error:true,message:"token not found"});
         }
    }
}