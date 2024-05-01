import { IgApiClient } from 'instagram-private-api';

// Creamos una const ig donde va a estar la api
const ig = new IgApiClient();

// Autenticarse con un usuario y contraseña
(async () => {
  try {
    // Iniciar sesión con tu nombre de usuario y contraseña
    const loggedInUser = await ig.account.login('tu_nombre_de_usuario', 'tu_contraseña');
    console.log('¡Iniciaste sesión como:', loggedInUser.username);
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
  }
})();

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