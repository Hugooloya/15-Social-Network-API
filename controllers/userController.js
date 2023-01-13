const { User, Thought } = require("../models");

module.exports = {
  getAllusers(req, res) {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },
  getUserbyid(req, res) {
    User.findOne({ _id: req.params.userId })
    .select
  },
};
