const express = require("express");
const StrategyService = require("./strategy-service");
const xss = require("xss");
const strategyRouter = express.Router();
const jsonParser = express.json();
const path = require("path");

const serializeRouter = (strategy) => ({
  id: strategy.id,
  title: strategy.title,
  stocks: strategy.stocks,
  date_published: strategy.date_published,
  });

strategyRouter
  .route("/")
  .get((req, res, next) => {
    const knexInstance = req.app.get("db");
    StrategyService.getAllNotes(knexInstance)
      .then((notes) => {
        res.json(notes.map(serializeRouter));
      })
      .catch(next);
  })
  .post(jsonParser, (req, res, next) => {
    const { notes_name, notes_content, folders_id } = req.body;
    const newNotes = { notes_name, notes_content, folders_id };

    for (const [key, value] of Object.entries(newNotes))
      if (value == null)
        return res.status(400).json({
          error: { message: `Missing '${key}' in request body` },
        });

    StrategyService.insertNotes(req.app.get("db"), newNotes)
      .then((notes) => {
        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `/${notes.notes_id}`))
          .json(serializeRouter(notes));
      })
      .catch(next);
  });

strategyRouter
  .route("/:notes_id")
  .all((req, res, next) => {
    StrategyService.getById(req.app.get("db"), req.params.notes_id)
      .then((notes) => {
        if (!notes) {
          return res.status(404).json({
            error: { message: `notes doesn't exist` },
          });
        }
        res.notes = notes;
        next();
      })
      .catch(next);
  })
  .get((req, res, next) => {
    res.json(serializeRouter(res.notes));
  })
  .delete((req, res, next) => {
    StrategyService.deleteNotes(req.app.get("db"), req.params.notes_id)
      .then((numRowsAffected) => {
        res.status(204).end();
      })
      .catch(next);
  })
  .patch(jsonParser, (req, res, next) => {
    const { notes_name, notes_content, folders_id } = req.body;
    const notesToUpdate = { notes_name, notes_content, folders_id };

    const numberOfValues = Object.values(notesToUpdate).filter(Boolean).length;
    if (numberOfValues === 0)
      return res.status(400).json({
        error: {
          message: `Request body must contain either name or content'`,
        },
      });

    StrategyService.updateNotes(
      req.app.get("db"),
      req.params.notes_id,
      notesToUpdate
    )
      .then((numRowsAffected) => {
        res.status(204).end();
      })
      .catch(next);
  });

module.exports = strategyRouter;
