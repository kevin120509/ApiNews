const { User } = require('../models/Usermodel')
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

const login = (request, response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return response.status(422).json({ errors: errors.mapped() });
    }
    User.findOne({
        where: {
            correo: request.body.correo,
            contraseña: request.body.contraseña,
            activo: true
        },
    }).then(entitie => {
            if (entitie) {
                const token = jwt.sign({usuario: entitie}, 'mi_llave_secreta', {expiresIn: '1h'});
                response.status(201).json({usuario: entitie, token: token});
            }
            else {
                response.status(401).json({message: "Sin autorización"});

            }
        })
        .catch(err => {
            response.status(500).send('Error al consultar el dato');
        })
}

const register = (request, response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return response.status(422).json({ errors: errors.mapped() });
    }
    request.body.perfil_id = 2
    request.body.activo = true

    User.create(request.body).then(
        newEntitie => {
            const token = jwt.sign({usuario: newEntitie}, 'mi_llave_secreta', {expiresIn: '1h'});
            response.status(201).json({usuario: newEntitie, token: token});
        }
    )
        .catch(err => {
            console.error('Error al crear usuario:', err);
            response.status(500).send('Error al crear');
        })
}

module.exports = {
    login,
    register,
};