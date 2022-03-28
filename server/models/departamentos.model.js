const mongoose = require('mongoose')

let Schema = mongoose.Schema;

let departamentoSchema = new Schema({
    strNombre: {
        type: String,
        required: [true, 'Por favor ingresa el nombre del departamento']
    },
    strDescripcion: {
        type: String,
        required: [true, 'Por favor ingresa la descripcion del departamento']
    },
    strArea: {
        type: String,
        required: [true, 'Por favor ingresa el area del departamento']
    },
    nmbExtension: {
        type: Number,
        required: [true, 'Por favor ingresa el numero de extension del departamento']
    },
    blnActivo: {
        type: Boolean,
        default: true
    }
})

module.exports = mongoose.model('departamentos', departamentoSchema);