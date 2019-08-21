const express = require("express");

const app = express();

app.use(express.json());

const projects = [
  { id: "1", title: "Novo projeto", tasks: [] },
  { id: "2", title: "Projeto sdsda", tasks: [] },
  { id: "3", title: "Projeto Atual", tasks: [] }
];

app.get("/projects", (req, res) => {
  return res.json(projects);
});

app.post("/projetcs", (req, res) => {
  console.log(req.body);
  const { id, title } = req.body;

  const project = {
    id,
    title,
    tasks: []
  };

  projects.push(project);

  return res.json(project);
});

app.listen(3333);
