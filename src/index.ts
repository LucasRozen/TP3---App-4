import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { agregarPerfil, borrarPerfil, consultarListado, verificarAlertas } from "./Modelo";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.get("/", async (req: Request, res: Response) => {
    const listado = await consultarListado();
    res.send(listado);
});

// index.ts
app.get("/agregar/:nombre", async (req: Request, res: Response) => {
    const nombre = req.params.nombre;
    const usuario = await agregarPerfil(nombre);
    res.send(usuario);
});

app.delete("/borrar/:id", async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    await borrarPerfil(id);
    res.send("OK");
});


app.get("/verificarAlertas", async (req: Request, res: Response) => {
    const alertas = await verificarAlertas();
    res.send(alertas);
});

app.listen(port, () => {
    console.log(`[server]: Servidor iniciado en http://localhost:${port}`);
});