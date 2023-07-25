require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();
const Person = require("./models/person");
app.use(cors());
app.use(express.json());
app.use(express.static("build"));
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

app.use(requestLogger);

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
];*/

const date = new Date();

app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>");
});

app.get("/info", (request, response) => {
  Person.find({}).then((persons) => {
    response.send(
      `<p>This Phonebook has ${persons.length} entries</p> <p>${date} </p>`
    );
  });
});

app.get("/api/persons", (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons);
  });
});

app.post("/api/persons", (request, response) => {
  const body = request.body;
  //const numbers = persons.map((p) => p.number); console.log(numbers);

  console.log(body);
  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "Name and/or number missing",
    });
  }
  /*let numbersFilter = numbers.filter((n) => n === body.number);
  console.log("numbersFilter:", numbersFilter);
  if (numbersFilter.length !== 0) {
    return response.status(400).json({
      error: "Number already exists",
    });
  }*/
  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person.save().then((savedPerson) => {
    response.json(savedPerson);
  });
});

app.get("/api/persons/:id", (request, response) => {
  Person.findById(request.params.id).then((person) => {
    response.json(person);
  });
  /*if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
  console.log(person);
  response.json(person);*/
});

app.delete("/api/persons/:id", (request, response) => {
  Person.deleteById(request.params.id).then((person) => {
    response.json(person);
  });
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
