const express = require("express");
const Category = require("../models/Category");

const router = express.Router();

router.get("/", (req, res) => {
  Category.find()
    .then((categorys) => {
      res.json(categorys);
    })
    .catch((error) => {
      res.json(error);
    });
});

router.get("/categoryid/:id", (req, res) => {
  Category.findById(req.params.id)
    .then((category) => {
      res.json(category);
    })
    .catch((error) => {
      res.json(error);
    });
});

router.get("/userid/:id", (req, res) => {
  Category.find({ userId: req.params.id })
    .then((categorys) => {
      res.json(categorys);
    })
    .catch((error) => {
      res.json(error);
    });
});

router.post("/", (req, res) => {
  const category = new Category({ ...req.body, createUser: req.userId });
  category.save();
  res.json(category);
});

router.put("/:id", (req, res) => {
  Category.findByIdAndUpdate(req.params.id, req.body)
    .then((category) => {
      res.json(category);
    })
    .catch((error) => {
      res.json(error);
    });
});

router.delete("/:id", (req, res) => {
  Category.findByIdAndDelete(req.params.id)
    .then((category) => {
      res.json(category);
    })
    .catch((error) => {
      res.json(error);
    });
});

module.exports = router;
