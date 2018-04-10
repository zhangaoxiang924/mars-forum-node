import Simditor from 'simditor'

$(function () {
    let EDITTOOLBAR = [
        'title',
        'bold',
        'italic',
        'underline',
        'strikethrough',
        'fontScale',
        'color',
        'code',
        'ol',
        'ul',
        'blockquote',
        'table',
        'link',
        'image',
        'hr',
        'alignment'
    ]
    let editor = new Simditor({
        textarea: $('.editor'),
        defaultImage: 'http://static.huoxing24.com/images/2018/04/09/1523264298837095.png',
        placeholder: '请输入帖子内容',
        toolbar: EDITTOOLBAR,
        toolbarFloat: false,
        upload: {
            url: `/pic/upload`, // 文件上传的接口地址
            params: null, // 键值对,指定文件上传接口的额外参数,上传的时候随文件一起提交
            fileKey: 'uploadFile', // 服务器端获取文件数据的参数名
            connectionCount: 3,
            leaveConfirm: '正在上传文件',
            success: function (result) {
                let msg = ''
                let imgPath = ''
                if (result.code !== 1) {
                    msg = result.msg || this._t('uploadFailed')
                    console.log(msg)
                    imgPath = this.defaultImage
                } else {
                    imgPath = result.obj
                }
                return imgPath
            }
        }
    })
    editor.on('valuechanged ', (e) => {
        console.log(editor.getValue())
    })
})
