const router = require('express').Router();
const{
getThoughts,
getThought,
createThought,
deleteThought
} = require('../../controllers/thoughtController')

//api/thoughts

router.route('/').get(getThoughts).post(createThought);

//api/thoughts/:thoughtId
router.route('/:thoughtId').get(getThought).delete(deleteThought);

module.exports = router;