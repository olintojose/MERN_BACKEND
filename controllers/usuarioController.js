const Usuario = require('../models/Usuario');
const bcryptjs = require('bcryptjs');  //  npm i bcryptjs
const { validationResult } = require('express-validator');
const jwt = require ('jsonwebtoken');

exports.crearUsuario = async (req, res) => {
    //console.log('Desde crearUsuario');
   // console.log(req.body);

   //Validar si hay errores
    const errores = validationResult(req);

    if( !errores.isEmpty() ) {
        return res.status(400).json({errores: errores.array() })
    }


    //extraer email y password

    const { email, password } = req.body;

   try {
    //REvisar que el usuario sea unico





    let usuario = await Usuario.findOne({ email });

    if (usuario) {
        return res.status(400).json({ msg: 'El usuario ya existe'})
    }
    

    //Crea el nuevo usuario
    usuario= new Usuario(req.body);
    
    // Hashear password
    const salt = await bcryptjs.genSalt(10);
    usuario.password= await bcryptjs.hash(password, salt);
    
    //Guardar nuevo usuario
        
    await usuario.save()

    //Crear y firmar el JWT
const payload = {
    usuario: {
        id: usuario.id
    }

};

//Firma
jwt.sign(payload, process.env.SECRETA, {
    expiresIn: 3600
},(error, token) => {
    if(error) throw error;

     //Mensaje de conformacion
     res.json({ token })

})

   

   } catch (error) {
       console.log(error);
       res.status(400).send('Hubo un error');
   }
}
