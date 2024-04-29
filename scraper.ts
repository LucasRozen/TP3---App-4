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