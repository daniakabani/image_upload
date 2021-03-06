const express = require("express");
const router = express.Router();
const controller = require("../controllers");

let routes = (app) => {
  router.post("/upload", controller.upload);
  router.post("/upload64", controller.uploadBase64);
  router.get("/files", controller.getListFiles);
  router.get("/files/:name", controller.download);

  app.use(router);
};

module.exports = routes;