const express = require("express");
const Password = require("../models/Password");

const router = express.Router();

router.get("/", (req, res) => {
  Password.find()
    .then((works) => {
      res.json(works);
    })
    .catch((error) => {
      res.json(error);
    });
});

router.get("/userid/:id", (req, res) => {
  Password.find({ userId: req.params.id })
    .then((passwords) => {
      res.json(passwords);
    })
    .catch((error) => {
      res.json(error);
    });
});

router.get("/categoryid/:id", (req, res) => {
  Password.find({ passwordCategory: req.params.id })
    .then((passwords) => {
      res.json(passwords);
    })
    .catch((error) => {
      res.json(error);
    });
});

router.post("/", (req, res) => {
  const password = new Password({ ...req.body, createUser: req.userId });
  password.save();
  res.json(password);
});

router.put("/:id", (req, res) => {
  Password.findByIdAndUpdate(req.params.id, req.body)
    .then((password) => {
      res.json(password);
    })
    .catch((error) => {
      res.json(error);
    });
});

router.delete("/:id", (req, res) => {
  Password.findByIdAndDelete(req.params.id)
    .then((password) => {
      res.json(password);
    })
    .catch((error) => {
      res.json(error);
    });
});

module.exports = router;
