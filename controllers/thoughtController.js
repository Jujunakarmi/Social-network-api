const {User, Thoughts} = require('../models');

module.exports = {
    async getThoughts(req, res) {
        try{
         const thoughts = await Thoughts.find();
         res.status(200).json(thoughts)
        }catch(err){
        res.status(500).json(err)
        }
    }
}