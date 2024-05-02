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
const nodemailer = __importStar(require("nodemailer"));
// Creamos una const ig donde va a estar la API de Instagram
/*
const ig = new IgApiClient();
// Autenticarse con un usuario y contraseña
(async () => {
    // Intenta logguearse
  try {
    // Iniciar sesión con tu nombre de usuario y contraseña (una cuenta nueva, que no usen)
    const loggedInUser = await ig.account.login('tu_nombre_de_usuario', 'tu_contraseña');
    console.log('¡Iniciaste sesión como:', loggedInUser.username);
    // Buscar el ID de usuario a partir del nombre de usuario
    const acosado = await ig.user.searchExact('nombre_de_usuario');
    // Muestra el id del usuario encontrado (.pk accede al id del usuario)
    console.log('ID de usuario encontrado:', acosado.pk);
    // Si los datos están mal, que le dé error
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
  }
})();
*/
// API notificación
function enviarCorreo() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Creamos una const transporter. El transporter es un objeto que se encarga de mandar el correo.
            const transporter = nodemailer.createTransport({
                // Host: es la dirección del servidor que manda el mail
                host: "smtp.ethereal.email",
                // Port: el puerto en el que el servidor escucha las conexiones. El 587 es el más utilizado para mandar correos de forma segura. 
                port: 587,
                secure: false, // Use true for port 465, false for all other ports
                // Esto no va a cambiar porque es el mail y contraseña que se usan para acceder al servidor
                auth: {
                    user: "maddison53@ethereal.email",
                    pass: "jn7jnAPss4f63QBp6D",
                },
            });
            // Creamos una const transporter. El transporter es un objeto que se encarga de mandar el correo.
            /* const transporter = nodemailer.createTransport({
               service: 'gmail', // Por ejemplo, 'gmail', 'hotmail', etc.
               auth: {
                 user: 'appinstagramprogra@gmail.com',
                 pass: 'programacion4'
               },
             });*/
            // Enviar correo con los datos
            const info = yield transporter.sendMail({
                // El from siempre va a quedar así
                from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>', // sender address
                to: "ciclonagus15@outlook.com", // lista de destinatarios
                subject: "¡Hola! ✔", // asunto
                text: "¿Hola mundo?", // cuerpo de texto plano
                html: "<b>¿Hola mundo?</b>", // cuerpo HTML
            });
            console.log("Mensaje enviado: %s", info.messageId);
            // Mensaje enviado: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
        }
        catch (error) {
            console.error("Error al enviar el mensaje:", error);
        }
    });
}
enviarCorreo();
/*
export interface usuario {
    nombreUsuario: string;
    contraseniaUsuario: string
}

export interface perfil {
    nombrePerfil: string
}

export interface notificacion {
    mensaje: string
}

// Esta función tiene que crear un array de urls que es el que va a usar la función descargarFotosPerfil para descargar las fotos
export function extraerFotosPerfil(nombrePerfil: string): string[] {
    // Aquí implementarías la lógica para extraer las fotos del perfil dado
    // Retornarías un arreglo de URLs de las imágenes
    return [];
}

// Esta función va a recibir el mismo array que se declare en la función extraerFotosPerfil
export function descargarFotosPerfil(urls: string[]): string[] {
    // Aquí implementarías la lógica para descargar las fotos dadas por las URLs
    return[];
}

export function avisoPosteo(perfil: string) {
    // Aquí implementarías la lógica para enviar un aviso cuando
    // se realice un nuevo posteo en el perfil dado
}

*/
/*export interface scrapper {
    nombreUsuario: string;
    contraseniaUsuario: string;
    perfil: string;
    url: string;
    notificacion: string
}

const urls: scrapper[] = [];

export function extraerFotosPerfil(perfil: string): string[] {
    // Aquí implementarías la lógica para extraer las fotos del perfil dado
    // Retornarías un arreglo de URLs de las imágenes
    return [];
}

export function descargarFotosPerfil(urls: string[]) {
    // Aquí implementarías la lógica para descargar las fotos dadas por las URLs
}

export function avisoPosteo(perfil: string) {
    // Aquí implementarías la lógica para enviar un aviso cuando
    // se realice un nuevo posteo en el perfil dado
}*/ 
