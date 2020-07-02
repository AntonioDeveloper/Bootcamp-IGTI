import express from "express";
import { promises } from "fs";
import moment from "moment";
const { readFile, writeFile } = promises;
let lancamento = null
let dados = null;
let notasJson = null;
const router = express.Router();
let findId = null;

router.post("/lancarnotas", async (req, res) => {
  lancamento = req.body;
  try {
    let dados = await readFile(global.fileName);
    let notasJson = JSON.parse(dados);
    lancamento = {
      id: notasJson.nextId++, student: lancamento.student, subject: lancamento.subject,
      type: lancamento.type, value: lancamento.value, timestamp: moment().format('Do MMMM YYYY, h:mm:ss a')
    };
    notasJson.grades.push(lancamento);
    await writeFile(global.fileName, JSON.stringify(notasJson));
    res.send(lancamento);
  } catch (err) {
    res.status(400).send(err.message = "Erro");
  }
});

router.put("/atualizarnotas", async (req, res) => {
  lancamento = req.body;

  dados = await readFile(global.fileName);
  notasJson = JSON.parse(dados);
  try {
    for (let i = 0; i < notasJson.grades.length; i++) {
      if (notasJson.grades[i].id === lancamento.id) {
        lancamento = {
          id: notasJson.grades[i].id, student: lancamento.student, subject: lancamento.subject,
          type: lancamento.type, value: lancamento.value, timestamp: moment().format('Do MMMM YYYY, h:mm:ss a')
        };
        notasJson.grades.splice(i, 1, lancamento);
        await writeFile(global.fileName, JSON.stringify(notasJson));
        res.send(lancamento);
      } else if (i == notasJson.grades.length) {
        console.log("nada aqui");
      }
    };
  } catch (err) {
    res.status(400).send(err.message = "Erro");
  }
});

router.delete("/apagarregistro", async (req, res) => {
  lancamento = req.body;

  try {
    dados = await readFile(global.fileName);
    notasJson = JSON.parse(dados);

    findId = notasJson.grades.find(nota => {
      return nota.id === lancamento.id;
    });

    let retorno = notasJson.grades.filter(nota => {
      return nota != findId;
    })

    res.send(retorno);
  } catch (err) {
    res.status(400).send(err.message = "Erro ao deletar");
  }
});

router.get("/consulta", async (req, res) => {
  lancamento = req.body;
  try {
    dados = await readFile(global.fileName);
    notasJson = JSON.parse(dados);

    findId = notasJson.grades.find(nota => {
      if (nota.id === lancamento.id) {
        return nota;
      };
    });
    res.send(findId);
  } catch (err) {
    res.status(400).send(err.message = "Erro ao consultar registro. Por favor, verifique.");
  }
})

//Consultar notas por matéria e aluno 
router.get("/consultarnotas", async (req, res) => {
  let totalNotasMateria = 0;
  lancamento = req.body;
  try {
    dados = await readFile(global.fileName);
    notasJson = JSON.parse(dados);

    let filterStudent = notasJson.grades.filter(student => {
      if (student.student === lancamento.student) {
        return student;
      };
    });

    // Encontrar matéria específica do aluno e somar suas notas
    let findSubject = filterStudent.filter(student => {
      if (student.subject === lancamento.subject) {
        totalNotasMateria = totalNotasMateria + student.value;
        return totalNotasMateria;
      }
    });

    const retorno = {
      student: lancamento.student, subject: lancamento.subject,
      totalValue: totalNotasMateria, timestamp: moment().format('Do MMMM YYYY, h:mm:ss a')
    };

    res.send(retorno);
  } catch (err) {
    res.status(400).send(err.message = "Aluno não encontrado. Por favor, verifique.");
  }
});

//Consultar médias por matéria e atividade
router.get("/consultarmedias", async (req, res) => {
  lancamento = req.body;
  let sumValues = 0;
  try {
    dados = await readFile(global.fileName);
    notasJson = JSON.parse(dados);

    let filterSubject = notasJson.grades.filter(nota => {
      if (nota.subject === lancamento.subject) {
        return nota.subject;
      }
    });

    let mediaMateria = filterSubject.filter(subject => {
      if (subject.type === lancamento.type) {
        sumValues = sumValues + subject.value;
        return sumValues;
      };
    });
    const media = sumValues / mediaMateria.length;
    const retorno = {
      subject: lancamento.subject,
      totalValue: media, timestamp: moment().format('Do MMMM YYYY, h:mm:ss a')
    }
    res.send(retorno);

  } catch (err) {
    res.status(400).send(err.message = "Matéria não encontrada. Por favor, verifique.");
  }
});

//Mostrar melhores notas
router.get("/melhores", async (req, res) => {
  lancamento = req.body;
  //let sumValues = 0;
  try {
    dados = await readFile(global.fileName);
    notasJson = JSON.parse(dados);

    let filterSubject = notasJson.grades.filter(nota => {
      if (nota.subject === lancamento.subject) {
        return nota.subject;
      }
    });

    let maioresNotas = filterSubject.filter(subject => {
      if (subject.type === lancamento.type) {
        return subject;
      };
    });
    maioresNotas.sort((a, b) => {
      return b.subject.value - (a.subject.value);
    });

    maioresNotas = maioresNotas.slice(0, 3);
    res.send(maioresNotas);

  } catch (err) {
    res.status(400).send(err.message = "Matéria não encontrada. Por favor, verifique.");
  }
});

export default router;