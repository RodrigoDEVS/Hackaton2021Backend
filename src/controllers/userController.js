//Importar dependencias
const jwt = require('jsonwebtoken');
//Importar módulos
const User = require('../models/user');

class UserController{
    
    register(req, res){
        let objUser = req.body;
        if(objUser.name && objUser.document && objUser.email && objUser.password){
            User.create(objUser, (err, data)=>{
                if(err){
                    res.status(500).json({info: err});
                }else{
                    //Generar/crear token
                    let token = jwt.sign({id: data._id, email: data.email}, 'HackatonUPB2021');
                    res.status(201).json({token});
                }
            });
        }else{
            res.status(400).json({info: 'Datos incompletos'});
        }
    }
}

module.exports = UserController;