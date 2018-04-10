var express = require('express')
var router = express.Router()
var axios = require('axios')

/* GET home page. */
router.get('/', function (req, res, next) {
    axios.get('http://wecenter.huoxing24.vip/?/article/2').then((data) => {
        res.render('invitation', {...data})
    })
})

module.exports = router
