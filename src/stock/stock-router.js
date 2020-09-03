const express = require("express");
const StockService = require("./stock-service");
const xss = require("xss");
const stockRouter = express.Router();
const jsonParser = express.json();
const path = require("path");
const { requireAuth } = require('../middleware/jwt-auth')

const serializeStock = (stock) => ({
  id: stock.id,
  ticker: stock.ticker,
  industry: stock.industry,
  shares: stock.shares,
  price: stock.price,
  eps1: stock.eps1,
  ESP5: stock.eps5,
  yield: stock.yield,
  date_published: stock.date_published,
});

stockRouter
  .route("/")
  .all(requireAuth)
  .get((req, res, next) => {
    const knexInstance = req.app.get("db");
    StockService.getAllStocks(knexInstance)
      .then((stock) => {
        res.json(stock.map(serializeStock));
      })
      .catch(next);
  })
  .post(jsonParser, (req, res, next) => {
    const { ticker, industry, shares, price, eps1, eps5, yield } = req.body;
    const newStock = { ticker, industry, shares, price, eps1, eps5, yield };

    for (const [key, value] of Object.entries(newStock))
      if (value == null)
        return res.status(400).json({
          error: { message: `Missing '${key}' in request body` },
        });

    StockService.insertStock(req.app.get("db"), newStock)
      .then((stock) => {
        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `/${stock.id}`))
          .json(serializeStock(stock));
      })
      .catch(next);
  });

stockRouter
.all(requireAuth)
  .route("/:id")
  .all((req, res, next) => {
    StockService.getById(req.app.get("db"), req.params.id)
      .then((stock) => {
        if (!stock) {
          return res.status(404).json({
            error: { message: `stock doesn't exist` },
          });
        }
        res.stock = stock;
        next();
      })
      .catch(next);
  })
  .get((req, res, next) => {
    res.json(serializeStock(res.stock));
  })
  .delete((req, res, next) => {
    StockService.deleteStock(req.app.get("db"), req.params.id)
      .then((numRowsAffected) => {
        res.status(204).end();
      })
      .catch(next);
  })
  .patch(jsonParser, (req, res, next) => {
    const { ticker, industry, shares, price, eps1, eps5, yield } = req.body;
    const stockToUpdate = {
      ticker,
      industry,
      shares,
      price,
      eps1,
      eps5,
      yield,
    };

    const numberOfValues = Object.values(stockToUpdate).filter(Boolean).length;
    if (numberOfValues === 0)
      return res.status(400).json({
        error: {
          message: `Request body must contain either name or content'`, //TODO  <-----------------
        },
      });

    StockService.updateStock(req.app.get("db"), req.params.id, stockToUpdate)
      .then((numRowsAffected) => {
        res.status(204).end();
      })
      .catch(next);
  });

module.exports = stockRouter;
