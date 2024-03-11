const express = require('express')
const router = express.Router();
const { verifyTokenAndAdmin } = require('../middlewares/verifyToken');
const { addCourseCtrl, getAllCoursesCtrl, deleteCourseCtrl } = require('../controllers/coursesController');
const photoUpload = require('../middlewares/photoUpload');


//  Path{ /api/courses }
router.route("/")
    .post(verifyTokenAndAdmin, photoUpload.single("image"), addCourseCtrl)
    .get(getAllCoursesCtrl)

//  Path{ /api/courses/:id }
router.route("/:id").delete(verifyTokenAndAdmin, deleteCourseCtrl)



module.exports = router