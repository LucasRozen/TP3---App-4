# **App 4 - Scrapper de imágenes de Instagram**
# InstagramScraper

## ¿Qué es un scrapper?
Es un programa de software diseñado para extraer automáticamente información de sitios web de manera sistemática. Funciona mediante la solicitud y recuperación de datos de páginas web, ya sea siguiendo enlaces o buscando específicamente ciertos elementos en el código HTML de una página. Este tipo de herramientas son utilizadas para diversas finalidades, como recopilación de datos para análisis, monitoreo de precios, generación de bases de datos, entre otros. En resumen, un scrap extrae el contenido HTML para filtrar la información que necesito y almacenarla. 
Sin embargo, es importante tener en cuenta que el scraping de sitios web puede estar sujeto a restricciones legales y políticas de los sitios web objetivo.

## Investigación:
### Extracción y descarga de datos:
Buscamos diferentes librerías como Playwright, request, urllib, Beautifulsoup, Scrapy, entre otras. 
Por otro lado, investigamos también la API de Instagram, la Meta for Developers. 
En la mayoría de los casos, tanto las librerías como la API, solamente extraía los datos, y era necesario utilizar otra para descargarlos. Esto es porque las políticas de privacidad de Instagram no permiten descargar los datos. 

Por eso, llegamos a la conclusión de que vamos a utilizar **Instagram Private API**. Esta librería le pide a la API oficial de Instagram los datos y, a su vez, permite descargarlos. Por eso la elegimos, para tener que utilizar solamente una herramienta. Esta librería permite scrapear o automatizar, cosa que no deja hacer normalmente. Lo que si hay que tener en cuenta es que Instagram suele banear IPs por hacer este tipo de cosas asi que lo mejor es no hacerlo seguido (se recomienda poner un delay entre cada descarga asi no se bajan todas juntas y evitamos el baneo). 

### Para la notificación: 
NodeNotifier:
Lo que hace esta librería es, cuando se descarga la foto de Instagram, le manda una notificación al usuario. 
Al descargar las fotos, se harán a su propia computadora, es por eso que elegimos esta librería: le enviará una notificación a la computadora del usuario.
El único lado negativo que vemos en esta opción es que si el usuario tiene desactivadas las notificaciones de su computadora, no recibirá la alerta. 

## Modelado:
Las entidades que encontramos fueron: usuario (el acosador), perfil (el acosado) y notificación.
La interfaz de usuario se compone de un nombre y contraseña ya que la librería te pide un usuario de instagram para usar la API. **IMPORTANTE**: no usen sus usuarios reales de instagram, prueben con uno vacío o que no utilicen por las dudas. 
La interfaz de perfil se compone de un usuario (que es al que vamos a acosar).
La interfaz de notificación va a tener un mensaje, es un string. 
La función extraerFotosPerfil recibe un parámetro que es el nombre del acosado y va a devolver un array de string. En ese array van a estar las urls de cada foto a descargar. Adentro de esta función van a tener que declarar ese array, que es el mismo que va a recibir la siguiente función (descargarFotosPerfil).
La función descargarFotosPerfil recibe el array creado en la función anterior (extraerFotosPerfil) y devuelve un array de strings.
La función avisoPosteo recibe el perfil de nuestro acosado. Esta función lo que va a hacer es mandarle una notificación al acosador avisandole que el acosado hizo un nuevo posteo. 

## API:
Para utilizar la api, lo primero que tenés que hacer es instalarla. Para eso, ejecutá en la consola la siguiente línea:
`npm install instagram-private-api`

