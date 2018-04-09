/**
 * Author：zhoushuanglong
 * Time：2018-04-09 22:41
 * Description：gulp-manifest-replace
 */

const through = require('through-gulp')

const replace = (obj) => {
    const stream = through(function (file, encoding, callback) {
        if (file.isNull()) {
            console.log('file is null!')
            this.push(file)
            return callback()
        }

        if (file.isStream()) {
            console.log('file is stream!')
            this.emit('error')
            return callback()
        }

        if (file.isBuffer()) {
            console.log('file is buffer!')

            // 替换manifest已添加hash的文件名
            /* const manifest = JSON.parse(file.contents.toString('utf-8'))
            let newManifest = {}
            for (let key in manifest) {
                const value = manifest[key]

                const pointArr = value.split('.')
                const fileSuffix = pointArr[pointArr.length - 1]

                const lineArr = value.split('-')
                let fileName = ''
                for (let key in lineArr) {
                    if (parseInt(key) < lineArr.length - 1) {
                        if (parseInt(key) === 0) {
                            fileName += lineArr[key]
                        } else {
                            fileName += `-${lineArr[key]}`
                        }
                    }
                }
                newManifest[key] = `${fileName}.${fileSuffix}`
            }
            file.contents = new Buffer(JSON.stringify(newManifest), 'utf-8') */

            const fileContent = file.contents.toString('utf-8')
            let newFileContents = ''
            if (obj) {
                for (let key in obj) {
                    newFileContents = fileContent.split(key).join(obj[key])
                    // newFileContents = fileContent.replace(new RegExp(key, 'gim'), obj[key])
                }
            } else {
                newFileContents = fileContent
            }

            file.contents = new Buffer(newFileContents, 'utf-8')
        }

        this.push(file)
        callback()
    }, function (callback) {
        console.log('processed!')
        callback()
    })

    return stream
}

module.exports = replace
