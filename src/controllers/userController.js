//Importar dependencias
const jwt = require('jsonwebtoken');
//Importar módulos
const User = require('../models/user');
const { PRIVATE_KEY } = require('./tokenController');

class UserController{
    
    register(req, res){
        let objUser = req.body;
        if(objUser.name && objUser.document && objUser.email && objUser.password){
            User.create(objUser, (err, data)=>{
                if(err){
                    res.status(500).json({info: err});
                }else{
                    //Generar/crear token
                    let token = jwt.sign({id: data._id, email: data.email}, PRIVATE_KEY);
                    res.status(201).json({token});
                }
            });
        }else{
            res.status(400).json({info: 'Datos incompletos'});
        }
    }

    login(req, res){
        //capturar datos del cuerpo de la peticion
        let {email, password} = req.body;
        User.findOne({email, password}, (error, data)=>{
            if(error){
                res.status(500).json({error});
            }else{
                if(data != null && data != undefined){
                //Generar/crear token
                let token = jwt.sign({id: data._id, email: data.email}, PRIVATE_KEY);
                res.status(200).json({token});
            }else{
                res.status(401).json({info: 'Credenciales inválidas'});
            }
        }
        })
    }
}

module.exports = UserController;