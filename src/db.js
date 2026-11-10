// Acceso a datos. SQLite embebido (node:sqlite) para no depender de servicios externos ni de paquetes de npm.
import { DatabaseSync } from 'node:sqlite';
import { mkdirSync } from 'node:fs';
import path from 'node:path';

export const DATA_DIR = process.env.DATA_DIR || path.join(import.meta.dirname, 'data');
export const FILES_DIR = path.join(DATA_DIR, 'archivos');
mkdirSync(FILES_DIR, { recursive: true });

export const db = new DatabaseSync(path.join(DATA_DIR, 'unlamigos.db'));
db.exec('PRAGMA foreign_keys = ON; PRAGMA journal_mode = WAL;');

db.exec(`
CREATE TABLE IF NOT EXISTS materias (
  id TEXT PRIMARY KEY,
  nombre TEXT NOT NULL
);
-- Una comisión de un cuatrimestre es una "cursada". Los canales de consultas se crean por comisión.
CREATE TABLE IF NOT EXISTS comisiones (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  materia_id TEXT NOT NULL REFERENCES materias(id),
  codigo TEXT NOT NULL,
  cuatrimestre TEXT NOT NULL,
  docente TEXT,
  activa INTEGER NOT NULL DEFAULT 1,
  UNIQUE (materia_id, codigo, cuatrimestre)
);
CREATE TABLE IF NOT EXISTS usuarios (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT NOT NULL UNIQUE,
  nombre TEXT NOT NULL,
  token TEXT NOT NULL UNIQUE,
  creado TEXT NOT NULL DEFAULT (datetime('now'))
);
-- Inscripciones simuladas: no se consulta ningún sistema de la UNLaM.
CREATE TABLE IF NOT EXISTS inscripciones (
  usuario_id INTEGER NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
  comision_id INTEGER NOT NULL REFERENCES comisiones(id),
  PRIMARY KEY (usuario_id, comision_id)
);
-- Cursadas que el equipo carga a mano antes de la prueba para cada correo participante.
CREATE TABLE IF NOT EXISTS inscripciones_precargadas (
  email TEXT NOT NULL,
  comision_id INTEGER NOT NULL REFERENCES comisiones(id),
  PRIMARY KEY (email, comision_id)
);
CREATE TABLE IF NOT EXISTS materiales (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  comision_id INTEGER NOT NULL REFERENCES comisiones(id),
  tipo TEXT NOT NULL,
  titulo TEXT NOT NULL,
  docente TEXT,
  tema TEXT,
  contexto TEXT NOT NULL,
  advertencia TEXT,
  archivo_nombre TEXT,
  archivo_ruta TEXT,
  archivo_mime TEXT,
  enlace TEXT,
  autor_id INTEGER REFERENCES usuarios(id),
  -- 'equipo' = carga inicial preparada por el equipo; 'participante' = aporte durante la prueba (criterio 3).
  origen TEXT NOT NULL DEFAULT 'participante',
  creado TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE TABLE IF NOT EXISTS consultas (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  comision_id INTEGER NOT NULL REFERENCES comisiones(id),
  autor_id INTEGER NOT NULL REFERENCES usuarios(id),
  texto TEXT NOT NULL,
  creado TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE TABLE IF NOT EXISTS respuestas (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  consulta_id INTEGER NOT NULL REFERENCES consultas(id) ON DELETE CASCADE,
  autor_id INTEGER NOT NULL REFERENCES usuarios(id),
  texto TEXT NOT NULL,
  -- La marca la pone sólo quien hizo la consulta: es la señal de "respuesta útil" del criterio 2.
  util INTEGER NOT NULL DEFAULT 0,
  creado TEXT NOT NULL DEFAULT (datetime('now'))
);
-- Registro de uso para las métricas del TP5. No reemplaza la observación de la sesión.
CREATE TABLE IF NOT EXISTS eventos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  usuario_id INTEGER REFERENCES usuarios(id),
  tipo TEXT NOT NULL,
  datos TEXT,
  creado TEXT NOT NULL DEFAULT (strftime('%Y-%m-%d %H:%M:%f', 'now'))
);
`);

export const TIPOS = ['Parcial', 'Final', 'Apunte', 'Bibliografía', 'Otro'];
