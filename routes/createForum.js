var express = require('express')
var router = express.Router()

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('createForum', {title: '发布帖子'})
})

module.exports = router
