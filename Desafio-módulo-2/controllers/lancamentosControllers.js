/*import { promises } from "fs";
const { readFile, writeFile } = promises;

async function inserirLancamento(lancamento) {
  try {
    const dados = await readFile(global.fileName);
    const notasJson = JSON.parse(dados);
    lancamento = { id: notasJson.nextId++, student }
  } catch (err) {
    console.log("erro na requisição.");
  };
} */