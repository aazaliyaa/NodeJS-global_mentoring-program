import { Router } from "express";
const router = Router();

let data = [
  {
    id: 1,
    login: "werful@mail.ru",
    password: "dgghfg",
    age: 34,
    isDeleted: false,
  },
  {
    id: 2,
    login: "aswerty@mail.ru",
    password: "hyujki",
    age: 42,
    isDeleted: false,
  },
  {
    id: 3,
    login: "qazdafju@inbox.ru",
    password: "sdujvki",
    age: 16,
    isDeleted: false,
  },
  {
    id: 4,
    login: "serjosa@mail.ru",
    password: "xsdcfgh",
    age: 28,
    isDeleted: false,
  },
  {
    id: 5,
    login: "jutyilo@inbox.ru",
    password: "cdfvgrrsd",
    age: 31,
    isDeleted: false,
  },
];

// READ
router.get("/", function (req, res) {
  res.status(200).json(data);
});

// READ
router.get("/:id", function (req, res) {
  let foundUser = data.find(function (item) {
    return item.id === parseInt(req.params.id);
  });
  if (foundUser) {
    res.status(200).json(foundUser);
  } else {
    res.sendStatus(404);
  }
});

// CREATE
router.post("/", function (req, res) {
  let newId = data.length + 1;

  let newItem = {
    id: newId,
    login: req.body.login,
    password: req.body.password,
    age: req.body.age,
    isDeleted: false,
  };

  data.push(newItem);

  res.status(201).json(newItem);
});

// UPDATE
router.put("/:id", function (req, res) {
  let foundUser = data.find(function (item) {
    return item.id === parseInt(req.params.id);
  });

  if (foundUser) {
    let updated = {
      id: foundUser.id,
      login: req.body.login,
      password: req.body.password,
      age: req.body.age,
      isDeleted: false,
    };

    let targetIndex = data.indexOf(foundUser);

    data.splice(targetIndex, 1, updated);

    res.sendStatus(204);
  } else {
    res.sendStatus(404);
  }
});

// DELETE
router.delete("/:id", function (req, res) {
  let foundUser = data.find(function (item) {
    return item.id === parseInt(req.params.id);
  });

  if (foundUser) {
    let updated = {
      id: foundUser.id,
      login: foundUser.login,
      password: foundUser.password,
      age: foundUser.age,
      isDeleted: true,
    };

    let targetIndex = data.indexOf(foundUser);

    data.splice(targetIndex, 1, updated);

    res.sendStatus(204);
  } else {
    res.sendStatus(404);
  }
});

export default router;
