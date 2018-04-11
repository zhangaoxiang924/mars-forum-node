const express = require('express')
const router = express.Router()
const utils = require('../utils/public')

const axiosAjax = utils.axiosAjax
const ajaxPhpUrl = utils.ajaxPhpUrl

/* GET home page. */
router.get('/', function (req, res, next) {
    async function indexData () {
        const data = await new Promise((resolve) => {
            axiosAjax({
                type: 'GET',
                url: ajaxPhpUrl + '/',
                params: {},
                res: res,
                fn: function (data) {
                    resolve(data)
                }
            })
        })

        return data
    }

    indexData().then((data) => {
        res.render('index', {...data})
    })
})

module.exports = router
