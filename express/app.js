const express = require('express')
const chalk = require('chalk')
const debug = require('debug')('app')
const morgan = require('morgan')
const path = require('path')
const short = require('short-uuid')
const fs = require('fs')
const parser = require('body-parser')

const app = express()

var courses;
const fetchCourses = function () {
    // courses = JSON.parse("{}")
    courses = JSON.parse(fs.readFileSync('./courses.json', 'utf-8'))
}

fetchCourses()

// middleware
app.use(morgan('tiny'))
app.use(express.static(path.join(__dirname, '/public/')))
app.use(parser.json())

app.use((req, res, next) => {
    // resp.setHeader('lambda', '112--22-33')
    // res.setHeader("Access-Control-Allow-Origin", "*");
    // res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    // res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
    res.setHeader('Content-Type', 'application/json');
    next()
})

app.get('/api/', (r, response) => {
    var obj = { id: 5, name: 'John Carmack' }
    response.send(JSON.stringify(obj))
})

app.get('/api/new-id', (req, res, next) => {
    res.json({
        id: short.generate()
    })
})

app.get('/api/course', (req, res, next) => {
    debug(next)
    // res.send('A list of courses')
    res.json({
        message: 'A message from server',
        courses: courses
    })
})

app.get('/api/course/:uid', (req, res, next) => {
    console.log('requested paramater', req.params.uid)
    res.json({
        message: 'A message from server',
    })
})

app.post('/api/create', (req, res, next) => {
    // res.status(204).json({ message: 'Empty course created' })
    console.log('payload', req.body)
    res.json({ message: 'Empty course created' })
})

app.delete('/api/book/:id', (req, res, next) => {
    console.log(`deleting book ${req.params.id}`)
    res.json()
})

app.listen(3000, () => {
    // console.log('listening on port...' + chalk.green(3000))
    // console.log(`listening on port ${chalk.green(3000)}`)
    debug(`listening on port ${chalk.green(3000)}`)
})
