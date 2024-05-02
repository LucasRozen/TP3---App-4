import { IgApiClient } from 'instagram-private-api';
import * as nodemailer from "nodemailer";

// Creamos una const ig donde va a estar la API de Instagram
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

// API notificación
async function enviarCorreo() {
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
        to: "noelipacio@hotmail.com", // lista de destinatarios, va a ir a nuestro acosador (NOE NO ES LA ACOSADORA QUE QUIERE STALKEAR A SU EX, ES SOLO UNA PRUEBA)
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
  
  enviarCorreo();

// La primera entidad: el acosador
export interface usuario {
    nombreUsuario: string;
    contraseniaUsuario: string
}

// La segunda entidad: el acosado
export interface perfil {
    nombrePerfil: string
}

// La tercera entidad: la notificación
export interface notificacion {
    mensaje: string
}

// Esta función tiene que crear un array de urls que es el que va a 
// usar la función descargarFotosPerfil para descargar las fotos
// La función recibe el nombre de perfil que es un string y va a devolver un array de strings (urls)
export function extraerFotosPerfil(nombrePerfil: string): string[] {
    // Aquí implementarían la lógica para extraer las fotos del perfil dado
    // Va a retornar un arreglo de URLs de las imágenes
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

