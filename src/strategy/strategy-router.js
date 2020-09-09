const express = require("express");
const StrategyService = require("./strategy-service");
const strategyRouter = express.Router();
const jsonParser = express.json();
const path = require("path");
const { requireAuth } = require("../middleware/jwt-auth");
const xss = require("xss");

const serializeStrategy = (strategy) => ({
  id: strategy.id,
  title: strategy.title,
  date_published: strategy.date_published,
});

strategyRouter
  .route("/")
  .all(requireAuth)
  .get((req, res, next) => {
    const knexInstance = req.app.get("db");
    StrategyService.getAllStrategies(knexInstance)
      .then((strategy) => {
        res.json(strategy.map(serializeStrategy));
      })
      .catch(next);
  })
  .post(jsonParser, (req, res, next) => {
    const { title, author_id } = req.body;
    const newStrategy = { title, author_id };

    for (const [key, value] of Object.entries(newStrategy))
      if (value == null)
        return res.status(400).json({
          error: { message: `Missing '${key}' in request body` },
        });

    newComment.user_id = req.user.id;
    console.log("req.user.id", req.user.id);

    StrategyService.insertStrategy(req.app.get("db"), newStrategy)
      .then((strategy) => {
        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `/${strategy.id}`))
          .json(serializeStrategy(strategy));
      })
      .catch(next);
  });

strategyRouter
  .route("/:id")
  .all(requireAuth)
  .all((req, res, next) => {
    StrategyService.getById(req.app.get("db"), req.params.id)
      .then((strategy) => {
        if (!strategy) {
          return res.status(404).json({
            error: { message: `strategy doesn't exist` },
          });
        }
        res.strategy = strategy;
        next();
      })
      .catch(next);
  })
  .get((req, res, next) => {
    StrategyService.getUserStrategies(knexInstance, req.params.id)
    .then((strategy) => {
      res.json(strategy.map(serializeStrategy));
    })
  
  })
  .delete((req, res, next) => {
    StrategyService.deleteStrategy(req.app.get("db"), req.params.id)
      .then((numRowsAffected) => {
        res.status(204).end();
      })
      .catch(next);
  })
  .patch(jsonParser, (req, res, next) => {
    const { title } = req.body;
    const strategyToUpdate = { title };

    const numberOfValues = Object.values(strategyToUpdate).filter(Boolean)
      .length;
    if (numberOfValues === 0)
      return res.status(400).json({
        error: {
          message: `Request body must contain either name or content'`,
        },
      });

    StrategyService.updateStrategy(
      req.app.get("db"),
      req.params.id,
      strategyToUpdate
    )
      .then((numRowsAffected) => {
        res.status(204).end();
      })
      .catch(next);
  });

module.exports = strategyRouter;
