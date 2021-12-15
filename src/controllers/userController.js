//Importar dependencias
const jwt = require('jsonwebtoken');
const user = require('../models/user');
//Importar módulos
const User = require('../models/user');
const { PRIVATE_KEY, TokenController } = require('./tokenController');

class UserController{

    constructor(){
        this.objTokenC = new TokenController();
    }
    
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

    //Propiedad inicializadora
    get = (req, res)=>{
        let decode = jwt.decode(this.objTokenC.getToken(req), PRIVATE_KEY);
        User.find({user_id: decode.id}, (error, data)=>{
            if(error){
                res.status(500).json({info: error});
            }else{
                res.status(200).json(data);
            }
        });
    }

    update = (req, res) => {
        //decodificar token
        let decode = jwt.decode(this.objTokenC.getToken(req), PRIVATE_KEY);
        let { id, name, document, email, password } = req.body;
        User.findOneAndUpdate(
            { user_id: decode.id },
            { name: name, document: document, email: email, password: password },
            (err, doc) => {
                if (err) {
                    res.status(500).json({ info: err });
                } else {
                    res.status(200).json({ info: "Usuario Actualizado" });
                }
            }
        );
    }

    delete = (req, res) => {
        //decodificar token
        let decode = jwt.decode(this.objTokenC.getToken(req), PRIVATE_KEY);
        let { id } = req.body;
        User.findOneAndRemove(
            { user_id: decode.id },
            (err, doc) => {
                if (err) {
                    res.status(500).json({ info: err });
                } else {
                    res.status(200).json({ info: "Usuario eliminado" });
                }
            }
        );
    };
}

module.exports = UserController;