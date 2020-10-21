const express= require('express');
const router = express.Router();
const proyectoController = require('../controllers/proyectoController')
const auth = require('../middleware/auth');
const { check } = require('express-validator');

//CRear proyectos
// Api/proyectos
router.post('/', 
    auth,
    [
        check('nombre', 'El nombre del proyecto es obligatorio').not().isEmpty()
    ],
    proyectoController.crearProyecto
    )
//Obtener todos los proyectos
router.get('/', 
    auth,
    proyectoController.obtenerProyectos
    )

    //Actualiza proyecto por id

    router.put('/:id',
        auth,
        [
            check('nombre', 'El nombre del proyecto es obligatorio').not().isEmpty()
        ],
        proyectoController.actualizarProyecto
        )
        
    router.delete('/:id',
    auth,
  
    proyectoController.eliminarProyecto
    )


    //Eliminar un proyecto

module.exports = router;