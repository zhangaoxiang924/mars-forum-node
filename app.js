const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const fs = require('fs')

const indexRouter = require('./routes/index')
const usersRouter = require('./routes/users')
const proxyRouter = require('./routes/proxy')
const invitationRouter = require('./routes/invitation')
const tagListRouter = require('./routes/tagList')
const tagInfoRouter = require('./routes/tagInfo')
const searchResultRouter = require('./routes/searchResult')
const createForumRouter = require('./routes/createForum')

const app = express()
app.use('/api', proxyRouter)

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

const accessLogStream = fs.createWriteStream(path.join(__dirname, 'logs.log'), {flags: 'a'})
app.use(logger('combined', {stream: accessLogStream}))
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)
app.use('/users', usersRouter)
app.use('/invitation', invitationRouter)
app.use('/taglist', tagListRouter)
app.use('/taginfo', tagInfoRouter)
app.use('/searchresult', searchResultRouter)
app.use('/createForum', createForumRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {}

    // render the error page
    res.status(err.status || 500)
    res.render('error')
})

module.exports = app
