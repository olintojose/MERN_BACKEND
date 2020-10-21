//Rutas para crear usuarios
const express = require("express");
const router = express.Router();
const { check } = require("express-validator"); //npm i express validator
const authController = require("../controllers/auth.Controller");
const auth = require("../middleware/auth");


//iniciar sesion

// Api/auth

router.post('/',
  // Validaciones
/*  [
    check("email", "Agrega un email valido").isEmail(),
    check("password", "El password debe ser de minimo 6 caracteres").isLength({ min: 6 })
  ],*/
  authController.autenticarUsuario
);
//Obtiene el usuario autenticado
router.get("/", auth, authController.usuarioAutenticado);

module.exports = router;
