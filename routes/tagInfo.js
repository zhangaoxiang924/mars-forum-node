var express = require('express')
var router = express.Router()

/* GET tagList listing. */
router.get('/', function (req, res, next) {
    res.render('tagInfo', {title: 'tagInfo'})
})

module.exports = router
