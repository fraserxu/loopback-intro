var express = require('express')
var app = express()
var nano = require('nano')('http://localhost:5984')

// create a db to use
// nano.db.create('jsmeetup')

// destroy db
// nano.db.destroy('jsmeetup')

// use db
var jsmeetupdb = nano.db.use('jsmeetup')

// insert a record
// jsmeetupdb.insert({
//   name: 'shanghai javascript meetup august edition',
//   date: 'August 9th',
//   venue: 'Wiredcraft office'
// }, 'august', function(err, body, header) {
//   console.log('you have creaed the first record.')
// })

app.get('/', function(req, res) {
  res.send('it works')
})

app.get('/meetup/:name', function(req, res) {
  var meetupname = req.params.name

  jsmeetupdb.get(meetupname, function(err, body) {
    res.send(body)
  })
})

app.put('/meeup/:name', function(req, res) {
  var newmeetupname = req.params.name

  jsmeetupdb.insert({
    name: 'shanghai javascript meetup ' + newmeetupname + ' edition',
    date: name,
    venue: 'Wiredcraft office'
  }, newmeetupname, function(err, body, header) {
    res.send(body)
  })
})

var server = app.listen('3000', function() {
  console.log('Express server with nano example running...')
})
