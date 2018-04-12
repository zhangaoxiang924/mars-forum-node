const express = require('express')
const router = express.Router()
const utils = require('../utils/public')

const axiosAjax = utils.axiosAjax
const ajaxPhpUrl = utils.ajaxPhpUrl
const formatTime = utils.formatTime

/* GET home page. */
router.get('/', function (req, res, next) {
    async function indexData () {
        const data = await new Promise((resolve) => {
            axiosAjax({
                type: 'GET',
                url: ajaxPhpUrl + '/?/api/main',
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
        const pList = data.posts_list
        let articleTime = []
        for (let value of pList) {
            articleTime.push(formatTime(value.add_time))
        }
        console.log(data)
        res.render('index', {
            ...data,
            articleTime: articleTime
        })
    })
})

module.exports = router
