const {User, Thought} = require('../models');

module.exports = {
    async getThoughts(req, res) {
        try{
         const thought = await Thought.find({});
         res.status(200).json(thought);
      
        }catch(err){
        res.status(500).json(err);
        }
    },

    
}