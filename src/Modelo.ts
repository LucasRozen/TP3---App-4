import sqlite3 from 'sqlite3'
import { open } from 'sqlite'
import { IgApiClient } from 'instagram-private-api';
import * as nodemailer from "nodemailer";
import fs from 'fs';
import request from 'request';

export const ig = new IgApiClient();

export interface Usuario {
    nombre: string,
    clave: string,
    email: string
}

export interface Perfil {
    nombre: string
}
export interface Notificacion {
    mensaje: string
}

export interface Imagen {
    id: number,
    perfil: number
}

let contadorDeImagenes = 1;

async function abrirConexion() {
    return open({
        filename: 'db.sqlite',
        driver: sqlite3.Database
    })
}

ig.state.generateDevice("desdeelbarro10");
(async () => {
  
  const loggedInUser = await ig.account.login("desdeelbarro10", "DesdeElBarroPodcast");
  
console.log('¡Iniciaste sesión como:', loggedInUser.username);
 
})();

//Perfiles
export async function agregarPerfil(nombre: string): Promise<Perfil> {
    const db = await abrirConexion();
    const query = `INSERT INTO Perfiles (nombre) VALUES ('${nombre}')`;
    await db.run(query);

    const perfil = await db.get<Perfil>(`SELECT * FROM Perfiles WHERE nombre="${nombre}"`);
    if (perfil == undefined)
        throw new Error("Esto nunca deberia pasar!");

    return perfil;
}

export async function borrarPerfil(id: number): Promise<void> {
    const db = await abrirConexion();

    const query = `DELETE FROM Perfiles WHERE id='${id}'`;
    await db.run(query);
}

export async function listarPerfiles(): Promise<Perfil[]> {
    const db = await abrirConexion();

    const perfiles: Perfil[] = await db.all<Perfil[]>('SELECT * FROM Perfiles');
    return perfiles;
}

//Imagenes
export async function agregarImagen(id: number, perfil: number): Promise<Imagen> {
    const db = await abrirConexion();
    const query = `INSERT INTO Imagenes (id, perfil) VALUES ('${id}', '${perfil}')`;
    await db.run(query);

    const imagen = await db.get<Imagen>(`SELECT * FROM Imagenes WHERE id="${id}"`);
    if (imagen == undefined)
        throw new Error("Esto nunca deberia pasar!");

    return imagen;
}

export async function listarImagenesPorPerfil(idPerfil: number): Promise<Imagen[]> {
    const db = await abrirConexion();
    let imagenes: Imagen[] = await db.all<Imagen[]>(`SELECT * FROM Imagenes where perfil = ${idPerfil}`);
    if(imagenes.length === 0){
        const perfil = await db.get<Perfil>(`SELECT * FROM Perfiles WHERE id="${idPerfil}"`);
        if(perfil === undefined){
            return [];
        }
        const urls = await extraerFotosPerfil(perfil.nombre);
        for (let i = contadorDeImagenes; i < urls.length + contadorDeImagenes; i++) {
            const nombreArchivo = `${i}.jpg`;
            await descargarImagen(urls[i], nombreArchivo);
            const imagen = await agregarImagen(i, idPerfil);
            console.log(`Imagen agregada: ${imagen.id} - ${imagen.perfil}`);
            imagenes.push(imagen);
        }
    }
    return imagenes;
}

// --------------
// Esta función tiene que crear un array de urls que es el que va a 
// usar la función descargarFotosPerfil para descargar las fotos
// La función recibe el nombre de perfil que es un string y va a devolver un array de strings (urls)
export async function extraerFotosPerfil(nombrePerfil: string): Promise<string[]> {
    // Aquí implementarían la lógica para extraer las fotos del perfil dado
    // Va a retornar un arreglo de URLs de las imágenes
    try {
        // Buscamos el usuario por nombre de perfil
        const usuario = await ig.user.searchExact(nombrePerfil);    
        // Si el usuario existe, obtenemos las fotos de su perfil
        if (usuario) {
          // Obtenemos las fotos del perfil
          const media = ig.feed.user(usuario.pk);
          const items = await media.items();
          // Extraemos las URLs de las fotos
          const urlsFotos: string[] = [];
          for (const post of items) {
            if (post.carousel_media) {
              for (const carouselItem of post.carousel_media) {
                urlsFotos.push(carouselItem.image_versions2.candidates[0].url);
              }
            } else {
              urlsFotos.push(post.image_versions2.candidates[0].url);
            }
          }
          //console.log('Fotos de perfil:', urlsFotos);    
          // Devolvemos las URLs de las fotos
          return urlsFotos;
        } else {
          // Si el usuario no existe, devolvemos un array vacío
          return [];
        }
      } catch (error) {
        console.error('Error al extraer fotos de perfil:', error);
        return [];
      }
}

const descargarImagen = async (url: string, nombreArchivo: string) => {
    const response = await fetch(url);
    const buffer = await response.arrayBuffer();
    const arrayBufferView = new Uint8Array(buffer);

    fs.writeFile(`imagenes/${nombreArchivo}`, arrayBufferView, (err) => {
        if (err) {
            console.error(`Error al guardar la imagen: ${err.message}`);
            return;
        }
        console.log(`Imagen ${nombreArchivo} descargada con éxito`);
    });
};


//Notificaciones
// Esta función recibe un perfil, que es un string
export async function avisoPosteo(perfil: string) {
    // Aquí implementarían la lógica para enviar un aviso cuando 
    // se realice un nuevo posteo en el perfil dado
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
    const info = await transporter.sendMail({
      // El from siempre va a quedar así
      from: '"Programación Cuatro" <appinstagramprogra@hotmail.com>', // sender address
      to: "lucaslrozenberg@gmail.com", // lista de destinatarios, va a ir a nuestro acosador (NOE NO ES LA ACOSADORA QUE QUIERE STALKEAR A SU EX, ES SOLO UNA PRUEBA)
      subject: "Acoso", // asunto
      text: "Hola acosador, ¿cómo estás?", // cuerpo de texto 
    });

    // Si me muestra esto en consola, es que funcionó y se envió el mensaje
    console.log("Mensaje enviado: %s", info.messageId);
    // Si no puede enviar el correo, muestra error
  } catch (error) {
    console.error("Error al enviar el mensaje:", error);
  }
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
