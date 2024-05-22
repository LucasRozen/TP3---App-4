import express, { Express, Request, Response, NextFunction} from "express";
import dotenv from "dotenv";
import { agregarImagen, agregarPerfil, borrarPerfil, listarPerfiles} from "./Modelo";
import { log } from "console";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

function errorHandler(
    error: Error, request: Request, response: Response
) {
    console.log(`Hubo un error! ${error.message}`);
    response.header("Content-Type", 'application/json');
    response.status(500).json({ mensaje: error.message });
}

app.use('imagen', express.static('imagenes'));
app.use(express.json());

// Perfiles
app.post("/perfil/agregar", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const nombre = req.body.nombre;
        console.log(`Nombre: ${nombre}`);
        const perfil = await agregarPerfil(nombre);
        res.send(perfil);
    } catch (error) {
        next(error);
    }
});

app.delete("/perfil/borrar", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.body.id;
        await borrarPerfil(parseInt(id));
        res.send("OK");
    } catch (error) {
        next(error);
    }
});

app.get("/perfil", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const listado = await listarPerfiles();
        res.send(listado);
    } catch (error) {
        next(error);
    }
});

/* app.get("/perfil/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const listado = await consultarPerfil();
        res.send(listado);
    } catch (error) {
        next(error);
    }
}); */

// Imagenes
app.post("/imagen/agregar", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.body.id;
        const perfil = req.body.perfil;
        const imagen = await agregarImagen(parseInt(id), parseInt(perfil));
        res.send(imagen);
    } catch (error) {
        next(error);
    }
});

/* app.get("/imagen/:idImagen", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const imagen = await consultarImagen(req.params.idImagen);
        res.send(imagen);
    } catch (error) {
        next(error);
    }
}); */

app.use(errorHandler);

app.listen(port, () => {
    console.log(`[server]: Servidor iniciado en http://localhost:${port}`);
});