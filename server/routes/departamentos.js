const express = require('express');
const app = express();
const departamentoModel = require('../models/departamentos.model')

app.get('/', async (req, res) => {
    return res.status(200).json({
        ok: true,
        status: 200,
        text: 'OK'
    })
})

app.post('/', async (req, res) => {
    try {
        let body = req.body;
        let departamento = new departamentoModel(body);
        //let errorModel = departamento.validateSync();
        console.log(body);
        if (body){
            return res.status(200).json({
                ok: true,
                status: 200,
                body
            });
        }
    } catch (error) {
        return res.status(500).json({
            ok: true,
            status: 200,
            body
        });
    }
});


module.exports = app;