// Import access to data
import programRepository from "./programRepository";

// Declare the actions

import type { RequestHandler } from "express";

const browse: RequestHandler = async (req, res) => {
  const programsFromDB = await programRepository.readAll();

  res.json(programsFromDB);
};

const read: RequestHandler = async (req, res) => {
  const parsedId = Number.parseInt(req.params.id);
  const program = await programRepository.readById(parsedId);

  if (program != null) {
    res.json(program);
  } else {
    res.sendStatus(404);
  }
};

const add: RequestHandler = async (req, res) => {
  const { title, synopsis, poster, country, year, category_id } = req.body;

  const insertedId = await programRepository.create({
    title,
    synopsis,
    poster,
    country,
    year,
    category_id,
  });

  res.status(201).json({ id: insertedId });
};

const edit: RequestHandler = async (req, res) => {
  const id = Number.parseInt(req.params.id);
  const { title, synopsis, poster, country, year, category_id } = req.body;

  const updated = await programRepository.update(id, {
    title,
    synopsis,
    poster,
    country,
    year,
    category_id,
  });

  if (updated) {
    res.sendStatus(204);
  } else {
    res.sendStatus(404);
  }
};

const destroy: RequestHandler = async (req, res) => {
  const id = Number.parseInt(req.params.id);

  const deleted = await programRepository.delete(id);

  if (deleted) {
    res.sendStatus(204);
  } else {
    res.sendStatus(404);
  }
};

// Export them to import them somewhere else

export default { browse, read, add, edit, destroy };
