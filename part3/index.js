const express = require("express");
const morgan = require("morgan");
const app = express();

app.use(express.json());
app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :content"
  )
);
morgan.token("content", (req, res) =>
  req.method === "POST" ? JSON.stringify(req.body) : "-"
);
/*const requestLogger = (request, response, next) => {
  console.log("Method:", request.method);
  console.log("Path:  ", request.path);
  console.log("Body:  ", request.body);
  console.log("---");
  next();
};

app.use(requestLogger);*/

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

const date = new Date();

app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>");
});

app.get("/info", (request, response) => {
  response.send(
    `<p>This Phonebook has ${persons.length} entries</p> <p>${date} </p>`
  );
});

app.get("/api/persons", (request, response) => {
  response.json(persons);
});

const generateId = () => {
  let newId = -1;
  let random;
  const IDs = persons.map((n) => n.id);
  console.log(IDs);
  while (newId === -1) {
    random = Math.floor(Math.random() * 10000);
    console.log(random);
    newId = IDs.filter((p) => p === random).length === 0 ? random : -1;
  }
  return newId;
};

app.post("/api/persons", (request, response) => {
  const body = request.body;
  const numbers = persons.map((p) => p.number);
  console.log(numbers);
  console.log(body);
  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "Name and/or number missing",
    });
  }
  let numbersFilter = numbers.filter((n) => n === body.number);
  console.log("numbersFilter:", numbersFilter);
  if (numbersFilter.length !== 0) {
    return response.status(400).json({
      error: "Number already exists",
    });
  }
  const person = {
    name: body.name,
    number: body.number || false,
    id: generateId(),
  };

  persons = persons.concat(person);

  response.json(person);
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((person) => {
    console.log(person.id, typeof person.id, id, typeof id, person.id === id);
    return person.id === id;
  });
  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
  console.log(person);
  response.json(person);
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((person) => person.id !== id);

  response.status(204).end();
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});