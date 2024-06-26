const { User, Thought } = require("../models");

module.exports = {
  //Get all thoughts
  async getThoughts(req, res) {
    try {
      const thought = await Thought.find();
      return res.status(200).json(thought);
    } catch (err) {
      return res.status(500).json(err);
    }
  },

  //Get a thought
  async getThought(req, res) {
    try {
      const thought = await Thought.findOne({
        _id: req.params.thoughtId,
      });
      if (!thought) {
        return res.status(404).json({ message: "No thought with that ID" });
      }
      return res.status(200).json(thought);
    } catch (err) {
      return res.status(500).json(err);
    }
  },

  //Create a thought
  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);

      //pushing the created thought's _id to the associated user's thoughts array field)
      const user = await User.findByIdAndUpdate(
        req.body.userId,
        { $addToSet: { thoughts: thought._id } },
        { runValidators: true, new: true }
      );

      return res.status(200).json(user);
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  //Update thought
  async updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      );
      if (!thought) {
        return res.status(404).json({ message: "No thought with that ID" });
      }
      return res.status(200).json(thought);
    } catch (err) {
      return res.status(500).json(err);
    }
  },

  //Delete thought
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndDelete({
        _id: req.params.thoughtId,
      });
      if (!thought) {
        return res.status(404).json({ message: "No thought with that ID" });
      }
      return res.status(200).json({message:" Thoughts deleted"});
    } catch (err) {
      return res.status(500).json(err);
    }
  },

  //Add reaction
  async addReaction(req, res) {
    try {
      const reaction = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body }, },
        { new: true },
      );
      if (!reaction) {
        return res.status(404).json({ message: "No thought with that ID" });
      }
      return res.status(200).json(reaction);
    } catch (err) {
      return res.status(500).json(err);
    }
  },

  //Delete reaction
  async deleteReaction(req, res) {
    try {
      const reaction = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        {$pull: {reactions:{_id:req.params.reactionId}}},
        { runValidators: true, new: true }
      );
      if (!reaction) {
        return res.status(404).json({ message: "No thought with that ID" });
      }
      return res.status(200).json(reaction);
    } catch (err) {
      return res.status(500).json(err);
    }
  },
};
