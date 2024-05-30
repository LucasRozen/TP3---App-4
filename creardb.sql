/*
 CREATE TABLE Perfiles(
	id INTEGER PRIMARY KEY,
    nombre TEXT NOT NULL UNIQUE
);

CREATE TABLE Notificaciones (
	id INTEGER PRIMARY KEY,
    mensaje TEXT NOT NULL
);

INSERT INTO Perfiles (nombre) VALUES ("leomessi");
INSERT INTO Perfiles (nombre) VALUES ("multimedia.umai"); */

-- DROP table Perfiles;

-- delete from Perfiles where nombre="Pedro";

-- CREATE TABLE Imagenes(
-- 	id INTEGER PRIMARY KEY,
--     Perfil INTEGER NOT NULL
-- );
-- drop table Imagenes;

select * from Perfiles where id = 4;

alter table Perfiles add urlUltimaPublicacion varchar(255);

select * from Notificaciones;

drop table Notificaciones;