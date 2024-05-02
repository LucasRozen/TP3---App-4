"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.avisoPosteo = exports.descargarFotosPerfil = exports.extraerFotosPerfil = void 0;
const instagram_private_api_1 = require("instagram-private-api");
const nodemailer = __importStar(require("nodemailer"));
// Creamos una const ig donde va a estar la API de Instagram
const ig = new instagram_private_api_1.IgApiClient();
// Autenticarse con un usuario y contraseña
(() => __awaiter(void 0, void 0, void 0, function* () {
    // Intenta logguearse
    try {
        // Iniciar sesión con tu nombre de usuario y contraseña (una cuenta nueva, que no usen)
        const loggedInUser = yield ig.account.login('tu_nombre_de_usuario', 'tu_contraseña');
        console.log('¡Iniciaste sesión como:', loggedInUser.username);
        // Buscar el ID de usuario a partir del nombre de usuario
        const acosado = yield ig.user.searchExact('nombre_de_usuario');
        // Muestra el id del usuario encontrado (.pk accede al id del usuario)
        console.log('ID de usuario encontrado:', acosado.pk);
        // Si los datos están mal, que le dé error
    }
    catch (error) {
        console.error('Error al iniciar sesión:', error);
    }
}))();
// API notificación
function enviarCorreo() {
    return __awaiter(this, void 0, void 0, function* () {
        // Intenta enviar el correo
        try {
            // Creamos una const transporter. El transporter es un objeto que se encarga de mandar el correo
            const transporter = nodemailer.createTransport({
                service: 'hotmail', // Por ejemplo, 'gmail', 'hotmail', etc.
                auth: {
                    user: 'appinstagramprogra@hotmail.com',
                    pass: 'programacion4'
                },
            });
            // Enviar correo con los datos que correspondan
            const info = yield transporter.sendMail({
                // El from siempre va a quedar así
                from: '"Programación Cuatro" <appinstagramprogra@hotmail.com>', // sender address
                to: "noelipacio@hotmail.com", // lista de destinatarios, va a ir a nuestro acosador (NOE NO ES LA ACOSADORA QUE QUIERE STALKEAR A SU EX, ES SOLO UNA PRUEBA)
                subject: "Acoso", // asunto
                text: "Hola acosador, ¿cómo estás?", // cuerpo de texto 
            });
            // Si me muestra esto en consola, es que funcionó y se envió el mensaje
            console.log("Mensaje enviado: %s", info.messageId);
            // Si no puede enviar el correo, muestra error
        }
        catch (error) {
            console.error("Error al enviar el mensaje:", error);
        }
    });
}
enviarCorreo();
// Esta función tiene que crear un array de urls que es el que va a 
// usar la función descargarFotosPerfil para descargar las fotos
// La función recibe el nombre de perfil que es un string y va a devolver un array de strings (urls)
function extraerFotosPerfil(nombrePerfil) {
    // Aquí implementarían la lógica para extraer las fotos del perfil dado
    // Va a retornar un arreglo de URLs de las imágenes
    return [];
}
exports.extraerFotosPerfil = extraerFotosPerfil;
// Esta función va a recibir el mismo array que devuelva la función extraerFotosPerfil 
// Y va a devolver otro array de strings
function descargarFotosPerfil(urls) {
    // Aquí implementarían la lógica para descargar las fotos dadas por las URLs
    return [];
}
exports.descargarFotosPerfil = descargarFotosPerfil;
// Esta función recibe un perfil, que es un string
function avisoPosteo(perfil) {
    // Aquí implementarían la lógica para enviar un aviso cuando 
    // se realice un nuevo posteo en el perfil dado
}
exports.avisoPosteo = avisoPosteo;
