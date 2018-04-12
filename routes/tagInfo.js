/**
 * Author: yangbo
 * Time: 2018-04-11 18:12:25
 * Description: Description
 */
var express = require('express')
var router = express.Router()
const {axiosAjax, ajaxPhpUrl} = require('../utils/public')

/* GET tagList listing. */
router.get('/', function (req, res, next) {
    let {id} = req.query
    async function indexData () {
        const data = await new Promise((resolve) => {
            axiosAjax({
                type: 'GET',
                url: ajaxPhpUrl + '/?/topic/',
                params: {
                    id
                },
                res: res,
                fn: function (data) {
                    resolve(data)
                }
            })
        })

        return data
    }

    indexData().then((data) => {
        res.render(`tagInfo`, {...data})
    })
    // res.render(`tagInfo`, {title: 'tagInfo'})
})

module.exports = router
