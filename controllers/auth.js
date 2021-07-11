const mysql = require("mysql");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
  });

exports.register=(req,res)=>{
    console.log(req.body);
// const name = request.body.name;
// const email = request.body.email;
// const password = request.body.password;
// const passwordConfirm = request.body.passwordConfirm;
const {name, email, password, passwordConfirm} = req.body;

db.query('SELECT email FROM users WHERE email=?', [email], async(error, results)=>{
    if(error) console.log(error);
    if(results.length > 0) return res.render('register',{
        message: 'The email is already in use'
    })
    else if( password !== passwordConfirm){
        return res.render('register',{
          message: 'Passwords donot match'  
        });
    }

    let hashedPassword = await bcrypt.hash(password, 8);
    console.log(hashedPassword);

    db.query(' INSERT INTO USERS SET ?', {name: name, email: email, password:hashedPassword }, (error, results)=>{
        if(error) console.log(error);
        else {
        console.log(results);
        return res.render('register', {
            message: 'User Registered'  
          });
        }
    })
   
});
}