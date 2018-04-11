/**
 * Author: yangbo
 * Time: 2018-04-11 18:12:25
 * Description: Description
 */
var express = require('express')
var router = express.Router()

/* GET tagList listing. */
router.get('/', function (req, res, next) {
    res.render('tagInfo', {title: 'tagInfo'})
})

module.exports = router
