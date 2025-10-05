const { New } = require('../models/newmodel')

const get = (request, response) => {
    const { titulo, activo } = request.query
    const filters = {}

    if (titulo) {
        filters.titulo = titulo
    }

    if (activo) {
        filters.activo = activo
    }

    New.findAll({
        where: filters
    })
        .then(entities => {
            response.json(entities);
        })
        .catch(err => {
            console.log(err)
            response.status(500).send('Error consultando los datos');
        })
}

const getById = (request, response) => {
    const id = request.params.id;
    New.findByPk(id)

        .then(entitie => {
            if (entitie) {
                response.json(entitie);
            }
            else {
                response.status(404).send('Recurso no encontrado')
            }
        })
        .catch(err => {
            response.status(500).send('Error al consultar el dato');
        })
}

const create = (request, response) => {
    New.create(request.body)
        .then(newEntitie => {
            response.status(201).json(newEntitie)
        })
        .catch(err => {
            console.error(err);
            response.status(500).json({ mensaje: 'Error al crear', error: err.message });
        });
}

const update = (request, response) => {
    const id = request.params.id;
    New.update(
        request.body
        , {
            where: {
                id: id
            }
        }
    )
        .then(numRowsUpdated => {
            response.status(200).send(`${numRowsUpdated} registro actualizado`);
        })
        .catch(err => {
            response.status(500).send('Error al actualizar');
        });
}

const destroy = (request, response) => {
    const id = request.params.id;
    New.destroy({
        where: {
            id: id
        }
    })
        .then(numRowsDeleted => {
            response.status(200).send(`${numRowsDeleted} registro eliminado`);
        })
        .catch(err => {
            response.status(500).send('Error al eliminar');
        });
}

module.exports = { get, getById, create, update, destroy };