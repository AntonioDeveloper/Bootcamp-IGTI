import express from "express";
import { promises } from "fs";
const { readFile, writeFile } = promises;

import lancamentosRouter from "./routes/routes.js";

global.fileName = "grades.json";

const app = express();
app.use(express.json());
app.use("/lancamentos", lancamentosRouter);

/*
async function ler() {
  const dados = await readFile(global.fileName);
  const notasJson = JSON.parse(dados);
  console.log(notasJson.nextId);
}
ler();
*/

app.listen(3000, async () => {
  try {
    const dados = await readFile(global.fileName);
    const notasJson = JSON.parse(dados);
    //console.log(notasJson.grades[2].id);
  } catch (err) {
    console.log("erro na requisição.");
  }
}); 
