import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

export interface Usuario {
    nombre: string,
    clave: string,
    email: string
}

export interface Perfil {
    nombrePerfil: string
}
export interface Notificacion {
    mensaje: string
}

async function abrirConexion() {
    return open({
        filename: 'db.sqlite',
        driver: sqlite3.Database
    })
}

// Agrega una nuevo Perfil a la base de datos
export async function agregarPerfil(nombre: string): Promise<Perfil> {
    const db = await abrirConexion();
    const query = `INSERT INTO Perfiles (nombre) VALUES ('${nombre}')`;
    await db.run(query);

    const perfil = await db.get<Perfil>(`SELECT * FROM Perfiles WHERE nombre=${nombre}`);
    if (perfil == undefined)
        throw new Error("Esto nunca deberia pasar!");

    return perfil;
}

// Borra un Perfil de la base de datos
export async function borrarPerfil(id: number): Promise<void> {
    const db = await abrirConexion();

    const query = `DELETE FROM Ciudad WHERE id='${id}'`;
    await db.run(query);
}


// --------------
// Esta función tiene que crear un array de urls que es el que va a 
// usar la función descargarFotosPerfil para descargar las fotos
// La función recibe el nombre de perfil que es un string y va a devolver un array de strings (urls)
export async function extraerFotosPerfil(nombrePerfil: string): Promise<string[]> {
    // Aquí implementarían la lógica para extraer las fotos del perfil dado
    // Va a retornar un arreglo de URLs de las imágenes
    const db = await abrirConexion();

   
    return [];
}

// Esta función va a recibir el mismo array que devuelva la función extraerFotosPerfil 
// Y va a devolver otro array de strings
export function descargarFotosPerfil(urls: string[]): string[] {
    // Aquí implementarían la lógica para descargar las fotos dadas por las URLs
    return[];
}

// Esta función recibe un perfil, que es un string
export function avisoPosteo(perfil: string) {
    // Aquí implementarían la lógica para enviar un aviso cuando 
    // se realice un nuevo posteo en el perfil dado
}










// Borra una ciudad de la base de datos
// export async function borrarCiudad(nombre: string): Promise<void> {
//     const db = await abrirConexion();

//     const query = `DELETE FROM Ciudad WHERE nombre='${nombre}'`;
//     await db.run(query);
// }

// async function actualizarTemperatura(idCiudad: number, temperatura: number) {
//     const db = await abrirConexion();

//     const query = `UPDATE Ciudad SET temperatura=${temperatura} WHERE id=${idCiudad}`;
//     await db.run(query);
// }

// // Arma un Listado que contiene todas las ciudades en la base de datos
// export async function consultarListado(): Promise<Listado> {
//     const db = await abrirConexion();

//     const ciudades: Ciudad[] = await db.all<Ciudad[]>('SELECT * FROM Ciudad');
//     return { ciudades: ciudades };
// }

// // Proceso que se ejecuta cada una hora y chequea si hay que mandar una alerta
// export async function verificarAlertas(): Promise<Alerta[]> {
//     const db = await abrirConexion();

//     const ciudades: Ciudad[] = await db.all<Ciudad[]>('SELECT * FROM Ciudad');

//     // Itero todas las ciudades y si me devolvio alguna alerta la agrego a la lista de retorno
//     var alertas: Alerta[] = [];

//     for (let i = 0; i < ciudades.length; i++) {
//         const ciudad = ciudades[i];
//         var alerta = await verificarAlertasParaCiudad(ciudad);
//         if (alerta != null)
//             alertas.push(alerta);
//     }

//     return alertas;
// }

// async function verificarAlertasParaCiudad(ciudad: Ciudad): Promise<Alerta | null> {
//     // Busco la latitud y longitud de esta ciudad. Estaria bueno guardar esta info en la tabla de Ciudades porque no cambia en el tiempo.
//     const response1 = await fetch(
//         `https://geocoding-api.open-meteo.com/v1/search?name=${ciudad.nombre}&count=1&language=en&format=json`
//     )
//     const response1Json = await response1.json() as any
//     // console.log(response1Json)
//     const { latitude, longitude } = response1Json.results[0]

//     // console.log(latitude)
//     // console.log(longitude)

//     // Busco la ultima temperatura en base a la lat y long
//     const response2 = await fetch(
//         `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m&forecast_days=1`
//     )
//     const { current } = await response2.json() as any;
//     var temperatura = current.temperature_2m;

//     // Actualizo la termperatura actual para la ciudad
//     console.log(`Temperatura para ${ciudad.nombre}: ${temperatura}`);
//     actualizarTemperatura(ciudad.id, temperatura);


//     // Ajuste los valores para que me tire mas alertas
//     if (temperatura >= 30 || temperatura <= 18) {
//         return {
//             cuando: new Date(),
//             nombreCiudad: ciudad.nombre,
//             temperaturaActual: temperatura
//         }
//     } else {
//         return null
//     }
// }
