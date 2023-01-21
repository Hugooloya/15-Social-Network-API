const { User, Thought } = require("../models");

module.exports = {
  // Get all thoughts
  getAllThought(req, res) {
    Thought.find({})
      .select("-__v")
      .sort({ createdAt: -1 })
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => {
        console.log(err);
        res.status(400);
      });
  },

  // Get a single thought by its id
  getThoughtById(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select("-__v")
      .then((dbThoughtData) =>
        !dbThoughtData
          ? res.status(404).json({ message: "No thought found with this ID" })
          : res.json(dbThoughtData)
      )
      .catch((err) => res.status(500).json(err));
  },

  // Create a new thought
  addThought(req, res) {
    Thought.create(req.body)
      .then((dbThoughtData) => {
        return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $push: { thoughts: dbThoughtData._id } },
          { new: true }
        );
      })
      .then((user) =>
        !user
          ? res.status(404).json({
              message: "Thought created, but found no user with that ID",
            })
          : res.json("Thought created")
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // update thought
  // NOT TESTED
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: re.params.thoughtId },
      { $set: body },
      { new: true, runValidators: true }
    )
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({ message: "No thought found with this id!" });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => res.json(err));
  },

  // remove thought
  // NOT TESTED
  removeThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.thoughtId })
      .then((deletedThought) => {
        if (!deletedThought) {
          return res.status(404).json({ message: "No thought with this id!" });
        }
      })
      .catch((err) => res.json(err));
  },

  // Add a reaction to thought
  // NOT TESTED
  addReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.body.thoughtId },
      { $push: { reactions: req.body } },
      { new: true, runValidators: true }
    )
      .then((dbThoughtData) =>
        !dbThoughtData
          ? res.status(404).json({ message: "No thought found with this id!" })
          : res.json(dbThoughtData)
      )
      .catch((err) => res.status(500).json(err));
  },
  // remove reply
  // NOT TESTED
  removeReaction({ params }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $pull: { reactions: { reactionId: params.reactionId } } },
      { new: true }
    )
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => res.json(err));
  },
};
