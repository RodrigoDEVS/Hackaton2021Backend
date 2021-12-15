const {Router} = require('express');
const { TokenController } = require('../controllers/tokenController');
const UserController = require('../controllers/userController');

class UserRouter{
    constructor(){
        this.router = Router();
        this.#config();
    }

    #config(){
        //Crear/Configurar rutas
        let objToken = new TokenController();
        //Requerir autenticación para acceder a las rutas de los usuarios
        this.router.use(objToken.verifyAuth);
        //Crear objeto de tipo UserController
        const userC = new UserController();
        //Configuracion de las rutas
        this.router.post('/user', userC.register);
        this.router.post('/user/auth', userC.login);
        this.router.get('/user', userC.get);
    }
}

module.exports = UserRouter;