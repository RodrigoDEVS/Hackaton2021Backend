const {Router} = require('express');
const UserController = require('../controllers/userController');

class UserRouter{
    constructor(){
        this.router = Router();
        this.#config();
    }

    #config(){
        //Crear objeto de tipo UserController
        const userC = new UserController();
        //Configurar rutas
        this.router.post('/user', userC.register);
        this.router.post('/user/auth', userC.login)
    }
}

module.exports = UserRouter;