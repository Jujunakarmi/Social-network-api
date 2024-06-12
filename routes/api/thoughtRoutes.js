const router = require('express').Router();
const{
getThoughts,
getThought,
createThought,
updateThought,
deleteThought,
addReaction,
deleteReaction
} = require('../../controllers/thoughtController')

//api/thoughts

router.route('/').get(getThoughts).post(createThought);

//api/thoughts/:thoughtId
router.route('/:thoughtId').get(getThought).put(updateThought).delete(deleteThought);

//api/thoughts/:thoughtId/reaction
router.route('/:thoughtId/reaction').post(addReaction);

///api/thoughts/:thoughtId/reactions/:reactionId
router.route("/:thoughtId/reaction/:reactionId").delete(deleteReaction);

module.exports = router;