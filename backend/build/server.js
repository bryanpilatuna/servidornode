"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//llamar al modulo express
var express_1 = __importDefault(require("express"));
var morgan_1 = __importDefault(require("morgan"));
var mongoose_1 = __importDefault(require("mongoose"));
var compression_1 = __importDefault(require("compression"));
var cors_1 = __importDefault(require("cors"));
//llamar a las rutas del servidor
var producto_1 = __importDefault(require("./routes/producto"));
var categoria_1 = __importDefault(require("./routes/categoria"));
//import producto from './models/producto';
var Server = /** @class */ (function () {
    function Server() {
        //inicializar el modulo express
        this.app = express_1.default();
        this.config();
        this.routes();
    }
    Server.prototype.config = function () {
        //inicializar el puerto express
        this.app.set('port', process.env.PORT || 3000);
        // CONEXIÓN A LA BDD
        var MONGO_URI = 'mongodb://localhost:27017/tienda';
        mongoose_1.default.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }).then(function () {
            console.log("BDD OK");
        });
        // VER LAS RUTAS QUE SE ESTAN SOLICITANDO 
        this.app.use(morgan_1.default('dev'));
        // COMPRESIÓN DE LAS RESPUESTAS
        this.app.use(compression_1.default());
        // PARA LA CONEXIÓN CON EL FRONTEND
        this.app.use(cors_1.default());
        // RECIBIR Y ENVIAR LAS RESPUESTAS DE TIPO JSON
        this.app.use(express_1.default.json());
        // SOPORTE PARA EL ENVIO DE FORMULARIOS
        this.app.use(express_1.default.urlencoded({ extended: false }));
    };
    Server.prototype.routes = function () {
        this.app.use('/api/producto', producto_1.default);
        this.app.use('/api/categoria', categoria_1.default);
    };
    ;
    Server.prototype.start = function () {
        //inicializa el servidor express
        this.app.listen(this.app.get('port'), function () {
            console.log("SERVIDOR FUNCIONANDO");
        });
    };
    return Server;
}());
//instanciar la clase
var server = new Server();
server.start();
