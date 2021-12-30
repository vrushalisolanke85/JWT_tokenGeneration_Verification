var express = require('express');
var router = express.Router();
const multer  = require('multer');
const path  = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) =>{
    cb(null, 'uploads/')
  },
  filename:  (req, file, cb) =>{
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix+path.extname(file.originalname))
  }
})
const upload = multer({storage:storage})

const { body } = require('express-validator');
const userController = require('../controllers/controllers.users');
/* GET users listing. */
router.get('/', userController.getUsers);
router.post('/create', [body('Name').notEmpty().withMessage("Name can not be empty").isLength({ min: 4, max: 150 }).isAlpha().withMessage("Name should be in alphabet"),
body('Email').notEmpty().withMessage("Email can not be empty").isEmail().normalizeEmail().withMessage("provide valid email address"),
body('Mobile').notEmpty().withMessage("Mobile can not be empty").isNumeric().withMessage("Mobile number should be in number").isLength({ min: 10, max: 12}).withMessage("Mobile number should be in 10 digits"),
],

userController.createUser);

router.post('/upload', upload.single('avatar'),(req, res, next) => {
  res.send({ data: req.file});
});
router.post('/delete', (req, res, next) => {
  res.send({ title: 'DELETE' ,data:req.user});
});

router.post('/search/:id', userController.searchUsers);
module.exports = router;
