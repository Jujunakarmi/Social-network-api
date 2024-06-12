const { User, Thought } = require("../models");

//
module.exports = {
  async getUsers(req, res) {
    try {
      const users = await User.find({})
     .select("-__v");
      return res.status(200).json(users);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  //Get a single user
  async getUser(req, res) {
    try {
      const user = await User.findOne({
        _id: req.params.userId,
      });

      if (!user) {
       return res.status(404).json({ message: "No user found with that id.!" });
      }
      res.status(200).json(user);
    } catch (err) {
      return res.status(500).json(err);
    }
  },

  //Create a user
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //Update User
  async updateUser(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      );
      if (!user) {
        return res.status(404).json({ message: "No user found with that id.!" });
      }
      return res.status(200).json(user);
    } catch (err) {
     return res.status(500).json(err);
    }
  },

  //Delete User

  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndDelete({ _id: req.params.userId });

      if (!user) {
        return res.status(404).json({ message: "No user with that ID" });
      }

      await Thought.deleteMany({ _id: { $in: user.thoughts } });
      return res.status(200).json({
        message: "User and associated thoughts and reactions deleted!",
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  //Add friend
  async addFriend(req, res) {
    try {
      const friend = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.params.friendId } },
        { runValidators: true, new: true }
      );

      if (!friend) {
       return res.status(404).json({ message: "No user with that ID" });
      }

     return res.status(200).json(friend);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  //Delete friend
  async deleteFriend(req, res) {
    try {
      const friend = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } },
        { runValidators: true, new: true }
      );

      if (!friend) {
        return res.status(404).json({ message: "Check user and friend ID" });
      }

      return res.status(200).json(friend);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
};
