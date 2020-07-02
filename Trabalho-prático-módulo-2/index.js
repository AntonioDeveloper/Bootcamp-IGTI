import { promises } from "fs";
//import express from "express";
const { readFile, writeFile } = promises;
const uf = [];
let caminhos = [];
let caminho = null;
let res = [];
let siglaUF = [];
let values = [];
const totalCidades = [];
let maioresCidades = [];
let menoresCidades = [];
let maioresNomes = [];
let nomesTamanho = [];

initial();


async function initial() {
  try {
    const estados = await readFile("./Estados.json");
    const cidades = await readFile("./Cidades.json");

    const dados1 = JSON.parse(estados);
    const dados2 = JSON.parse(cidades);

    //console.log(dados1);
    //console.log(dados2.Estado);

    //montar array de Estados
    dados1.forEach(id => {
      dados2.find(estado => {
        if (id.ID === estado.Estado) {
          uf.push({ UF: id.Sigla, Nome: id.Nome, Cidades: estado.Nome });
        }
      })
    });
    //console.log(uf);

    //montar JSON de estados separadamente
    let estadosDaUniao = [];
    dados1.forEach((estado) => {
      estadosDaUniao = dados2.filter(cidade => {
        if (estado.ID === cidade.Estado) {
          return cidade;
        }
      });
      //writeFile(estado.Sigla + '.json', JSON.stringify(estadosDaUniao));
    });

    dados1.forEach((estado) => {
      caminhos.push("./ESTADOS_GERADOS/" + estado.Sigla + '.json');
    });

    //contarCidades();
    await lerEstados();

    console.log("API iniciada");
  } catch (err) {
  }
};

// Contar quantidade de cidades em cada estado.

async function contarCidades(caminho) {
  let estadoAtual = await readFile(caminho);
  res = JSON.parse(estadoAtual);
  totalCidades.push(caminho.slice(18, 20) + " " + res.length);
  totalCidades.sort((a, b) => {
    return (b.slice(3)) - (a.slice(3)); // comparar os números dentro da string
    //https://www.w3schools.com/jsref/jsref_sort.asp
  })
  //console.log(totalCidades);
  maioresCidades = totalCidades.slice(0, 5);
  //console.log(maioresCidades);

  menoresCidades = totalCidades.slice(22, 27);
  //console.log(menoresCidades);

  //Descobrir as cidades com os maiores nomes
  await cidadesMaioresNomes();

}

async function lerEstados() {
  caminhos.forEach(estado => {
    caminho = estado;
    contarCidades(caminho);
  });
};

function cidadesMaioresNomes() {
  res.forEach(linha => {
    nomesTamanho = linha.Nome.length;
  }).sort((a, b) => {
    return b.nomesTamanho - a.nomesTamanho;
  })
}