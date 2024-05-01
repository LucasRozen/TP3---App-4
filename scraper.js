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
Object.defineProperty(exports, "__esModule", { value: true });
exports.avisoPosteo = exports.descargarFotosPerfil = exports.extraerFotosPerfil = void 0;
const instagram_private_api_1 = require("instagram-private-api");
// Creamos una const ig donde va a estar la api
const ig = new instagram_private_api_1.IgApiClient();
// Autenticarse con un usuario y contraseña
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Iniciar sesión con tu nombre de usuario y contraseña
        const loggedInUser = yield ig.account.login('tu_nombre_de_usuario', 'tu_contraseña');
        console.log('¡Iniciaste sesión como:', loggedInUser.username);
    }
    catch (error) {
        console.error('Error al iniciar sesión:', error);
    }
}))();
// Esta función tiene que crear un array de urls que es el que va a usar la función descargarFotosPerfil para descargar las fotos
function extraerFotosPerfil(nombrePerfil) {
    // Aquí implementarías la lógica para extraer las fotos del perfil dado
    // Retornarías un arreglo de URLs de las imágenes
    return [];
}
exports.extraerFotosPerfil = extraerFotosPerfil;
// Esta función va a recibir el mismo array que se declare en la función extraerFotosPerfil 
function descargarFotosPerfil(urls) {
    // Aquí implementarías la lógica para descargar las fotos dadas por las URLs
    return [];
}
exports.descargarFotosPerfil = descargarFotosPerfil;
function avisoPosteo(perfil) {
    // Aquí implementarías la lógica para enviar un aviso cuando 
    // se realice un nuevo posteo en el perfil dado
}
exports.avisoPosteo = avisoPosteo;
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
