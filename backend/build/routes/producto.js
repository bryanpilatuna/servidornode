"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
//LLAMAR A LOS MODELOS CREADOS
var producto_1 = __importDefault(require("../models/producto"));
var categoria_1 = __importDefault(require("../models/categoria"));
var Producto = /** @class */ (function () {
    function Producto() {
        this.router = express_1.Router();
        this.exponerRutas();
    }
    Producto.prototype.getProducto = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var productoBD, conteo, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, producto_1.default.find({}).sort('nombre').exec()];
                    case 1:
                        productoBD = _a.sent();
                        categoria_1.default.populate(productoBD, { path: "categoria", select: 'nombre' });
                        return [4 /*yield*/, producto_1.default.countDocuments()];
                    case 2:
                        conteo = _a.sent();
                        res.json({
                            productos: productoBD,
                            conteo: conteo
                        });
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        return [2 /*return*/, res.status(400).json({
                                dato: error_1
                            })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Producto.prototype.getProductoId = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var idurl, productoBD, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        idurl = req.params.id;
                        return [4 /*yield*/, producto_1.default.findById(idurl)];
                    case 1:
                        productoBD = _a.sent();
                        res.json({
                            ok: true,
                            producto: productoBD
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        error_2 = _a.sent();
                        return [2 /*return*/, res.status(400).json({
                                ok: false,
                                dato: "Producto no encontrado",
                                message: error_2
                            })];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Producto.prototype.postProducto = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var bodycabecera, producto_2, productoBD, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        bodycabecera = req.body;
                        console.log(req.body);
                        producto_2 = new producto_1.default({
                            nombre: bodycabecera.nombre,
                            precioUni: bodycabecera.precioUni,
                            descripcion: bodycabecera.descripcion,
                            categoria: bodycabecera.categoria,
                        });
                        return [4 /*yield*/, producto_2.save()];
                    case 1:
                        productoBD = _a.sent();
                        res.json({
                            producto: productoBD
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        error_3 = _a.sent();
                        return [2 /*return*/, res.status(400).json({
                                dato: error_3
                            })];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Producto.prototype.putProducto = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var idurl, bodycabecera, productoBD, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        idurl = req.params.id;
                        bodycabecera = req.body;
                        return [4 /*yield*/, producto_1.default.findByIdAndUpdate(idurl, bodycabecera, { new: true, runValidators: true, context: 'query' })];
                    case 1:
                        productoBD = _a.sent();
                        res.json({
                            producto: productoBD
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        error_4 = _a.sent();
                        return [2 /*return*/, res.status(400).json({
                                ok: "ERROR",
                                dato: error_4
                            })];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Producto.prototype.deleteProducto = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var idurl, productoBD, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        idurl = req.params.id;
                        return [4 /*yield*/, producto_1.default.findByIdAndRemove(idurl)];
                    case 1:
                        productoBD = _a.sent();
                        res.json({
                            mensaje: "PRODUCTO ELIMINADO",
                            producto: productoBD
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        error_5 = _a.sent();
                        return [2 /*return*/, res.status(400).json({
                                message: "PRODUCTO NO ENCONTRADO",
                                dato: error_5
                            })];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Producto.prototype.exponerRutas = function () {
        this.router.get('/', this.getProducto);
        this.router.get('/:id', this.getProductoId);
        this.router.post('/', this.postProducto);
        this.router.put('/:id', this.putProducto);
        this.router.delete('/:id', this.deleteProducto);
    };
    return Producto;
}());
var producto = new Producto();
exports.default = producto.router;
