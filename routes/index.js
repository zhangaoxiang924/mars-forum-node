const express = require('express')
const router = express.Router()
const utils = require('../utils/public')

const axiosAjax = utils.axiosAjax
const ajaxUrl = utils.ajaxUrl

/* GET home page. */
router.get('/', function (req, res, next) {
    async function indexData () {
        const data = await new Promise((resolve, reject) => {
            axiosAjax({
                type: 'GET',
                url: ajaxUrl + '/info/news/getbyid',
                params: {
                    id: '2018041015073847256'
                },
                fn: function (data) {
                    resolve(data)
                }
            })
        })

        return data
    }

    indexData().then((data) => {
        console.log(data)
        res.render('index', {...data})
    })
})

module.exports = router
