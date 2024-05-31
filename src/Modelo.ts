import sqlite3 from 'sqlite3'
import { open } from 'sqlite'
import { IgApiClient } from 'instagram-private-api';
import * as nodemailer from "nodemailer";
import fs from 'fs';
import request from 'request';

export const ig = new IgApiClient();

//Interfaces
export interface Usuario {
    nombre: string,
    clave: string,
    email: string
}

export interface Perfil {
    id: number,
    nombre: string,
    urlUltimaPublicacion: string
}
export interface Notificacion {
    mensaje: string
}

export interface Imagen {
    id: number,
    Perfil: number
}

//Base de datos
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
export async function agregarPerfil(nombre: string, url: string): Promise<Perfil> {
    const db = await abrirConexion();
    const query = `INSERT INTO Perfiles (nombre, urlUltimaPublicacion) VALUES ('${nombre}', '${url}')`;
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
    const perfil = await db.get<Perfil>(`SELECT * FROM Perfiles WHERE id="${idPerfil}"`);
    if(perfil === undefined) return [];
    if(await subioFotoNueva(idPerfil, perfil.nombre)){
        let contOrdenado = imagenes.length;
        const urls = await extraerFotosPerfil(perfil.nombre);
        /* console.log("urls: " + urls);
        console.log("imagenes: " + imagenes);
        console.log("imagenes.length: " + imagenes.length);
        console.log("urls.length: " + urls.length); */
        console.log("urls.length: " + urls.length);
        for (let i = urls.length - imagenes.length - 1; i >= 0; i--) {
            const nombreArchivo = `${contOrdenado}.jpg`;
            console.log("urlsqueseguardan: " + (urls.length-contOrdenado));
            await descargarImagen(urls[i], nombreArchivo);
            const imagen = await agregarImagen(contOrdenado, idPerfil);
            console.log(`Imagen agregada: ${imagen.id} - ${imagen.Perfil}`);
            contOrdenado++;
            imagenes.push(imagen);
        }
        const query = `UPDATE Perfiles SET urlUltimaPublicacion='${urls[0]}' WHERE id='${idPerfil}'`;
        await db.run(query);
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
          let postInfo;
          // Extraemos las URLs de las fotos
          const urlsFotos: string[] = [];
          for (const post of items) {
            if (post.carousel_media) {
              for (const carouselItem of post.carousel_media) {
                /*postInfo = ig.media.info(post.pk);
                const date = postInfo.date;*/
                urlsFotos.push(carouselItem.image_versions2.candidates[0].url);
              }
            } else {
              //date = ig.media.info({post.pk}).date;
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
  console.log(url);
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

async function obtenerUltimaPublicacion(nombrePerfil: string): Promise<string> {
    // Aquí implementarían la lógica para extraer la última publicación del perfil dado
    // Va a retornar un string con la URL de la última publicación
    try {
        // Buscamos el usuario por nombre de perfil
        const usuario = await ig.user.searchExact(nombrePerfil);
        // Si el usuario existe, obtenemos las fotos de su perfil
        if (usuario) {
            // Obtenemos las fotos del perfil
            const media = ig.feed.user(usuario.pk);
            const items = await media.items();
            // Extraemos la URL de la última publicación
            const urlUltimaPublicacion = items[0].image_versions2.candidates[0].url;
            console.log('URL de la última publicación:', urlUltimaPublicacion);
            // Devolvemos la URL de la última publicación
            return urlUltimaPublicacion;
        } else {
            // Si el usuario no existe, devolvemos un string vacío
            return '';
        }
    } catch (error) {
        console.error('Error al extraer la última publicación:', error);
        return '';
    }
}

const transporter = nodemailer.createTransport({
  service: 'hotmail', // Por ejemplo, 'gmail', 'hotmail', etc.
  auth: {
    user: 'appinstagramprogra@hotmail.com',
    pass: 'programacion4'
  },
});

async function subioFotoNueva(idPerfil: number, nombrePerfil: string) {
    const db = await abrirConexion();
    const ultimaUrlGuardada = await db.all<string>(`SELECT urlUltimaPublicacion FROM Perfiles where id = ${idPerfil}`);
    const urlUltimaImagen = await obtenerUltimaPublicacion(nombrePerfil);
    console.log(urlUltimaImagen);
    
    return ultimaUrlGuardada !== urlUltimaImagen;
}

// Esta función tiene que enviar un correo cuando se realice un nuevo posteo en cualquier perfil
export async function avisoPosteo() {
    // Aquí implementarían la lógica para enviar un aviso cuando 
    // se realice un nuevo posteo en el perfil dado
    // Intenta enviar el correo
    const perfiles = await listarPerfiles();
    perfiles.forEach(async perfil => {
      if(await subioFotoNueva(perfil.id, perfil.nombre) ){
        try {
          // Creamos una const transporter. El transporter es un objeto que se encarga de mandar el correo   
          // Enviar correo con los datos que correspondan
          const info = await transporter.sendMail({
            // El from siempre va a quedar así
            from: '"Programación Cuatro" <appinstagramprogra@hotmail.com>', // sender address
            to: "lucaslrozenberg@gmail.com", // lista de destinatarios, va a ir a nuestro acosador (NOE NO ES LA ACOSADORA QUE QUIERE STALKEAR A SU EX, ES SOLO UNA PRUEBA)
            subject: `${perfil} subió foto nueva`, // asunto
            text: `${perfil} subió foto nueva`, // cuerpo de texto 
          });  
          // Si me muestra esto en consola, es que funcionó y se envió el mensaje
          console.log("Mensaje enviado: %s", info.messageId);
          // Si no puede enviar el correo, muestra error
        } catch (error) {
          console.error("Error al enviar el mensaje:", error);
        }
      }
  });
}
