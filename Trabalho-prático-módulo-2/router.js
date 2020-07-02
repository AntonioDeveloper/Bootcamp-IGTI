import express from "express";
import { promises } from "fs";
const { readFile, writeFile } = promises;
const rotas = express.Router();

rotas.get("/", (req, res) => {
  readFile("./ESTADOS_GERADOS_SP.json", "utf8", (err, data) => {
    if (!err) {
      console.log(data);
      res.send(data);
    } else {
      res.status(400).send({ error: err.message });
    }
  });
})

export { rotas };
