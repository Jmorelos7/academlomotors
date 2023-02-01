const express = require('express');
const cors = require('cors');
const { usersRouter } = require('../routes/user.routes');
const { db } = require('../database/db');
const morgan = require('morgan');
const { repairsRouter } = require('../routes/repairs.routes');
const globalErrorHandler = require('../controllers/error.controller');
const AppError = require('../utils/appError');
//1. CREAMOS UNA CLASE

class Server {
  constructor() {
    //DEFINIMOS LA APLICACIÓN DE EXPRESS Y SE LA ASIGNAMOS A LA PROPIEDAD APP
    this.app = express();
    //DEFINIMOS EL PUERTO QUE LO TENEMOS EN LOS ENVIROMENTS
    this.port = process.env.PORT || 5000;

    //DEFINIMOS LOS PATHS DE NUESTRA APLICACIÓN
    this.paths = {
      user: '/api/v1/user',
      repair: '/api/v1/repair',
    };
    // aquí llamamos al metodo database...
    this.database()

    //INVOCAMOS EL METODO MIDDLEWARES
    this.middlewares();

    //INVOCAMOS EL METODO ROUTES
    this.routes();
  }

  //MIDDLEWARES
  middlewares() {

    if(process.env.NODE_ENV==='development'){
      this.app.use(morgan('dev'))      
    }

    //UTILIZAMOS LAS CORS PARA PERMITIR ACCESSO A LA API
    this.app.use(cors());
    //UTILIZAMOS EXPRESS.JSON PARA PARSEAR EL BODY DE LA REQUEST
    this.app.use(express.json());
  }

  //RUTAS
  routes() {
    //utilizar las rutas de usuarios
    this.app.use(this.paths.user, usersRouter);
    //Utilizar las rutas para repairs
    this.app.use(this.paths.repair, repairsRouter);
    //el * significa todo, en este caso cualquier ruta
    // this.app.all('*', (req, res, next) => {
    //   res.status(404).json({
    //     status: 'error',
    //     message: `Can't find ${req.originalUrl} on this server!`,
    //   });
    // }); 

    this.app.all('*', (req, res, next) => {
      return next(
        new AppError(`Can't find ${req.originalUrl} on this server!`, 404)
        );       
    }); 


    this.app.use(globalErrorHandler)
  }

  database(){
    db.authenticate()
    .then(() => console.log('Database authenticate'))
    .catch(err => console.log(err))

    // NUNCA HACER UN {force:true}, NI POR EL CHIRAS, CON ESTO BORRAN TODA LA BASE DE DATOS
    db.sync()  
    .then(() => console.log('Database synced'))
    .catch(err => console.log(err))
  }

  //METODO PARA ESCUCHAR SOLICITUDES POR EL PUERTO
  listen() {
    this.app.listen(this.port, () => {
      console.log('Server is running on port', this.port);
    });
  }
}

//2. EXPORTAMOS EL SERVIDOR
module.exports = Server;
