"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var productoSchema = new mongoose_1.Schema({
    nombre: {
        type: String, required: [true, 'El nombre es requerido']
    },
    precioUni: {
        type: Number, required: [true, 'El precio es requerido']
    },
    descripcion: {
        type: String, required: [false]
    },
    disponible: {
        type: Boolean, required: true, default: true
    },
    categoria: {
        type: mongoose_1.Schema.Types.ObjectId, required: true, ref: 'categoria'
    }
});
//exportar el modelo para ser usado en todo el proeycto
exports.default = mongoose_1.model('producto', productoSchema);
