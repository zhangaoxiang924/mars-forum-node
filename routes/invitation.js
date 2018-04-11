var express = require('express')
var router = express.Router()
var axios = require('axios')
const {axiosAjax} = require('../utils/public')

/* GET home page. */
router.get('/', function (req, res, next) {
    // axios.get('http://wecenter.huoxing24.vip/?/article/2').then((data) => {
    //     res.render('invitation', {...data})
    // })
    async function invitationData () {
        const data = await new Promise((resolve, reject) => {
            axiosAjax({
                type: 'GET',
                url: 'http://wecenter.huoxing24.vip/?/article/?',
                params: {
                    id: 2
                    // page: 1
                },
                contentType: 'application/json',
                fn: function (data) {
                    resolve(data)
                }
            })
        })

        return data
    }

    invitationData().then((data) => {
        res.render('invitation', {...data})
    }).catch((err) => {
        console.log(err)
    })
})

module.exports = router
