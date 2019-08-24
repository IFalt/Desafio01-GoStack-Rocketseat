const express = require("express");

const app = express();

app.use(express.json());

const projects = []

let NumRequires = 0

/* Middlewares */

app.use((req, res, next) => {
  NumRequires++

  console.log(`${NumRequires} Request made `)

  next();
})

function CheckProjectExists (req, res, next) {
  const {id} = req.params
  const project = projects.find(param => param.id == id)
  console.log(project)

  if (!project){
    return res.status(400).json({ error: "Project does not exists"})
  }

  return next()
}

/* Projects Routes */

app.get("/projects", (req, res) => {
  return res.json(projects);
});

app.post('/projects', (req, res) => {
  const { id, title } = req.body;

  const project = {
    id,
    title,
    tasks: []
  };

  projects.push(project);

  return res.json(project);
});

app.put('/projects/:id', CheckProjectExists, (req,res)=>{
  const {id} = req.params
  const {title}=req.body

  const project = projects.find(param => param.id == id)
    
  project.title = title
  
  return res.json(projects)
})

app.delete('/projects/:id', CheckProjectExists, (req, res) =>{
  const {id} = req.params

  const IndexProject = projects.map(param => param.id).indexOf(id)

  projects.splice(IndexProject, 1)

  return res.json(projects)

})

/* Tasks */

app.post('/projects/:id/tasks', CheckProjectExists, (req, res) => {
  const {id}= req.params
  const { title } = req.body;

  const project = projects.find(param => param.id == id)

  project.tasks.push(title);

  return res.json(project);
});

app.listen(3333);
