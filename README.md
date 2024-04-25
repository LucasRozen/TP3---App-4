# InstagramScraper

## ¿Qué es un scrapper?
Es un programa de software diseñado para extraer automáticamente información de sitios web de manera sistemática. Funciona mediante la solicitud y recuperación de datos de páginas web, ya sea siguiendo enlaces o buscando específicamente ciertos elementos en el código HTML de una página. Este tipo de herramientas son utilizadas para diversas finalidades, como recopilación de datos para análisis, monitoreo de precios, generación de bases de datos, entre otros. Sin embargo, es importante tener en cuenta que el scraping de sitios web puede estar sujeto a restricciones legales y políticas de los sitios web objetivo.
En resumen, extrae el contenido HTML para filtrar la información que necesito y almacenarla. 

## Investigación:
### Extracción y descarga de datos:
Buscamos diferentes librerías como Playwright, request, urllib, Beautifulsoup, Scrapy, entre otras. 
Por otro lado, investigamos también la API de Instagram, la Meta for Developers. 
En la mayoría de los casos, tanto las librerías como la API, solamente extraía los datos, y era necesario utilizar otra para descargarlos. Esto es porque las políticas de privacidad de Instagram no permiten descargar los datos. 

Por eso, llegamos a la conclusión de que vamos a utilizar Instagram Private API. Esta librería le pide a la API de Instagram los datos y, a su vez, permite descargarlos. Por eso la elegimos, para tener que utilizar solamente una herramienta. 

### Para la notificación: 
NodeNotifier:
Lo que hace esta librería es, cuando se descarga la foto de Instagram, le manda una notificación al usuario. 
Al descargar las fotos, se harán a su propia computadora, es por eso que elegimos esta librería: le enviará una notificación a la computadora del usuario.
El único lado negativo que vemos en esta opción es que si el usuario tiene desactivadas las notificaciones de su computadora, no recibirá la alerta. 

## Modelado:
Las entidades que encontramos fueron: usuario (el acosador), perfil (el acosado) y notificación.

