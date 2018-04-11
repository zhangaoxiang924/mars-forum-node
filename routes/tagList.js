/**
 * Author: yangbo
 * Time: 2018-04-11 18:12:31
 * Description: Description
 */
var express = require('express')
var router = express.Router()

/* GET tagList listing. */
router.get('/', function (req, res, next) {
    res.render('tagList', {title: 'tagList'})
})

module.exports = router
