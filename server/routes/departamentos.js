const express = require('express');
const app = express();
const departamentoModel = require('../models/departamentos.model')

app.get('/', async (req, res) => {
    await departamentoModel.find({ blnActivo: true })
    .exec((err, departamento) =>{
        if(err){
            return res.status(400).json({
                ok: false, 
                err
            })
        }
        return res.status(200).json({
            ok: true, 
            count: departamento.length, 
            departamento
        })
    })
})

app.post('/', async (req, res) => {
    try {
        let departamento = new departamentoModel(req.body);
        let departamentoRegistrado = await departamento.save();
        return res.status(200).json({
            ok: true,
            resp: 200,
            msg: 'Se ha registrado el departamento exitosamente.',
            cont: {
                departamentoRegistrado
            }
        });
    } catch (err) {
        return res.status(500).json({
            ok: false,
            resp: 500,
            msg: 'Error al intentar registrar el departamento.',
            cont: {
                err: Object.keys(err).length === 0 ? err.message : err
            }
        });
    }
});

app.put('/', async (req, res) => {
    try {
        let departamentoBody = new departamentoModel(req.body);
        let err = departamentoBody.validateSync();
        if (err) {
            return res.status(400).json({
                ok: false,
                resp: 400,
                msg: 'Error de validación.',
                cont: {
                    err: Object.keys(err).length === 0 ? err.message : err
                }
            });
        }
        let { strNombre, strDescripcion, strArea, nmbExtension } = departamentoBody;
        let departamento = await departamentoModel.findByIdAndUpdate(departamentoBody._id, { $set: { strNombre, strDescripcion, strArea, nmbExtension } }, { new: true });

        if (!departamento) {
            return res.status(404).json({
                ok: false,
                resp: 404,
                msg: 'El departamento que deseas modificar no existe.',
                cont: {
                    departamento
                }
            });
        }
        return res.status(200).json({
            ok: true,
            resp: 200,
            msg: 'Se ha actualizado el departamento exitosamente.',
            cont: {
                departamento
            }
        });
    } catch (err) {
        return res.status(500).json({
            ok: false,
            resp: 500,
            msg: 'Error al intentar actualizar el departamento.',
            cont: {
                err: Object.keys(err).length === 0 ? err.message : err
            }
        });
    }
});


app.delete('/', async (req, res) => {
    const idDepartamento = req.query.idDepartamento;
    const blnActivo = req.query.blnActivo;
    try {
        if (!idDepartamento || idDepartamento.length < 24) {
            return res.status(400).json({
                ok: false,
                resp: 400,
                msg: 'No se recibió un identificador válido.',
                cont: {
                    idDepartamento: idDepartamento | null
                }
            });
        }
        if (blnActivo != 'false' && blnActivo != 'true') {
            return res.status(400).json({
                ok: false,
                resp: 400,
                msg: 'No se recibió un valor booleano en el parámetro blnActivo.',
                cont: {
                    blnActivo: blnActivo || null
                }
            });
        }
        const departamento = await departamentoModel.findByIdAndUpdate(idDepartamento, { $set: { blnActivo } }, { new: true });
        if (!departamento) {
            return res.status(404).json({
                ok: false,
                resp: 404,
                msg: `El departamento que deseas ${blnActivo === 'true' ? 'activar' : 'desactivar'} no existe.`,
                cont: {
                    departamento
                }
            });
        }
        return res.status(200).json({
            ok: true,
            resp: 200,
            msg: `Se ha ${blnActivo === 'true' ? 'activado' : 'desactivado'} el departamento exitosamente.`,
            cont: {
                departamento
            }
        });
    } catch (err) {
        return res.status(500).json({
            ok: false,
            resp: 500,
            msg: `Error al intentar ${blnActivo === 'true' ? 'activar' : 'desactivar'} el departamento.`,
            cont: {
                err: Object.keys(err).length === 0 ? err.message : err
            }
        });
    }
});

module.exports = app;