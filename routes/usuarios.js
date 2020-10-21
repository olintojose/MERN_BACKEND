//Rutas para crear usuarios

const express= require('express');

const router = express.Router();

const usuarioController =  require('../controllers/usuarioController');

const { check } = require ('express-validator') ; //npm i express validator

//Crear usuarios

// Api/usuarios

router.post('/', 
    // Validaciones
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'Agrega un email valido').isEmail(),
        check('password', 'El password debe ser de minimo 6 caracteres').isLength({ min: 6})
    ],

    usuarioController.crearUsuario
);

module.exports = router;