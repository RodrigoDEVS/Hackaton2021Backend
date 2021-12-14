//Importar dependencias
const express = require('express');
const morgan = require('morgan');
//Importar modulos/clases
const IndexRouter = require('./routers/indexRouter');
const ConnDb = require('./database/connDb');
const UserRouter = require('./routers/userRouter');

class Server{
    constructor(){
        this.objConn = new ConnDb();
        this.app = express();
        this.#config();
    }

    #config(){
        //Indicar al servidor que los datos se procesaran en formato JSON para las peticiones http
        this.app.use(express.json());
        //usar morgan en express para el monitoreo de las peticiones http
        this.app.use(morgan());
        //Almacenar el puerto por el que correrá el servidor
        this.app.set('PORT', process.env.PORT || 3000);
        let puerto = this.app.get('PORT');
        //-------CREAR RUTAS-----------
        const indexR = new IndexRouter();
        const userR = new UserRouter();
        //-------AÑADIR RUTAS A EXPRESS------
        this.app.use(indexR.router);
        this.app.use(userR.router);
        //Poner el servidor a la escucha
        this.app.listen(puerto, ()=>{
            console.log(`Servidor corriendo por el puerto ==> ${puerto}`)
            //console.log('Servidor corriendo por el puerto ===>', this.app.get('PORT') )
        });
    }
}

new Server();