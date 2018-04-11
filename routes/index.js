const express = require('express')
const router = express.Router()
const utils = require('../utils/public')

const axiosAjax = utils.axiosAjax
const ajaxUrl = utils.ajaxUrl

/* GET home page. */
router.get('/', function (req, res, next) {
    let params = {}
    // let pathObj = {
    //     'is_recommned': 'sidebar_hot_users',
    //     'sort_type': '',
    // }
    // let dataValue = ''
    // for (let key in req.query) {
    //     params[key] = req.query[key]
    //     for (let keyObj in pathObj) {
    //         if (value === req.query[key]) {
    //             dataValue = pathObj[keyObj]
    //         }
    //     }
    // }
    // console.log(params)
    async function indexData() {
        const data = await new Promise((resolve, reject) => {
            axiosAjax({
                type: 'GET',
                url: ajaxUrl,
                params: params,
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
