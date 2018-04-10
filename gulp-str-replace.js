/**
 * Author：zhoushuanglong
 * Time：2018-04-09 22:41
 * Description：gulp-str-replace
 */

const through = require('through-gulp')

<<<<<<< HEAD
const replace = (obj) => {
    const stream = through(function (file, encoding, callback) {
        if (file.isNull()) {
            console.log('file is null!')
=======
const removeEmptyArrayEle = (arr) => {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === undefined || arr[i] === '') {
            arr.splice(i, 1)
            i = i - 1
        }
    }
    return arr
}

const replace = (obj) => {
    const stream = through(function (file, encoding, callback) {
        if (file.isNull()) {
>>>>>>> online-version
            this.push(file)
            return callback()
        }

        if (file.isStream()) {
<<<<<<< HEAD
            console.log('file is stream!')
=======
>>>>>>> online-version
            this.emit('error')
            return callback()
        }

        if (file.isBuffer()) {
<<<<<<< HEAD
            console.log('file is buffer!')

=======
>>>>>>> online-version
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
<<<<<<< HEAD
                    newFileContents = fileContent.split(key).join(obj[key])
                    // newFileContents = fileContent.replace(new RegExp(key, 'gim'), obj[key])
                    // console.log(fileContent.split(key))
                    // console.log(newFileContents)
=======
                    newFileContents = removeEmptyArrayEle(fileContent.split(key)).join(obj[key])
                    // newFileContents = fileContent.replace(new RegExp(key, 'gim'), obj[key])
>>>>>>> online-version
                }
            } else {
                newFileContents = fileContent
            }

            file.contents = new Buffer(newFileContents, 'utf-8')
        }

        this.push(file)
        callback()
    }, function (callback) {
<<<<<<< HEAD
        console.log('processed!')
=======
>>>>>>> online-version
        callback()
    })

    return stream
}

module.exports = replace
