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
      const info = await transporter.sendMail({
        // El from siempre va a quedar así
        from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>', // sender address
        to: "ciclonagus15@outlook.com", // lista de destinatarios
        subject: "¡Hola! ✔", // asunto
        text: "¿Hola mundo?", // cuerpo de texto plano
        html: "<b>¿Hola mundo?</b>", // cuerpo HTML
      });
  
      
      console.log("Mensaje enviado: %s", info.messageId);
      // Mensaje enviado: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
    } catch (error) {
      console.error("Error al enviar el mensaje:", error);
    }
  }
  
  enviarCorreo();

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